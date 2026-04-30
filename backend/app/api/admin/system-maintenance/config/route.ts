import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import {
  validateCalendarScheduleConfig,
  loadBackupConfig,
  saveBackupConfig,
  type BackupConfig,
} from '@/lib/systemMaintenance';

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const cfg = await loadBackupConfig();
  const maskedSchedules = cfg.schedules.map((s) => ({
    ...s,
    passphrase: s.passphrase ? '********' : '',
  }));
  return NextResponse.json({
    ...cfg,
    passphrase: cfg.passphrase ? '********' : '',
    schedules: maskedSchedules,
  });
}

export async function PUT(req: Request) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;
  const body = (await req.json().catch(() => ({}))) as Partial<BackupConfig>;
  const current = await loadBackupConfig();

  const next: BackupConfig = {
    enabled: body.enabled !== undefined ? Boolean(body.enabled) : current.enabled,
    intervalHours: Math.min(
      24 * 30,
      Math.max(1, Number(body.intervalHours !== undefined ? body.intervalHours : current.intervalHours) || 24),
    ),
    scheduleCron:
      typeof body.scheduleCron === 'string' ? body.scheduleCron.trim() : current.scheduleCron,
    scheduleMode:
      body.scheduleMode === 'hourly' || body.scheduleMode === 'daily' || body.scheduleMode === 'weekly'
        ? body.scheduleMode
        : current.scheduleMode,
    hourlyTime:
      typeof body.hourlyTime === 'string' ? body.hourlyTime.trim() : current.hourlyTime,
    dailyTimes:
      Array.isArray(body.dailyTimes) && body.dailyTimes.every((x) => typeof x === 'string')
        ? body.dailyTimes
        : current.dailyTimes,
    weeklySlots:
      Array.isArray(body.weeklySlots) &&
      body.weeklySlots.every((x) => x && typeof x === 'object')
        ? (body.weeklySlots as BackupConfig['weeklySlots'])
        : current.weeklySlots,
    schedules:
      Array.isArray(body.schedules) && body.schedules.every((x) => x && typeof x === 'object')
        ? (body.schedules as BackupConfig['schedules']).map((s, idx) => ({
            id: typeof s.id === 'string' ? s.id : `schedule-${idx + 1}`,
            name: typeof s.name === 'string' ? s.name : `Schedule ${idx + 1}`,
            description: typeof s.description === 'string' ? s.description : '',
            mode: s.mode === 'hourly' || s.mode === 'daily' || s.mode === 'weekly' ? s.mode : 'daily',
            hourlyTime: typeof s.hourlyTime === 'string' ? s.hourlyTime : '00:00',
            dailyTimes: Array.isArray(s.dailyTimes) ? s.dailyTimes : [],
            weeklySlots: Array.isArray(s.weeklySlots) ? s.weeklySlots : [],
            passphrase:
              typeof s.passphrase === 'string' && s.passphrase !== '********'
                ? s.passphrase
                : current.schedules.find((x) => x.id === s.id)?.passphrase || '',
            enabled: Boolean(s.enabled),
          }))
        : current.schedules,
    passphrase:
      typeof body.passphrase === 'string' && body.passphrase.trim()
        ? body.passphrase.trim()
        : current.passphrase,
    lastRunAt: current.lastRunAt,
  };

  const validation = validateCalendarScheduleConfig(next);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // enforce only one enabled schedule
  let seenEnabled = false;
  next.schedules = next.schedules.map((s) => {
    if (!s.enabled || seenEnabled) return { ...s, enabled: false };
    seenEnabled = true;
    return s;
  });

  await saveBackupConfig(next);
  return NextResponse.json({ ok: true });
}
