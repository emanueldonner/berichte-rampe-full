const { exec } = require("child_process")
const fastify = require("fastify")({
  logger: true,
})
const fs = require("fs-extra")
const path = require("path")
const sanitize = require("sanitize-filename")

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
    connection.socket.send("hi from server")
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
    exec(
      `./server/office-parser/parse.mjs -n ${path}/build ${path}/${filename}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        // Send log message to connected clients
        fastify.websocketServer.clients.forEach((client) => {
          console.log("sending to client", client)
          client.send(stdout)
        })
      }
    )
  } catch (error) {
    reply.status(500).send({ message: error.message })
  }
})
// Run the server!
fastify.listen({ port: process.env.PORT || 5000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
