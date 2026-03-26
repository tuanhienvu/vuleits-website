import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  outputFileTracingRoot: path.join(__dirname, '..'),
  serverExternalPackages: ['@prisma/client', 'prisma'],
  devIndicators: false,
};

export default nextConfig;
