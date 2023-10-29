/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static-cdn.jtvnw.net"],
  },
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
