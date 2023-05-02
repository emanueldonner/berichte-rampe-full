/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*", // Proxy to Backend
      },
      // {
      //   source: "/preview/:path*",
      //   destination: "http://localhost:5000/preview/:path*", // Proxy to Backend
      // },
    ]
  },
}

module.exports = nextConfig
