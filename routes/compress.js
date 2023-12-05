const fp = require("fastify-plugin")
const fs = require("fs-extra")
const path = require("path")
const contentDisposition = require("content-disposition")
const pump = require("pump")
const archiver = require("archiver")

// Definiert die Route für das Komprimieren von Verzeichnissen
async function compressRoute(fastify, options) {
	// POST-Route für den Start der ZIP-Komprimierung
	fastify.post("/compress", async (request, reply) => {
		// Sendet eine Nachricht über den Start der Komprimierung
		fastify.connectionStore.broadcastMessage({
			msg: "Starte ZIP-Komprimierung...",
		})

		try {
			// Ermittelt den vollständigen Pfad des zu komprimierenden Verzeichnisses
			const fullPath = request.body.path
			console.log("fullpath:", fullPath)
			// Bestimmt den Namen des aktuellen Verzeichnisses
			const currentDirectoryName = path.basename(fullPath)
			// Generiert den filename der ZIP-Datei
			const fileName = `${currentDirectoryName}.zip`
			// Bestimmt den outputPath, wo die ZIP-Datei gespeichert wird
			const outputPath = path.join(fullPath, "..", fileName)

			// Führt die Komprimierung durch
			await compressDirectory(fullPath, outputPath)
			console.log("zip: ", outputPath)
			// Sendet eine Erfolgsmeldung
			reply.code(200).send({
				message: "Zip-Datei erfolgreich erstellt.",
				zipUrl: outputPath,
			})
			// Alternative: Direkter Download der ZIP-Datei
			// reply
			//   .header("Content-Type", "application/zip")
			//   .header("Content-Disposition", `attachment; filename=${fileName}`)
			//   .send(fs.createReadStream(outputPath))
		} catch (error) {
			// Sendet eine Fehlermeldung bei Misserfolg der Komprimierung
			reply.code(500).send({ error: "ZIP-Komprimierung fehlgeschlagen." })
		}
	})

	// Hilfsfunktion zum Komprimieren eines Verzeichnisses
	const compressDirectory = async (directoryPath, outputPath) => {
		return new Promise((resolve, reject) => {
			// Erstellt einen output stream für die Ausgabedatei
			const output = fs.createWriteStream(outputPath)
			// Initialisiert Archiver für das ZIP-Format mit hoher Kompression
			const archive = archiver("zip", {
				zlib: { level: 9 }, // Setzt das Kompressionslevel.
			})

			// Behandelt das Schließen des output streams
			output.on("close", () => {
				console.log("output closed")
				resolve()
			})

			// Behandelt Fehler im Archivierungsprozess
			archive.on("error", (err) => reject(err))

			// Loggt, wenn die Komprimierung abgeschlossen ist
			archive.on("finish", () => {
				console.log("compression finished")
			})

			// Leitet den Archivierungsstrom in den output stream
			archive.pipe(output)
			// Fügt das zu komprimierende Verzeichnis zum Archiv hinzu
			archive.directory(directoryPath, false)
			// Finalisiert das Archiv
			archive.finalize()
		})
	}

	// GET-Route für den Download der erstellten ZIP-Datei
	fastify.get("/download", async (request, reply) => {
		console.log("raw zip location: ", request.query.zipLocation)
		try {
			// Dekodiert den Standort der ZIP-Datei für den Download
			const zipLocation = request.query.zipLocation
			console.log("zipLocation:", zipLocation)

			// Überprüft, ob die ZIP-Datei existiert
			if (!fs.existsSync(zipLocation)) {
				console.log("file not found")
				reply.code(404).send({ error: "File not found." })
				return
			}

			// Ermittelt den filename aus dem Pfad
			const fileName = path.basename(zipLocation)
			console.log("fileName:", fileName)
			// Setzt Header für den Download der ZIP-Datei
			reply
				.header("Content-Type", "application/zip")
				.header("Content-Disposition", contentDisposition(encodeURI(fileName)))

			// Erstellt einen Lesestrom für die ZIP-Datei
			const stream = fs.createReadStream(zipLocation)
			// Übernimmt die Kontrolle über den Response stream
			reply.hijack()
			// Verwendet 'pump', um den Lesestrom mit dem Response stream zu verbinden
			pump(stream, reply.raw, (err) => {
				if (err) {
					console.error("Error while sending the stream:", err)
					reply.raw.destroy()
				}
			})
		} catch (error) {
			// Sendet eine Fehlermeldung, falls der Download fehlschlägt
			reply.code(500).send({ error: "Failed to download the file." })
		}
	})
}

// Exportiert die Route als Fastify-Plugin
module.exports = fp(compressRoute)
