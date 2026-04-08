import type { NextConfig } from 'next';
import path from 'path';
import { resolveLocalBackendApiBaseUrl } from './lib/resolveBackendApiBase';

/** Base URL for rewrites: `/api/*` and `/uploads/*` → backend. Baked in at build time for `next start`. */
const apiBase = resolveLocalBackendApiBaseUrl();

/** Must be NEXT_PUBLIC_* so it is available in workers that run generateStaticParams. */
const isStaticExport =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === '1' ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
    optimizePackageImports: ['framer-motion'],
  },
  outputFileTracingRoot: path.join(__dirname, '..'),
  devIndicators: false,
  ...(isStaticExport
    ? {
        output: 'export' as const,
        images: { unoptimized: true },
      }
    : {}),
  ...(!isStaticExport
    ? {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                {
                  key: 'Permissions-Policy',
                  value: 'camera=(), microphone=(), geolocation=()',
                },
              ],
            },
          ];
        },
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: `${apiBase}/api/:path*`,
            },
            {
              source: '/uploads/:path*',
              destination: `${apiBase}/uploads/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
