#!/usr/bin/env node
/**
 * Uses PORT from frontend/.env* for the Next server (default 3001), with IPv4+IPv6 free-port scan.
 * Loads `frontend/.env` then `frontend/.env.local` — set `BACKEND_PORT` there so `/api` rewrites match
 * the backend (see `frontend/.env.example`).
 */
const { spawn } = require('child_process');
const fs = require('fs');
const net = require('net');
const path = require('path');
const dotenv = require('dotenv');

const frontendRoot = path.join(__dirname, '..');
dotenv.config({ path: path.join(frontendRoot, '.env') });
dotenv.config({ path: path.join(frontendRoot, '.env.local'), override: true });

const DEFAULT_PORT = 3001;
const MAX_TRIES = 200;

function resolveNextBin() {
  let dir = frontendRoot;
  for (let i = 0; i < 8; i++) {
    const candidate = path.join(dir, 'node_modules', 'next', 'dist', 'bin', 'next');
    if (fs.existsSync(candidate)) return candidate;
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error(
    'Could not find Next.js CLI (node_modules/next). Run npm install from the monorepo root.',
  );
}

function tryListen(port, host) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.unref();
    s.once('error', (err) => resolve({ ok: false, code: err.code }));
    s.once('listening', () => s.close(() => resolve({ ok: true })));
    try {
      s.listen(port, host);
    } catch (e) {
      resolve({ ok: false, code: e && e.code });
    }
  });
}

async function portFree(port) {
  const v4 = await tryListen(port, '0.0.0.0');
  if (!v4.ok) return false;
  const v6 = await tryListen(port, '::');
  if (v6.ok) return true;
  const ignorable = new Set(['EAFNOSUPPORT', 'EADDRNOTAVAIL', 'EINVAL', 'EPROTONOSUPPORT']);
  if (ignorable.has(v6.code)) return true;
  return false;
}

async function pickPort(preferred) {
  let p = preferred;
  const end = preferred + MAX_TRIES;
  for (; p < end; p++) {
    if (await portFree(p)) return p;
  }
  throw new Error(`No free TCP port found between ${preferred} and ${end - 1}`);
}

async function main() {
  const mode = process.argv[2];
  if (!['dev', 'start'].includes(mode)) {
    console.error('Usage: node scripts/run-next-port.js <dev|start>');
    process.exit(1);
  }

  const raw = process.env.PORT;
  let preferred = DEFAULT_PORT;
  if (raw != null && String(raw).trim() !== '') {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 65535) preferred = n;
  }

  const port = await pickPort(preferred);
  const portStr = String(port);
  process.env.PORT = portStr;
  if (port !== preferred) {
    console.warn(
      `[frontend] Port ${preferred} is in use; using ${port}. Open http://127.0.0.1:${port}`,
    );
  } else {
    console.log(`[frontend] Using port ${port}`);
  }

  const nextBin = resolveNextBin();
  const args =
    mode === 'dev'
      ? [nextBin, 'dev', '--turbopack', '-H', '0.0.0.0', '-p', portStr]
      : [nextBin, 'start', '-p', portStr];
  const child = spawn(process.execPath, args, {
    cwd: frontendRoot,
    stdio: 'inherit',
    env: process.env,
  });
  child.on('exit', (code, signal) => {
    process.exit(signal ? 1 : (code ?? 0));
  });
}

main().catch((err) => {
  console.error('[frontend]', err);
  process.exit(1);
});
