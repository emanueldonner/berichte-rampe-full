const fp = require("fastify-plugin")
const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")
const mime = require("mime")

async function previewRoute(fastify, options) {
	const { PROJECT_DIR } = options

	// GET-Route für die Vorschau eines spezifischen Berichts
	fastify.get("/preview/:report/*", async (request, reply) => {
		try {
			const report = request.params.report
			const subPath = request.params["*"]
				? path.extname(request.params["*"]) === ""
					? path.join(request.params["*"], "index.html")
					: request.params["*"]
				: "index.html"
			const reportPath = path.join(PROJECT_DIR, report, "preview", "_site")

			console.log(`Serving file: ${reportPath}`) // Debug: log the file path

			// Check if the file exists
			try {
				await fs.promises.access(reportPath)

				// Startet den Eleventy Dev-Server für die Vorschau
				await exec(
					`npx @11ty/eleventy-dev-server --dir=${reportPath} --port=8080`,
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
					}
				)

				// Statische Dateien werden mit korrektem MIME-Type gesendet
				const fullPath = path.join(reportPath, subPath)
				const fileContent = await fs.promises.readFile(fullPath)
				const mimeType = mime.getType(fullPath) || "text/plain"
				reply.type(mimeType).send(fileContent)
			} catch (error) {
				console.error(`File not found: ${reportPath}`)
				// Sendet 404, wenn die Datei nicht gefunden wird
				reply.code(404).send({ error: "File not found" })
				return
			}
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
