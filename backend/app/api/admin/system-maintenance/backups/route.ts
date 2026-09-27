import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import {
  appendBackupLog,
  createEncryptedBackup,
  listBackups,
  loadBackupConfig,
  saveBackupConfig,
} from '@/lib/systemMaintenance';

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const files = await listBackups();
  return NextResponse.json({ files });
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.create');
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as { passphrase?: string; reason?: string };
  const cfg = await loadBackupConfig();
  const active = cfg.schedules.find((x) => x.enabled);
  const passphrase = (body.passphrase || '').trim() || active?.passphrase || cfg.passphrase;
  if (!passphrase) {
    return NextResponse.json({ error: 'Missing encryption passphrase.' }, { status: 400 });
  }
  try {
    const backup = await createEncryptedBackup(passphrase, body.reason || 'manual');
    cfg.lastRunAt = new Date().toISOString();
    await saveBackupConfig(cfg);
    await appendBackupLog({
      trigger: 'manual',
      success: true,
      message: `Manual backup created: ${backup.fileName}`,
      meta: { fileName: backup.fileName, sizeBytes: backup.sizeBytes },
    });
    return NextResponse.json({ ok: true, backup });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await appendBackupLog({ trigger: 'manual', success: false, message: msg });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
