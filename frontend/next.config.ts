import type { NextConfig } from 'next';
import { config as loadEnv } from 'dotenv';
import path from 'path';
import { resolveLocalBackendApiBaseUrl } from './lib/resolveBackendApiBase';
import { API_PREFIX } from './lib/apiRoutes';
import { buildFrontendContentSecurityPolicy } from './lib/buildContentSecurityPolicy';

/** Monorepo root `.env` — Next only auto-loads `frontend/.env*`; merge BACKEND_PORT from root without overriding. */
const repoRoot = path.join(__dirname, '..');
loadEnv({ path: path.join(repoRoot, '.env') });
loadEnv({ path: path.join(repoRoot, '.env.local') });

/** Base URL for rewrites: `/api/*` and `/uploads/*` → backend. Baked in at build time for `next start`. */
const apiBase = resolveLocalBackendApiBaseUrl();

const nextConfig: NextConfig = {
  experimental: {
    
    externalDir: true,
    optimizePackageImports: ['framer-motion'],
  },
  turbopack: {},
  outputFileTracingRoot: path.join(__dirname, '..'),
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
      { protocol: 'http', hostname: '**', pathname: '/**' },
    ],
  },
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
          { key: 'Content-Security-Policy', value: buildFrontendContentSecurityPolicy() },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `${API_PREFIX}/:path*`,
        destination: `${apiBase}${API_PREFIX}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${apiBase}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
