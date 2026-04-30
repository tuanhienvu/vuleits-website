import { NextResponse } from 'next/server';
import {
  createEncryptedBackup,
  isBackupScheduleDue,
  loadBackupConfig,
  saveBackupConfig,
} from '@/lib/systemMaintenance';

function authorizedBySchedulerToken(req: Request) {
  const expected = process.env.SYSTEM_MAINTENANCE_SCHEDULER_TOKEN?.trim();
  if (!expected) return false;
  const got = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  return got && got === expected;
}

export async function POST(req: Request) {
  if (!authorizedBySchedulerToken(req)) {
    return NextResponse.json({ error: 'Unauthorized scheduler token' }, { status: 401 });
  }
  const cfg = await loadBackupConfig();
  const active = cfg.schedules.find((x) => x.enabled);
  if (!cfg.enabled || !active?.passphrase) {
    return NextResponse.json({ ok: true, skipped: 'disabled-or-missing-passphrase' });
  }
  const now = new Date();
  if (!isBackupScheduleDue(cfg, now)) {
    return NextResponse.json({ ok: true, skipped: 'not-due' });
  }
  const backup = await createEncryptedBackup(active.passphrase, 'scheduled');
  cfg.lastRunAt = new Date().toISOString();
  await saveBackupConfig(cfg);
  return NextResponse.json({ ok: true, backup });
}
