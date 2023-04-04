const fs = require("fs-extra")
const path = require("path")
const Eleventy = require("@11ty/eleventy")
const sanitize = require("sanitize-filename")
const { exec } = require("child_process")
const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:dd.mm.yyyy HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
}
const fastify = require("fastify")({
  logger: envToLogger["development"] ?? true,
})

module.exports = function (fastify, ops, next) {
  next()
}

const PUBLIC_DIR = path.join(__dirname, "public")

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
}

// fastify.register(require("@fastify/view"), {
//   engine: {
//     nunjucks: require("nunjucks"),
//   },
// })
fastify.register(require("@fastify/multipart"), {
  // attachFieldsToBody: true,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
})
fastify.register(require("@fastify/websocket"))
// Defining websoclket route
fastify.register(async function (fastify) {
  fastify.get("/api/log", { websocket: true }, (connection, req) => {
    console.log("client connected")
    connection.socket.send(JSON.stringify({ msg: "hi from server" }))
    connection.socket.on("message", (message) => {
      console.log(`Received message: ${message}`)
    })
  })
})
fastify.post("/api/upload", async function (request, reply) {
  try {
    const file = await request.file()
    console.log("file", file.file)
    if (!file) {
      throw new Error("No file uploaded")
    }
    console.log("mime", file.mimetype)
    if (
      file.mimetype !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      throw new Error("Invalid file type")
    }

    const nameWithoutExt = sanitize(path.parse(file.filename).name)
    const dir = `output/${nameWithoutExt}`

    const uploadDir = path.join(PUBLIC_DIR, dir)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const savePath = path.join(uploadDir, file.filename)
    await fs.promises.writeFile(savePath, file.file)

    reply.status(200).send({
      message: "File uploaded successfully",
      path: uploadDir,
      filename: file.filename,
    })
  } catch (error) {
    reply.status(500).send({ message: error.message })
  }
})

fastify.post("/api/parse", async function (request, reply) {
  try {
    const { filename, path } = request.body
    if (!fs.existsSync(`${path}/build`)) {
      fs.mkdirSync(`${path}/build`, { recursive: true })
      fs.chmod(`${path}/build`, 0o775, (err) => {
        if (err) {
          console.error(err)
        }
      })
    }
    await exec(`cp -r ./public/template/* ${path}/build`)
    await exec(`npm install --prefix ${path}/build`)
    console.log("copied template")
    exec(
      `./server/office-parser/parse.mjs -n ${path}/build/src ${path}/${filename}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        // console.log(`stdout: ${stdout}`)
        console.log("data type", typeof stdout)
        // Send log message to connected clients
        fastify.websocketServer.clients.forEach((client) => {
          console.log("sending to client")
          const logLines = stdout.split("\n")
          logLines.forEach((logLine) => {
            if (logLine.trim() !== "") {
              try {
                const logObject = JSON.parse(logLine)
                client.send(
                  JSON.stringify({
                    event: "parselog",
                    body: logObject,
                  })
                )
              } catch (parseError) {
                console.error("Error parsing log line:", parseError)
              }
            }
          })
          // client.send(JSON.stringify(stdout))
        })
        try {
          console.log("pre build")
          buildSite(path)
        } catch (error) {
          console.log("error building site", error)
        }
      }
    )
  } catch (error) {
    reply.status(500).send({ message: error.message })
  }
})

const rewritePaths = async (folder) => {
  fs.readFile(`${folder}/.eleventy.js`, "utf8", function (err, data) {
    if (err) {
      return console.log(err)
    }

    var result = data.replace(/REPLACEME/g, `"${folder}"`)

    fs.writeFile(`${folder}/.eleventy.js`, result, "utf8", function (err) {
      if (err) return console.log(err)
    })
  })
}

const buildSite = async (dirPath) => {
  try {
    const buildPath = path.join(dirPath, "build")
    await rewritePaths(buildPath)
    const eleventyConfigPath = path.join(buildPath, ".eleventy.js")
    console.log("dir: ", eleventyConfigPath)
    const elev = new Eleventy(`${buildPath}/src`, "_site", {
      configPath: eleventyConfigPath,
    })
    await elev.write()
    console.log("Eleventy build completed successfully.")
  } catch (error) {
    return "Failed to build Eleventy site: " + error.message
  }
}

// Run the server!
fastify.listen({ port: process.env.PORT || 5000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
