const fs = require("fs-extra")
const path = require("path")
const serveHandler = require("serve-handler")
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

const PUBLIC_DIR = path.join(__dirname, "public")
fastify.decorateRequest("PUBLIC_DIR", PUBLIC_DIR)

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
}

fastify.register(require("./server/connectionStore"))
fastify.register(require("./routes/upload"), { PUBLIC_DIR })
fastify.register(require("./routes/parse"))
fastify.register(require("./routes/compress"))

module.exports = function (fastify, ops, next) {
  next()
}

fastify.register(require("@fastify/multipart"), {
  // attachFieldsToBody: true,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
})
fastify.register(require("@fastify/websocket"))
// Defining websoclket route
fastify.register(async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/log",
    handler: (request, reply) => {
      reply.send("This is a WebSocket route")
    },
    wsHandler: (connection, request) => {
      console.log("client connected")
      connection.socket.send(
        JSON.stringify({ msg: "Verbindung zum Server hergestellt." })
      )
      connection.socket.on("message", (message) => {
        console.log(`Received message: ${message}`)
      })

      fastify.connectionStore.addConnection(connection.socket)
      connection.socket.on("close", () => {
        fastify.connectionStore.removeConnection(connection.socket)
      })
    },
  })
})

fastify.all("/*", async (request, reply) => {
  const folder = path.join(__dirname, ".next")
  if (process.env.NODE_ENV === "production") {
    await serveHandler(reply.raw, request.raw, {
      public: folder,
    })
  } else {
    reply.status(404).send("Not found")
  }
})
// Run the server!

if (process.env.NODE_ENV === "production") {
  fastify.listen({ port: process.env.PORT || 5000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })
}
