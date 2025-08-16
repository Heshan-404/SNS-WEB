import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['https://una-leasing-topic-platforms.trycloudflare.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4oe0bqgokt27fgzu.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },
};

export default nextConfig;
