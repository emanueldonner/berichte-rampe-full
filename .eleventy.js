module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		proxy: "http://localhost:5500",
	})

	// Add your other Eleventy configuration here
}
