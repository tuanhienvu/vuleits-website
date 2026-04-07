import type { NextConfig } from 'next';
import path from 'path';

/**
 * Shared hosting (Plesk, CloudLinux LVE) often hits `spawn EAGAIN` / `kill EPERM` during
 * `next build` because Turbopack defaults spawn many child Node processes. Set
 * `NEXT_BUILD_LOW_PARALLEL=1` (see `npm run build:hosting`) to use fewer CPUs and
 * `workerThreads` instead of child processes for plugin evaluation.
 */
const lowParallelBuild = process.env.NEXT_BUILD_LOW_PARALLEL === '1';

function buildCpus(): number | undefined {
  const raw = process.env.NEXT_BUILD_CPUS?.trim();
  if (raw) {
    const n = parseInt(raw, 10);
    if (Number.isFinite(n) && n >= 1) return n;
  }
  return lowParallelBuild ? 1 : undefined;
}

const cpus = buildCpus();

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
    ...(lowParallelBuild
      ? {
          cpus,
          turbopackPluginRuntimeStrategy: 'workerThreads' as const,
        }
      : cpus != null
        ? { cpus }
        : {}),
  },
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '..'),
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
      { protocol: 'http', hostname: '**', pathname: '/**' },
    ],
  },
  devIndicators: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
