import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }, { protocol: 'https', hostname: 'cdn.sanity.io' }] },
  async redirects() {
    return [
      { source: '/work/:path*', destination: '/', permanent: true },
      { source: '/services/:path*', destination: '/', permanent: true },
      { source: '/journal/:path*', destination: '/', permanent: true },
    ];
  },
};
export default nextConfig;
