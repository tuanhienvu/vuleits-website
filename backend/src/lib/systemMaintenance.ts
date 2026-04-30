import { createCipheriv, createDecipheriv, randomBytes, randomUUID, scryptSync } from 'crypto';
import { existsSync } from 'fs';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'fs/promises';
import path from 'path';
import { gzipSync, gunzipSync } from 'zlib';
import { CronExpressionParser } from 'cron-parser';
import { prisma } from './prisma';

export const MAINTENANCE_SETTING_KEY = 'admin.systemMaintenance.config';
const ALGO = 'aes-256-gcm';

type BackupTables = {
  users: unknown[];
  roles: unknown[];
  permissions: unknown[];
  rolePermissions: unknown[];
  userPermissions: unknown[];
  productCategories: unknown[];
  technologies: unknown[];
  media: unknown[];
  aboutSections: unknown[];
  aboutStats: unknown[];
  aboutTeamMembers: unknown[];
  bannerSliders: unknown[];
  bannerItems: unknown[];
  homeFeatures: unknown[];
  news: unknown[];
  privacyPolicies: unknown[];
  termsOfServices: unknown[];
  products: unknown[];
  productTechnologies: unknown[];
  productAnalytics: unknown[];
  serviceItems: unknown[];
  contacts: unknown[];
  siteSettings: unknown[];
  uiMessages: unknown[];
};

export type ScheduleMode = 'hourly' | 'daily' | 'weekly';

export type WeeklyScheduleSlot = {
  dayOfWeek: number;
  time: string;
};

export type BackupScheduleRecord = {
  id: string;
  name: string;
  description: string;
  mode: ScheduleMode;
  hourlyTime: string;
  dailyTimes: string[];
  weeklySlots: WeeklyScheduleSlot[];
  passphrase: string;
  enabled: boolean;
};

export type BackupConfig = {
  enabled: boolean;
  /** Legacy fallback when no calendar schedule is configured. */
  intervalHours: number;
  /** Legacy cron fallback for old data. */
  scheduleCron: string;
  scheduleMode: ScheduleMode;
  /** Hourly mode: runs every hour at the selected minute. */
  hourlyTime: string;
  /** Daily mode: one or many HH:mm entries. */
  dailyTimes: string[];
  /** Weekly mode: one or many weekday + HH:mm entries. */
  weeklySlots: WeeklyScheduleSlot[];
  schedules: BackupScheduleRecord[];
  passphrase: string;
  lastRunAt: string | null;
};

type BackupPayload = {
  version: 1;
  exportedAt: string;
  app: 'vuleits-website';
  note: string;
  tables: BackupTables;
};

function resolveBackupDir() {
  const override = process.env.BACKUP_STORAGE_DIR?.trim();
  if (override) return override;
  const uploads = process.env.UPLOADS_ROOT?.trim();
  if (uploads) return path.join(uploads, 'system-maintenance');
  const cwd = process.cwd();
  if (existsSync(path.join(cwd, '.next', 'standalone', 'backend', 'server.js'))) {
    return path.join(cwd, '.next', 'standalone', 'backend', 'public', 'uploads', 'system-maintenance');
  }
  return path.join(cwd, 'public', 'uploads', 'system-maintenance');
}

function deriveKey(passphrase: string, salt: Buffer) {
  return scryptSync(passphrase, salt, 32);
}

function encrypt(plain: Buffer, passphrase: string): Buffer {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = deriveKey(passphrase, salt);
  const cipher = createCipheriv(ALGO, key, iv);
  const body = Buffer.concat([cipher.update(plain), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([Buffer.from('VSM1'), salt, iv, tag, body]);
}

function decrypt(enc: Buffer, passphrase: string): Buffer {
  if (enc.length < 48 || enc.subarray(0, 4).toString() !== 'VSM1') {
    throw new Error('Invalid backup file signature.');
  }
  const salt = enc.subarray(4, 20);
  const iv = enc.subarray(20, 32);
  const tag = enc.subarray(32, 48);
  const body = enc.subarray(48);
  const key = deriveKey(passphrase, salt);
  const decipher = createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]);
}

function parseTimeToMinuteOfDay(value: string): number | null {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

function normalizeUniqueTimes(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  const out = new Set<string>();
  for (const v of values) {
    if (typeof v !== 'string') continue;
    const t = v.trim();
    if (parseTimeToMinuteOfDay(t) != null) out.add(t);
  }
  return [...out].sort((a, b) => (parseTimeToMinuteOfDay(a) || 0) - (parseTimeToMinuteOfDay(b) || 0));
}

function normalizeWeeklySlots(values: unknown): WeeklyScheduleSlot[] {
  if (!Array.isArray(values)) return [];
  const out: WeeklyScheduleSlot[] = [];
  for (const v of values) {
    if (!v || typeof v !== 'object') continue;
    const o = v as Partial<WeeklyScheduleSlot>;
    const day = Number(o.dayOfWeek);
    const time = typeof o.time === 'string' ? o.time.trim() : '';
    if (!Number.isInteger(day) || day < 0 || day > 6) continue;
    if (parseTimeToMinuteOfDay(time) == null) continue;
    out.push({ dayOfWeek: day, time });
  }
  return out;
}

function normalizeScheduleRecord(raw: unknown): BackupScheduleRecord | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Partial<BackupScheduleRecord>;
  const mode: ScheduleMode =
    o.mode === 'hourly' || o.mode === 'daily' || o.mode === 'weekly' ? o.mode : 'daily';
  const hourlyTime =
    typeof o.hourlyTime === 'string' && parseTimeToMinuteOfDay(o.hourlyTime) != null
      ? o.hourlyTime.trim()
      : '00:00';
  const dailyTimes = normalizeUniqueTimes(o.dailyTimes);
  const weeklySlots = normalizeWeeklySlots(o.weeklySlots);
  return {
    id: typeof o.id === 'string' && o.id ? o.id.slice(0, 80) : randomUUID(),
    name: typeof o.name === 'string' && o.name.trim() ? o.name.trim().slice(0, 120) : 'Schedule',
    description: typeof o.description === 'string' ? o.description.slice(0, 500) : '',
    mode,
    hourlyTime,
    dailyTimes,
    weeklySlots,
    passphrase: typeof o.passphrase === 'string' ? o.passphrase : '',
    enabled: Boolean(o.enabled),
  };
}

export function validateCalendarScheduleConfig(cfg: BackupConfig): { ok: true } | { ok: false; error: string } {
  const active = cfg.schedules.find((x) => x.enabled);
  if (!active) return { ok: true };
  if (!active.passphrase.trim()) {
    return { ok: false, error: 'Active schedule requires encryption passphrase.' };
  }
  if (active.mode === 'hourly') {
    if (parseTimeToMinuteOfDay(active.hourlyTime) == null) {
      return { ok: false, error: 'Hourly schedule requires valid time (HH:mm).' };
    }
    return { ok: true };
  }
  if (active.mode === 'daily') {
    if (!active.dailyTimes.length) {
      return { ok: false, error: 'Daily schedule requires at least one time.' };
    }
    return { ok: true };
  }
  if (active.mode === 'weekly') {
    if (!active.weeklySlots.length) {
      return { ok: false, error: 'Weekly schedule requires at least one day + time entry.' };
    }
    return { ok: true };
  }
  return { ok: false, error: 'Unknown schedule mode.' };
}

export function isIntervalScheduleDue(intervalHours: number, lastRunAt: string | null, now: Date): boolean {
  const last = lastRunAt ? new Date(lastRunAt).getTime() : 0;
  const intervalMs = Math.max(1, Number(intervalHours) || 24) * 60 * 60 * 1000;
  if (last && now.getTime() - last < intervalMs) return false;
  return true;
}

function nextHourlyOccurrenceAfter(anchor: Date, minute: number): Date {
  const d = new Date(anchor);
  d.setSeconds(0, 0);
  d.setMinutes(minute);
  if (d.getTime() <= anchor.getTime()) d.setHours(d.getHours() + 1);
  return d;
}

function nextDailyOccurrenceAfter(anchor: Date, minutesOfDay: number[]): Date | null {
  if (!minutesOfDay.length) return null;
  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    for (const mod of minutesOfDay) {
      const d = new Date(anchor);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + dayOffset);
      d.setMinutes(mod);
      if (d.getTime() > anchor.getTime()) return d;
    }
  }
  return null;
}

function nextWeeklyOccurrenceAfter(anchor: Date, slots: WeeklyScheduleSlot[]): Date | null {
  if (!slots.length) return null;
  for (let dayOffset = 0; dayOffset <= 14; dayOffset += 1) {
    for (const slot of slots) {
      const minuteOfDay = parseTimeToMinuteOfDay(slot.time);
      if (minuteOfDay == null) continue;
      const d = new Date(anchor);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + dayOffset);
      if (d.getDay() !== slot.dayOfWeek) continue;
      d.setMinutes(minuteOfDay);
      if (d.getTime() > anchor.getTime()) return d;
    }
  }
  return null;
}

function isCalendarScheduleDue(cfg: BackupConfig, now: Date): boolean {
  const active = cfg.schedules.find((x) => x.enabled);
  if (!active) return false;
  const baseline = cfg.lastRunAt ? new Date(cfg.lastRunAt) : new Date(now.getTime() - 60_000);
  if (active.mode === 'hourly') {
    const minuteOfDay = parseTimeToMinuteOfDay(active.hourlyTime);
    if (minuteOfDay == null) return false;
    const minute = minuteOfDay % 60;
    const next = nextHourlyOccurrenceAfter(baseline, minute);
    return next.getTime() <= now.getTime();
  }
  if (active.mode === 'daily') {
    const entries = active.dailyTimes
      .map((x) => parseTimeToMinuteOfDay(x))
      .filter((x): x is number => x != null);
    const next = nextDailyOccurrenceAfter(baseline, entries);
    return next ? next.getTime() <= now.getTime() : false;
  }
  const next = nextWeeklyOccurrenceAfter(baseline, active.weeklySlots);
  return next ? next.getTime() <= now.getTime() : false;
}

/** Whether a scheduled backup should run now (calendar schedule; legacy fallbacks supported). */
export function isBackupScheduleDue(cfg: BackupConfig, now = new Date()): boolean {
  if (!cfg.enabled) return false;
  const valid = validateCalendarScheduleConfig(cfg);
  if (valid.ok) return isCalendarScheduleDue(cfg, now);
  const legacyCron = (cfg.scheduleCron || '').trim();
  if (legacyCron) {
    // Backward compatibility for old saved configs.
    try {
      const parts = legacyCron.split(/\s+/).filter(Boolean);
      if (parts.length === 6) {
        const lastMs = cfg.lastRunAt ? new Date(cfg.lastRunAt).getTime() : 0;
        const iter = CronExpressionParser.parse(legacyCron, { currentDate: new Date(lastMs + 1) });
        const next = iter.next().toDate().getTime();
        return next <= now.getTime();
      }
    } catch {
      // fall through
    }
  }
  return isIntervalScheduleDue(cfg.intervalHours, cfg.lastRunAt, now);
}

export async function loadBackupConfig(): Promise<BackupConfig> {
  const row = await prisma.siteSetting.findUnique({ where: { key: MAINTENANCE_SETTING_KEY } });
  const fallback: BackupConfig = {
    enabled: false,
    intervalHours: 24,
    scheduleCron: '',
    scheduleMode: 'daily',
    hourlyTime: '00:00',
    dailyTimes: ['04:30'],
    weeklySlots: [{ dayOfWeek: 1, time: '12:00' }],
    schedules: [],
    passphrase: '',
    lastRunAt: null,
  };
  if (!row?.value) return fallback;
  try {
    const parsed = JSON.parse(row.value) as Partial<BackupConfig> & {
      providers?: unknown;
      schedulePresets?: unknown;
      activePresetId?: unknown;
    };
    const mode: ScheduleMode =
      parsed.scheduleMode === 'hourly' || parsed.scheduleMode === 'daily' || parsed.scheduleMode === 'weekly'
        ? parsed.scheduleMode
        : 'daily';
    const hourlyTime =
      typeof parsed.hourlyTime === 'string' && parseTimeToMinuteOfDay(parsed.hourlyTime) != null
        ? parsed.hourlyTime.trim()
        : fallback.hourlyTime;
    const dailyTimes = normalizeUniqueTimes(parsed.dailyTimes);
    const weeklySlots = normalizeWeeklySlots(parsed.weeklySlots);
    const schedules = Array.isArray(parsed.schedules)
      ? parsed.schedules
          .map(normalizeScheduleRecord)
          .filter((x): x is BackupScheduleRecord => Boolean(x))
      : [];
    // keep single active schedule
    let seenActive = false;
    const normalizedSchedules = schedules.map((s) => {
      if (!s.enabled || seenActive) return { ...s, enabled: false };
      seenActive = true;
      return s;
    });
    return {
      enabled: Boolean(parsed.enabled),
      intervalHours: Math.min(24 * 30, Math.max(1, Number(parsed.intervalHours) || 24)),
      scheduleCron: typeof parsed.scheduleCron === 'string' ? parsed.scheduleCron : '',
      scheduleMode: mode,
      hourlyTime,
      dailyTimes: dailyTimes.length ? dailyTimes : fallback.dailyTimes,
      weeklySlots: weeklySlots.length ? weeklySlots : fallback.weeklySlots,
      schedules: normalizedSchedules,
      passphrase: typeof parsed.passphrase === 'string' ? parsed.passphrase : '',
      lastRunAt: typeof parsed.lastRunAt === 'string' ? parsed.lastRunAt : null,
    };
  } catch {
    return fallback;
  }
}

export async function saveBackupConfig(cfg: BackupConfig) {
  await prisma.siteSetting.upsert({
    where: { key: MAINTENANCE_SETTING_KEY },
    create: { key: MAINTENANCE_SETTING_KEY, value: JSON.stringify(cfg) },
    update: { value: JSON.stringify(cfg) },
  });
}

async function exportTables(): Promise<BackupTables> {
  return {
    users: await prisma.user.findMany(),
    roles: await prisma.role.findMany(),
    permissions: await prisma.permission.findMany(),
    rolePermissions: await prisma.rolePermission.findMany(),
    userPermissions: await prisma.userPermission.findMany(),
    productCategories: await prisma.productCategory.findMany(),
    technologies: await prisma.technology.findMany(),
    media: await prisma.media.findMany(),
    aboutSections: await prisma.aboutSection.findMany(),
    aboutStats: await prisma.aboutStat.findMany(),
    aboutTeamMembers: await prisma.aboutTeamMember.findMany(),
    bannerSliders: await prisma.bannerSlider.findMany(),
    bannerItems: await prisma.bannerItem.findMany(),
    homeFeatures: await prisma.homeFeature.findMany(),
    news: await prisma.news.findMany(),
    privacyPolicies: await prisma.privacyPolicy.findMany(),
    termsOfServices: await prisma.termsOfService.findMany(),
    products: await prisma.product.findMany(),
    productTechnologies: await prisma.productTechnology.findMany(),
    productAnalytics: await prisma.productAnalytics.findMany(),
    serviceItems: await prisma.serviceItem.findMany(),
    contacts: await prisma.contact.findMany(),
    siteSettings: await prisma.siteSetting.findMany(),
    uiMessages: await prisma.uiMessage.findMany(),
  };
}

export async function createEncryptedBackup(passphrase: string, reason = 'manual') {
  if (!passphrase) throw new Error('Missing backup passphrase.');
  const payload: BackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: 'vuleits-website',
    note: reason,
    tables: await exportTables(),
  };
  const plain = Buffer.from(JSON.stringify(payload), 'utf8');
  const zipped = gzipSync(plain, { level: 9 });
  const enc = encrypt(zipped, passphrase);

  const dir = resolveBackupDir();
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `db-backup-${stamp}.json.gz.enc`;
  const fullPath = path.join(dir, fileName);
  await writeFile(fullPath, enc);

  return { fileName, fullPath, sizeBytes: enc.length, exportedAt: payload.exportedAt };
}

function safeBackupFileName(name: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) throw new Error('Invalid backup file name.');
  return name;
}

export async function listBackups() {
  const dir = resolveBackupDir();
  await mkdir(dir, { recursive: true });
  const files = await readdir(dir);
  const rows: Array<{ fileName: string; sizeBytes: number; modifiedAt: string }> = [];
  for (const f of files.filter((x) => x.endsWith('.enc'))) {
    const st = await stat(path.join(dir, f));
    rows.push({ fileName: f, sizeBytes: st.size, modifiedAt: st.mtime.toISOString() });
  }
  rows.sort((a, b) => (a.modifiedAt < b.modifiedAt ? 1 : -1));
  return rows;
}

export async function readBackupFileBuffer(fileName: string) {
  const safe = safeBackupFileName(fileName);
  const full = path.join(resolveBackupDir(), safe);
  return readFile(full);
}

export async function restoreFromEncryptedBuffer(enc: Buffer, passphrase: string) {
  const plainGzip = decrypt(enc, passphrase);
  const plain = gunzipSync(plainGzip);
  const parsed = JSON.parse(plain.toString('utf8')) as BackupPayload;
  if (!parsed?.tables) throw new Error('Invalid backup payload.');

  const t = parsed.tables;
  await prisma.$transaction(async (tx) => {
    await tx.productAnalytics.deleteMany();
    await tx.productTechnology.deleteMany();
    await tx.userPermission.deleteMany();
    await tx.rolePermission.deleteMany();
    await tx.product.deleteMany();
    await tx.news.deleteMany();
    await tx.bannerItem.deleteMany();
    await tx.bannerSlider.deleteMany();
    await tx.aboutSection.deleteMany();
    await tx.homeFeature.deleteMany();
    await tx.contact.deleteMany();
    await tx.aboutStat.deleteMany();
    await tx.aboutTeamMember.deleteMany();
    await tx.media.deleteMany();
    await tx.productCategory.deleteMany();
    await tx.technology.deleteMany();
    await tx.privacyPolicy.deleteMany();
    await tx.termsOfService.deleteMany();
    await tx.serviceItem.deleteMany();
    await tx.uiMessage.deleteMany();
    await tx.siteSetting.deleteMany({ where: { key: { not: MAINTENANCE_SETTING_KEY } } });
    await tx.user.deleteMany();
    await tx.permission.deleteMany();
    await tx.role.deleteMany();

    await tx.role.createMany({ data: (t.roles as any[]) || [] });
    await tx.permission.createMany({ data: (t.permissions as any[]) || [] });
    await tx.user.createMany({ data: (t.users as any[]) || [] });
    await tx.rolePermission.createMany({ data: (t.rolePermissions as any[]) || [] });
    await tx.userPermission.createMany({ data: (t.userPermissions as any[]) || [] });

    await tx.productCategory.createMany({ data: (t.productCategories as any[]) || [] });
    await tx.technology.createMany({ data: (t.technologies as any[]) || [] });
    await tx.media.createMany({ data: (t.media as any[]) || [] });
    await tx.aboutStat.createMany({ data: (t.aboutStats as any[]) || [] });
    await tx.aboutTeamMember.createMany({ data: (t.aboutTeamMembers as any[]) || [] });
    await tx.aboutSection.createMany({ data: (t.aboutSections as any[]) || [] });
    await tx.bannerSlider.createMany({ data: (t.bannerSliders as any[]) || [] });
    await tx.bannerItem.createMany({ data: (t.bannerItems as any[]) || [] });
    await tx.homeFeature.createMany({ data: (t.homeFeatures as any[]) || [] });
    await tx.news.createMany({ data: (t.news as any[]) || [] });
    await tx.privacyPolicy.createMany({ data: (t.privacyPolicies as any[]) || [] });
    await tx.termsOfService.createMany({ data: (t.termsOfServices as any[]) || [] });
    await tx.product.createMany({ data: (t.products as any[]) || [] });
    await tx.productTechnology.createMany({ data: (t.productTechnologies as any[]) || [] });
    await tx.productAnalytics.createMany({ data: (t.productAnalytics as any[]) || [] });
    await tx.serviceItem.createMany({ data: (t.serviceItems as any[]) || [] });
    await tx.contact.createMany({ data: (t.contacts as any[]) || [] });
    await tx.siteSetting.createMany({
      data: ((t.siteSettings as any[]) || []).filter(
        (s) => (s as { key?: string }).key !== MAINTENANCE_SETTING_KEY,
      ),
    });
    await tx.uiMessage.createMany({ data: (t.uiMessages as any[]) || [] });
  });
}

export async function restoreFromEncryptedBackup(fileName: string, passphrase: string) {
  const enc = await readBackupFileBuffer(fileName);
  await restoreFromEncryptedBuffer(enc, passphrase);
}

export function assertEncryptedBackupHeader(buf: Buffer) {
  if (buf.length < 48 || buf.subarray(0, 4).toString() !== 'VSM1') {
    throw new Error('File does not look like a valid encrypted backup (expected VSM1 header).');
  }
}

export async function saveUploadedBackupFile(originalName: string, data: Buffer): Promise<string> {
  assertEncryptedBackupHeader(data);
  const safeBase = path
    .basename(originalName)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 120);
  const suffix = safeBase.toLowerCase().endsWith('.enc') ? '' : '.enc';
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `upload-${stamp}-${safeBase || 'backup'}${suffix}`;
  const dir = resolveBackupDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), data);
  return fileName;
}

export async function removeBackupFile(fileName: string) {
  const safe = safeBackupFileName(fileName);
  await rm(path.join(resolveBackupDir(), safe), { force: true });
}
