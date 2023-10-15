/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["static-cdn.jtvnw.net"],
  },
};

module.exports = nextConfig;
