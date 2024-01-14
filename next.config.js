/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
