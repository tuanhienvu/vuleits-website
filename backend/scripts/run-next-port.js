#!/usr/bin/env node
/**
 * Picks the first free TCP port starting at PORT from env (after loading backend/.env)
 * or default 5001, then runs Next dev / standalone start / next start with that PORT.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const net = require('net');
const path = require('path');
const dotenv = require('dotenv');

const backendRoot = path.join(__dirname, '..');
dotenv.config({ path: path.join(backendRoot, '.env') });

const DEFAULT_PORT = 5001;
const MAX_TRIES = 200;

function resolveNextBin() {
  let dir = backendRoot;
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
  if (!['dev', 'start', 'start-next'].includes(mode)) {
    console.error('Usage: node scripts/run-next-port.js <dev|start|start-next>');
    process.exit(1);
  }

  const raw = process.env.PORT;
  let preferred = DEFAULT_PORT;
  if (raw != null && String(raw).trim() !== '') {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 65535) preferred = n;
  }

  const port = await pickPort(preferred);
  process.env.PORT = String(port);

  if (port !== preferred) {
    console.warn(
      `[backend] Port ${preferred} is in use; using ${port}. Set BACKEND_PORT=${port} or BACKEND_INTERNAL_URL=http://127.0.0.1:${port} in frontend/.env.local (rebuild frontend if using next start).`,
    );
  } else {
    console.log(`[backend] Using port ${port}`);
  }

  if (mode === 'dev') {
    const nextBin = resolveNextBin();
    const child = spawn(process.execPath, [nextBin, 'dev', '-H', '0.0.0.0', '-p', String(port)], {
      cwd: backendRoot,
      stdio: 'inherit',
      env: process.env,
    });
    child.on('exit', (code, signal) => {
      process.exit(signal ? 1 : (code ?? 0));
    });
    return;
  }

  if (mode === 'start') {
    const serverJs = path.join(backendRoot, '.next', 'standalone', 'backend', 'server.js');
    if (!fs.existsSync(serverJs)) {
      console.error('[backend] Missing standalone server. Run: npm run build --workspace @vuleits/backend');
      process.exit(1);
    }
    const child = spawn(process.execPath, ['-r', 'dotenv/config', serverJs], {
      cwd: backendRoot,
      stdio: 'inherit',
      env: process.env,
    });
    child.on('exit', (code, signal) => {
      process.exit(signal ? 1 : (code ?? 0));
    });
    return;
  }

  if (mode === 'start-next') {
    const nextBin = resolveNextBin();
    const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
      cwd: backendRoot,
      stdio: 'inherit',
      env: process.env,
    });
    child.on('exit', (code, signal) => {
      process.exit(signal ? 1 : (code ?? 0));
    });
    return;
  }

}

main().catch((err) => {
  console.error('[backend]', err);
  process.exit(1);
});
