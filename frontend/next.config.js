/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['iili.io', 'fake-coffee-api.vercel.app', 'https://api.sampleapis.com/coffee/hot', 'images.pexels.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
