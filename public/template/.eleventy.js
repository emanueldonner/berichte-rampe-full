const filters = require("./_11ty/filters.js")
const fs = require("fs")
const project = require("./src/_data/project.js")
const chapters = require("./src/_data/chapters.json")
const slugify = require("slugify")
const path = REPLACEME

module.exports = function (eleventyConfig) {
  // Import filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  console.log(chapters.length)
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i]
    console.log(chapter.folder)
    eleventyConfig.addCollection(chapter.folder, function (collectionApi) {
      const index = parseInt(chapter.folder.split("chapter_")[1])

      var col = collectionApi.getFilteredByGlob(
        `${path}/src/pages/kapitel/${chapter.folder}/*.njk`
      )

      return col.map((item, idx) => {
        item.data.chapter = index
        item.data.subchapter = col[0].data.intro ? idx : idx + 1
        return item
      })
    })
  }

  eleventyConfig.addCollection("chapters", function (collectionApi) {
    return collectionApi.getFilteredByGlob(`${path}/src/pages/kapitel/**/*.njk`)
  })

  eleventyConfig.addFilter("parentSlug", (page) => {
    const index = parseInt(
      page.filePathStem.match(/(?<=pages\/kapitel\/chapter_)(.*)(?=\/)/s)[0]
    )

    const options = {
      replacement: "-",
      strict: true,
      lower: true,
    }
    return slugify(chapters[index].title, options)
  })

  eleventyConfig.addFilter("quicklinks", (collection, index) => {
    return collection.map((item, idx) => {
      let chapterIndex = index + 1

      if (project.skipFirstChapter) {
        chapterIndex = index
      }

      let heading = `${chapterIndex}.${
        collection[0].data.intro ? idx : idx + 1
      } ${item.data.title}`

      if (project.skipFirstChapter && index === 0) {
        heading = item.data.title
      }

      if (item.data.intro) {
        heading = `${item.data.title}`
      }

      // const url = project.site_base_path + item.url
      const url = item.url

      return {
        text: heading,
        url: url.replace("//", "/"),
      }
    })
  })

  eleventyConfig.addFilter("chapterPrefix", (text, index, subindex) => {
    let chapterPrefix = `${index + 1}. `

    if (subindex > 0) {
      chapterPrefix = `${index + 1}.${subindex} `
    }

    if (project.skipFirstChapter) {
      chapterPrefix = `${index}. `

      if (subindex > 0) {
        chapterPrefix = `${index}.${subindex} `
      }

      if (index === 0) {
        chapterPrefix = ""
      }
    }

    return `${chapterPrefix}${text}`
  })

  // 404 page
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html")
          // Provides the 404 content without redirect.
          res.write(content_404)
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404)
          res.end()
        })
      },
    },
  })

  // Files to copy
  eleventyConfig.addPassthroughCopy({ [`${path}/src/images`]: "images" })
  eleventyConfig.addPassthroughCopy({
    [`${path}/src/images_static`]: "images_static",
  })
  eleventyConfig.addPassthroughCopy({ [`${path}/src/files`]: "files" })
  eleventyConfig.addPassthroughCopy({ [`${path}/src/assets`]: "assets" })

  return {
    pathPrefix: project.pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  }
}
