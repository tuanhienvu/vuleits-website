#!/usr/bin/env node
/**
 * After `next build` with output: 'standalone', Next expects:
 *   .next/static  ->  .next/standalone/backend/.next/static
 *   public/       ->  .next/standalone/backend/public
 * Without this, production can 404 on `/_next/static/*` and miss public files.
 *
 * Uses retries on rm — Windows/OneDrive often returns EPERM when removing nested
 * folders like `standalone/backend/public/flags`.
 */
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const backendRoot = path.join(__dirname, '..');
const nextDir = path.join(backendRoot, '.next');
const standaloneBackend = path.join(nextDir, 'standalone', 'backend');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rmWithRetries(target, label) {
  if (!fs.existsSync(target)) return;
  const attempts = 10;
  for (let i = 0; i < attempts; i++) {
    try {
      await fsp.rm(target, {
        recursive: true,
        force: true,
        maxRetries: 12,
        retryDelay: 120,
      });
      return;
    } catch (err) {
      const code = err && err.code;
      if (code !== 'EPERM' && code !== 'EBUSY' && code !== 'ENOTEMPTY' && code !== 'EACCES') {
        throw err;
      }
      if (i === attempts - 1) throw err;
      console.warn(
        `[copy-standalone] ${code} removing ${label} (attempt ${i + 1}/${attempts}), retrying…`,
      );
      await sleep(350 + i * 200);
    }
  }
}

async function cpRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('[copy-standalone] skip (missing):', path.relative(backendRoot, src));
    return;
  }
  const label = path.relative(backendRoot, dest);
  if (fs.existsSync(dest)) {
    await rmWithRetries(dest, label);
  }
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  await fsp.cp(src, dest, { recursive: true });
}

async function main() {
  if (!fs.existsSync(path.join(standaloneBackend, 'server.js'))) {
    console.warn('[copy-standalone] standalone/server.js not found; skip (build not run yet?)');
    return;
  }

  const staticSrc = path.join(nextDir, 'static');
  const staticDest = path.join(standaloneBackend, '.next', 'static');
  const publicSrc = path.join(backendRoot, 'public');
  const publicDest = path.join(standaloneBackend, 'public');

  await cpRecursive(staticSrc, staticDest);
  console.log('[copy-standalone] .next/static -> standalone/backend/.next/static');

  if (fs.existsSync(publicSrc) && fs.readdirSync(publicSrc).length > 0) {
    await cpRecursive(publicSrc, publicDest);
    console.log('[copy-standalone] public -> standalone/backend/public');
  }
}

main().catch((err) => {
  console.error('[copy-standalone]', err);
  process.exit(1);
});
