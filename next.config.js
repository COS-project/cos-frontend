/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com','k.kakaocdn.net', 'storage.googleapis.com', 't1.kakaocdn.net'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
