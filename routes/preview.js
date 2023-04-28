const fp = require("fastify-plugin")
const path = require("path")
const fs = require("fs")
const mime = require("mime-types")

async function previewRoute(fastify, options) {
  const { PROJECT_DIR } = options

  // Define the API endpoint
  fastify.get("/preview/:report/*", async (request, reply) => {
    try {
      const report = request.params.report
      const filePath = request.params["*"] || "index.html"
      const reportPath = path.join(
        PROJECT_DIR,
        report,
        "preview",
        "_site",
        filePath
      )

      console.log(`Serving file: ${reportPath}`) // Debug: log the file path

      // Check if the file exists
      try {
        await fs.promises.access(reportPath)
      } catch (error) {
        console.error(`File not found: ${reportPath}`)
        reply.code(404).send({ error: "File not found" })
        return
      }

      // Serve the file from the specified path
      const contentType = mime.lookup(filePath) || "application/octet-stream"
      const fileStream = fs.createReadStream(reportPath)

      fileStream.on("data", (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`) // Debug: log the received data
      })

      reply.type(contentType)
      fileStream.pipe(reply.raw) // Pipe the file stream to the response
    } catch (error) {
      // Handle errors if any
      console.error(error)
      reply.code(500).send({ error: error })
    }
  })

  fastify.get("/favicon.ico", async (request, reply) => {
    reply.code(404).send()
  })
}

module.exports = fp(previewRoute)
