// Einrichten der erforderlichen Module und Logger-Konfiguration
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

// Register fastify-swagger
// fastify.register(require("@fastify/swagger"), {
// 	routePrefix: "/documentation",
// 	swagger: {
// 		info: {
// 			title: "Test API",
// 			description: "API documentation",
// 			version: "0.1.0",
// 		},
// 		host: "localhost",
// 		schemes: ["http"],
// 		consumes: ["application/json"],
// 		produces: ["application/json"],
// 	},
// 	exposeRoute: true,
// })

// Konfiguration der öffentlichen und Projektverzeichnisse
const PUBLIC_DIR = path.join(__dirname, "public")
fastify.decorateRequest("PUBLIC_DIR", PUBLIC_DIR)

const PROJECT_DIR = path.join(PUBLIC_DIR, "output")

if (!fs.existsSync(PUBLIC_DIR)) {
	fs.mkdirSync(PUBLIC_DIR, { recursive: true })
}
// fastify.addHook("preHandler", (request, reply, done) => {
//   if (!request.headers.accept) {
//     request.headers.accept = "text/html; charset=utf-8"
//   }
//   done()
// })

// Registrierung der Routes und Plugins
fastify.register(require("./server/connectionStore"))
fastify.register(require("./routes/test"))
fastify.register(require("./routes/upload"), { PUBLIC_DIR })
fastify.register(require("./routes/parse"), { PUBLIC_DIR })
fastify.register(require("./routes/compress"))
fastify.register(require("./routes/preview"), {
	PROJECT_DIR,
	PUBLIC_DIR,
})

module.exports = function (fastify, ops, next) {
	next()
}

// Middleware für den Upload von Dateien und WebSockets
fastify.register(require("@fastify/multipart"), {
	// attachFieldsToBody: true,
	limits: {
		fileSize: 100 * 1024 * 1024, // 100MB
	},
})
fastify.register(require("@fastify/websocket"))

// WebSocket-Route für die Logs
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

// Allgemeine Route zur Auslieferung von Dateien im Produktionsmodus
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
// if (process.env.NODE_ENV === "production") {
fastify.listen({ port: process.env.PORT || 5500 }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	// Server is now listening on ${address}
})
// }
