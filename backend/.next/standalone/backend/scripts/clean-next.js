#!/usr/bin/env node
/**
 * Removes backend/.next with retries. Windows often returns EPERM/EBUSY when OneDrive,
 * Defender, or a running `next dev` holds files under .next (especially .next/diagnostics).
 *
 * If delete keeps failing, on Windows we try renaming `.next` aside so `next build`
 * can create a fresh folder; delete the `._next_quarantine_*` folder later when unlocked.
 */
const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '..', '.next');
const isWin = process.platform === 'win32';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tryQuarantine() {
  if (!isWin || !fs.existsSync(nextDir)) {
    return false;
  }
  const parent = path.dirname(nextDir);
  const quarantine = path.join(parent, `._next_quarantine_${Date.now()}`);
  try {
    fs.renameSync(nextDir, quarantine);
    console.warn(
      `[clean-next] Could not delete .next (files still locked). Renamed to ${path.basename(quarantine)}.`,
    );
    console.warn(
      '[clean-next] You can run the build now. Remove that folder when unlocked (stop `npm run dev`, pause OneDrive, or exclude backend/.next from antivirus).',
    );
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!fs.existsSync(nextDir)) {
    return;
  }

  console.log('[clean-next] removing .next …');
  const outerAttempts = 12;
  for (let i = 0; i < outerAttempts; i++) {
    try {
      fs.rmSync(nextDir, {
        recursive: true,
        force: true,
        maxRetries: 12,
        retryDelay: 200,
      });
      console.log('[clean-next] removed .next');
      return;
    } catch (err) {
      const code = err && err.code;
      if (code !== 'EPERM' && code !== 'EBUSY' && code !== 'ENOTEMPTY' && code !== 'EACCES') {
        throw err;
      }
      console.warn(`[clean-next] ${code} removing .next (attempt ${i + 1}/${outerAttempts}), retrying…`);
      await sleep(400 + i * 250);
    }
  }

  if (tryQuarantine()) {
    return;
  }

  console.error(
    '[clean-next] Still locked. Stop `npm run dev`, close other Node/terminal tabs, pause OneDrive for this repo, or add an antivirus exclusion for backend/.next.',
  );
  process.exit(1);
}

main().catch((e) => {
  console.error('[clean-next]', e);
  process.exit(1);
});
