module.exports = (eleventyConfig) => {
  eleventyConfig.setBrowserSyncConfig({
    proxy: "http://localhost:5000",
  })

  // Add your other Eleventy configuration here
}
