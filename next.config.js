/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static-cdn.jtvnw.net"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
