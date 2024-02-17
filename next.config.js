/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com','k.kakaocdn.net', 'storage.googleapis.com'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
