import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auctions/:path*',
        destination: 'http://localhost:6001/auctions/:path*',
      },
      {
        source: '/api/search/:path*',
        destination: 'http://localhost:6001/search/:path*',
      },
      {
        source: '/api/bids/:path*',
        destination: 'http://localhost:6001/bids/:path*',
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.pixabay.com' }],
  },
};

export default nextConfig;
