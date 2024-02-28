/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	// experimental: {
	//   appDir: true,
	// },
	// output: "standalone",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `http://${process.env.NEXT_PUBLIC_BASE_URL}/:path*`, // Proxy to Backend
			},
			// {
			//   source: "/preview/:path*",
			//   destination: "http://localhost:5500/preview/:path*", // Proxy to Backend
			// },
		]
	},
}

module.exports = nextConfig
