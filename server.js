const { exec } = require("child_process")

const fastify = require("fastify")({
  logger: true,
})

fastify.register(require("@fastify/view"), {
  engine: {
    nunjucks: require("nunjucks"),
  },
})

// Declare a route
fastify.get("/", function (request, reply) {
  reply.view("src/templates/index.njk", { text: "text" })

  // exec(
  //   "./src/office-parser/parse.mjs -n ./public/output ./src/office-parser/samples/frameworkpraesentation_2021.docx",
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.log(`error: ${error.message}`)
  //       return
  //     }
  //     if (stderr) {
  //       console.log(`stderr: ${stderr}`)
  //       return
  //     }
  //     console.log(`stdout: ${stdout}`)
  //   }
  // )
})

// Run the server!
fastify.listen({ port: process.env.PORT || 5000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
