/** @type {import('next').NextConfig} */
const nextConfig = {
  // macOS: avoid EMFILE / flaky dev chunks when the OS file-watch limit is low
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**"],
      }
    }
    return config
  },
}

export default nextConfig
