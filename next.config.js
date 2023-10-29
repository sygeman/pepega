/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static-cdn.jtvnw.net"],
  },
  experimental: {
    serverActions: true,
  },
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
