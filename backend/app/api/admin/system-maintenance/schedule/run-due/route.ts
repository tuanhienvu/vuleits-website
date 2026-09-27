import { NextResponse } from 'next/server';
import { runScheduledBackupDueTick } from '@/lib/systemMaintenance';

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

  const result = await runScheduledBackupDueTick();
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }
  if ('skipped' in result) {
    return NextResponse.json({ ok: true, skipped: result.skipped });
  }
  return NextResponse.json({ ok: true, backup: result.backup, cleanup: result.cleanup });
}
