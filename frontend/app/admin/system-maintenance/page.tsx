'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { apiPath } from '@/lib/apiRoutes';
import { PasswordPreviewInput } from '@/components/ui/PasswordPreviewInput';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';

type BackupFile = { fileName: string; sizeBytes: number; modifiedAt: string };
type ScheduleMode = 'hourly' | 'daily' | 'weekly';
type WeeklySlot = { dayOfWeek: number; time: string };
type ScheduleRecord = {
  id: string;
  name: string;
  description: string;
  mode: ScheduleMode;
  hourlyTime: string;
  dailyTimes: string[];
  weeklySlots: WeeklySlot[];
  passphrase: string;
  enabled: boolean;
};

type BackupConfig = {
  enabled: boolean;
  intervalHours: number;
  scheduleCron: string;
  scheduleMode: ScheduleMode;
  hourlyTime: string;
  dailyTimes: string[];
  weeklySlots: WeeklySlot[];
  schedules: ScheduleRecord[];
  passphrase: string;
  lastRunAt: string | null;
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const totalMinutes = i * 30;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const m = String(totalMinutes % 60).padStart(2, '0');
  return `${h}:${m}`;
});

export default function SystemMaintenancePage() {
  const { t } = useLocale();
  const { can } = useAdminPermissions();
  const [cfg, setCfg] = useState<BackupConfig>({
    enabled: false,
    intervalHours: 24,
    scheduleCron: '',
    scheduleMode: 'daily',
    hourlyTime: '00:00',
    dailyTimes: [],
    weeklySlots: [],
    schedules: [],
    passphrase: '',
    lastRunAt: null,
  });
  const [draftName, setDraftName] = useState('');
  const [draftDesc, setDraftDesc] = useState('');
  const [draftPassphrase, setDraftPassphrase] = useState('');
  const [draftMode, setDraftMode] = useState<ScheduleMode>('daily');
  const [hourlyTime, setHourlyTime] = useState('00:00');
  const [dailyTimes, setDailyTimes] = useState<string[]>([]);
  const [dailyDraft, setDailyDraft] = useState('04:30');
  const [weeklySlots, setWeeklySlots] = useState<WeeklySlot[]>([]);
  const [weeklyDaysDraft, setWeeklyDaysDraft] = useState<number[]>([1]);
  const [weeklyTimeDraft, setWeeklyTimeDraft] = useState('12:00');
  const [manualPassphrase, setManualPassphrase] = useState('');
  const [files, setFiles] = useState<BackupFile[]>([]);
  const [restoreSource, setRestoreSource] = useState<'server' | 'local'>('server');
  const [restoreFile, setRestoreFile] = useState('');
  const [localBackupFile, setLocalBackupFile] = useState<File | null>(null);
  const [restorePassphrase, setRestorePassphrase] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const [cfgRes, filesRes] = await Promise.all([
      fetch(apiPath('admin/system-maintenance/config'), { credentials: 'include' }),
      fetch(apiPath('admin/system-maintenance/backups'), { credentials: 'include' }),
    ]);
    if (cfgRes.ok) {
      const j = (await cfgRes.json()) as BackupConfig;
      setCfg({
        enabled: Boolean(j.enabled),
        intervalHours: Number(j.intervalHours) || 24,
        scheduleCron: typeof j.scheduleCron === 'string' ? j.scheduleCron : '',
        scheduleMode:
          j.scheduleMode === 'hourly' || j.scheduleMode === 'daily' || j.scheduleMode === 'weekly'
            ? j.scheduleMode
            : 'daily',
        hourlyTime: typeof j.hourlyTime === 'string' ? j.hourlyTime : '00:00',
        dailyTimes: Array.isArray(j.dailyTimes) ? j.dailyTimes : [],
        weeklySlots: Array.isArray(j.weeklySlots) ? j.weeklySlots : [],
        schedules: Array.isArray(j.schedules) ? j.schedules : [],
        passphrase: typeof j.passphrase === 'string' ? j.passphrase : '',
        lastRunAt: j.lastRunAt ?? null,
      });
    }
    if (filesRes.ok) setFiles(((await filesRes.json()) as { files: BackupFile[] }).files || []);
  }, []);

  useEffect(() => {
    if (can('maintenance', 'read')) void load();
  }, [can, load]);

  useEffect(() => {
    setSelectedScheduleIds((prev) => prev.filter((id) => cfg.schedules.some((s) => s.id === id)));
  }, [cfg.schedules]);

  if (!can('maintenance', 'read')) {
    return <div className="text-white/70">{t('admin.noPermissionShort')}</div>;
  }

  const persistSchedules = async (nextSchedules: ScheduleRecord[]) => {
    const normalized = nextSchedules.map((s, idx) => ({ ...s, enabled: s.enabled && nextSchedules.findIndex((x) => x.enabled) === idx }));
    const res = await fetch(apiPath('admin/system-maintenance/config'), {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: normalized.some((x) => x.enabled),
        schedules: normalized,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) throw new Error(body.error || t('admin.systemMaintenanceMsgSaveConfigFailed'));
    await load();
  };

  const formatScheduleDetail = (s: ScheduleRecord) => {
    if (s.mode === 'hourly') return `Hourly @ ${s.hourlyTime}`;
    if (s.mode === 'daily') return `Daily @ ${s.dailyTimes.join(', ') || '-'}`;
    return `Weekly @ ${s.weeklySlots.map((x) => `${dayNames[x.dayOfWeek]} ${x.time}`).join(' | ') || '-'}`;
  };

  return (
    <div className="space-y-6 text-white/90">
      <div>
        <h1 className="text-2xl font-bold">{t('admin.systemMaintenanceTitle')}</h1>
        <p className="text-white/60 mt-2">{t('admin.systemMaintenanceDesc')}</p>
      </div>

      <section className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h2 className="text-lg font-semibold">{t('admin.systemMaintenanceBackupDatabase')}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm flex items-center gap-3">
              <span className="w-40 shrink-0">Schedule name</span>
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
              />
            </label>
            <label className="text-sm flex items-center gap-3">
              <span className="w-40 shrink-0">Description</span>
              <input
                value={draftDesc}
                onChange={(e) => setDraftDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
              />
            </label>
            <label className="text-sm flex items-center gap-3">
              <span className="w-40 shrink-0">{t('admin.systemMaintenancePassphrase')}</span>
              <PasswordPreviewInput
                value={draftPassphrase}
                onChange={(e) => setDraftPassphrase(e.target.value)}
                inputClassName="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
                previewAriaLabel={t('admin.passwordPreviewAria')}
              />
            </label>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {(['hourly', 'daily', 'weekly'] as ScheduleMode[]).map((mode) => (
                <label
                  key={mode}
                  className={`rounded-lg border px-3 h-[42px] inline-flex items-center justify-center cursor-pointer text-center ${
                    draftMode === mode ? 'border-cyan-300/50 bg-cyan-500/10' : 'border-white/15 bg-black/20'
                  }`}
                >
                  <input
                    type="radio"
                    className="mr-1"
                    checked={draftMode === mode}
                    onChange={() => setDraftMode(mode)}
                  />
                  <span className="uppercase text-xs">{mode}</span>
                </label>
              ))}
            </div>

            {draftMode === 'hourly' ? (
              <label className="text-sm flex items-center gap-3">
                <span className="w-32 shrink-0">Time period</span>
                <select
                  value={hourlyTime}
                  onChange={(e) => setHourlyTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
                >
                  {timeOptions.map((tVal) => (
                    <option key={tVal} value={tVal}>
                      {tVal}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {draftMode === 'daily' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm flex items-center gap-3 flex-1">
                    <span className="w-32 shrink-0">Time period</span>
                    <select
                      value={dailyDraft}
                      onChange={(e) => setDailyDraft(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
                    >
                      {timeOptions.map((tVal) => (
                        <option key={tVal} value={tVal}>
                          {tVal}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg px-3 py-2 text-sm border bg-emerald-500/20 border-emerald-300/40 text-emerald-200 hover:bg-emerald-500/30"
                    onClick={() => setDailyTimes((s) => (s.includes(dailyDraft) ? s : [...s, dailyDraft].sort()))}
                  >
                    Add time
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dailyTimes.map((tm) => (
                    <button
                      key={tm}
                      type="button"
                      className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20"
                      onClick={() => setDailyTimes((s) => s.filter((x) => x !== tm))}
                    >
                      {tm} ×
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {draftMode === 'weekly' ? (
              <div className="space-y-2">
                <div className="text-sm flex items-start gap-3">
                  <span className="w-32 shrink-0 pt-2">Week-day</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                    {dayNames.map((name, day) => (
                      <label
                        key={day}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 border border-white/20 text-sm h-[42px]"
                      >
                        <input
                          type="checkbox"
                          checked={weeklyDaysDraft.includes(day)}
                          onChange={(e) =>
                            setWeeklyDaysDraft((prev) =>
                              e.target.checked ? [...new Set([...prev, day])] : prev.filter((d) => d !== day),
                            )
                          }
                        />
                        {name}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm flex items-center gap-3 flex-1">
                    <span className="w-32 shrink-0">Time period</span>
                    <select
                      value={weeklyTimeDraft}
                      onChange={(e) => setWeeklyTimeDraft(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20 h-[42px]"
                    >
                      {timeOptions.map((tVal) => (
                        <option key={tVal} value={tVal}>
                          {tVal}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg px-3 py-2 text-sm border bg-emerald-500/20 border-emerald-300/40 text-emerald-200 hover:bg-emerald-500/30"
                    onClick={() =>
                      setWeeklySlots((s) => {
                        const adds = weeklyDaysDraft
                          .map((day) => ({ dayOfWeek: day, time: weeklyTimeDraft }))
                          .filter((x) => !s.some((e) => e.dayOfWeek === x.dayOfWeek && e.time === x.time));
                        return [...s, ...adds];
                      })
                    }
                  >
                    Add period
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weeklySlots.map((slot, idx) => (
                    <button
                      key={`${slot.dayOfWeek}-${slot.time}-${idx}`}
                      type="button"
                      className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20"
                      onClick={() => setWeeklySlots((s) => s.filter((_, i) => i !== idx))}
                    >
                      {dayNames[slot.dayOfWeek]} {slot.time} ×
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full rounded-lg px-3 py-2 text-sm border bg-emerald-500/20 border-emerald-300/40 text-emerald-200 hover:bg-emerald-500/30"
            disabled={busy || !can('maintenance', 'update')}
            onClick={async () => {
              if (!draftName.trim()) {
                setMsg('Schedule name is required.');
                return;
              }
              if (!draftPassphrase.trim()) {
                setMsg('Encryption passphrase is required.');
                return;
              }
              if (draftMode === 'daily' && dailyTimes.length === 0) {
                setMsg('Please add at least one daily time.');
                return;
              }
              if (draftMode === 'weekly' && weeklySlots.length === 0) {
                setMsg('Please add at least one weekly day/time.');
                return;
              }
              const newRecord: ScheduleRecord = {
                id: crypto.randomUUID(),
                name: draftName.trim(),
                description: draftDesc.trim(),
                mode: draftMode,
                hourlyTime,
                dailyTimes,
                weeklySlots,
                passphrase: draftPassphrase.trim(),
                enabled: false,
              };
              setBusy(true);
              setMsg('');
              try {
                await persistSchedules([...cfg.schedules, newRecord]);
                setDraftName('');
                setDraftDesc('');
                setDraftPassphrase('');
                setDailyTimes([]);
                setWeeklySlots([]);
                setMsg(t('admin.systemMaintenanceMsgConfigSaved'));
              } catch (e) {
                setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgSaveFailed'));
              } finally {
                setBusy(false);
              }
            }}
          >
            Add schedule
          </button>
          <button
            type="button"
            className="btn-admin-secondary w-full"
            disabled={busy || !can('maintenance', 'create')}
            onClick={async () => {
              setBusy(true);
              setMsg('');
              try {
                const res = await fetch(apiPath('admin/system-maintenance/backups'), {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ passphrase: manualPassphrase }),
                });
                const body = (await res.json().catch(() => ({}))) as { error?: string };
                if (!res.ok) throw new Error(body.error || t('admin.systemMaintenanceMsgBackupFailed'));
                setMsg(t('admin.systemMaintenanceMsgBackupCreated'));
                await load();
              } catch (e) {
                setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgBackupFailed'));
              } finally {
                setBusy(false);
              }
            }}
          >
            Creat backup file
          </button>
        </div>

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-white/60 bg-white/5">
              <tr>
                <th className="text-left py-2 px-3 w-10">
                  <input
                    type="checkbox"
                    checked={cfg.schedules.length > 0 && selectedScheduleIds.length === cfg.schedules.length}
                    onChange={(e) =>
                      setSelectedScheduleIds(e.target.checked ? cfg.schedules.map((s) => s.id) : [])
                    }
                  />
                </th>
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-left py-2 px-3">Description</th>
                <th className="text-left py-2 px-3">Schedule detail</th>
                <th className="text-left py-2 px-3">Encrypt passphrase</th>
                <th className="text-left py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cfg.schedules.map((s) => (
                <tr key={s.id} className="border-t border-white/10">
                  <td className="py-2 px-3">
                    <input
                      type="checkbox"
                      checked={selectedScheduleIds.includes(s.id)}
                      onChange={(e) =>
                        setSelectedScheduleIds((prev) =>
                          e.target.checked ? [...new Set([...prev, s.id])] : prev.filter((id) => id !== s.id),
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-3">{s.name}</td>
                  <td className="py-2 px-3 text-white/75">{s.description || '-'}</td>
                  <td className="py-2 px-3 text-xs">{formatScheduleDetail(s)}</td>
                  <td className="py-2 px-3">{s.passphrase ? '********' : '-'}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={s.enabled}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition border ${
                          s.enabled
                            ? 'bg-emerald-500/30 border-emerald-300/50'
                            : 'bg-white/10 border-white/20'
                        }`}
                        disabled={busy || !can('maintenance', 'update')}
                        onClick={async () => {
                          if (!s.passphrase.trim()) {
                            setMsg('Cannot enable schedule without Encryption passphrase.');
                            return;
                          }
                          const next = cfg.schedules.map((x) =>
                            x.id === s.id ? { ...x, enabled: !x.enabled } : { ...x, enabled: false },
                          );
                          setBusy(true);
                          setMsg('');
                          try {
                            await persistSchedules(next);
                          } catch (e) {
                            setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgSaveFailed'));
                          } finally {
                            setBusy(false);
                          }
                        }}
                        title={s.enabled ? 'Disable schedule' : 'Enable schedule'}
                        aria-label={s.enabled ? 'Disable schedule' : 'Enable schedule'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            s.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-rose-300/40 bg-rose-500/10 text-rose-200"
                        disabled={busy || !can('maintenance', 'update')}
                        onClick={async () => {
                          if (!window.confirm('Delete this schedule?')) return;
                          const next = cfg.schedules.filter((x) => x.id !== s.id);
                          setBusy(true);
                          setMsg('');
                          try {
                            await persistSchedules(next);
                          } catch (e) {
                            setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgSaveFailed'));
                          } finally {
                            setBusy(false);
                          }
                        }}
                        title="Delete schedule"
                        aria-label="Delete schedule"
                      >
                        <AdminTrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cfg.schedules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 px-3 text-white/45">
                    No schedules yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-rose-300/40 bg-rose-500/10 text-rose-200 disabled:opacity-40"
            disabled={busy || !can('maintenance', 'update') || selectedScheduleIds.length === 0}
            onClick={async () => {
              if (!window.confirm(`Delete ${selectedScheduleIds.length} selected schedule(s)?`)) return;
              const next = cfg.schedules.filter((s) => !selectedScheduleIds.includes(s.id));
              setBusy(true);
              setMsg('');
              try {
                await persistSchedules(next);
                setSelectedScheduleIds([]);
              } catch (e) {
                setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgSaveFailed'));
              } finally {
                setBusy(false);
              }
            }}
          >
            <AdminTrashIcon />
            Delete selected
          </button>
        </div>

        <div className="text-xs text-white/70">
          {t('admin.systemMaintenanceLastScheduledRun')}:{' '}
          {cfg.lastRunAt ? new Date(cfg.lastRunAt).toLocaleString() : t('admin.systemMaintenanceNever')}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-3">
        <h2 className="text-lg font-semibold">{t('admin.systemMaintenanceRestoreFromBackup')}</h2>
        <div className="text-sm text-white/70 space-y-2">
          <span className="font-medium text-white/85">{t('admin.systemMaintenanceRestoreSource')}</span>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="restore-src"
                checked={restoreSource === 'server'}
                onChange={() => setRestoreSource('server')}
              />
              {t('admin.systemMaintenanceRestoreFromServer')}
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="restore-src"
                checked={restoreSource === 'local'}
                onChange={() => setRestoreSource('local')}
              />
              {t('admin.systemMaintenanceRestoreFromLocal')}
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {restoreSource === 'server' ? (
            <label className="text-sm">
              {t('admin.systemMaintenanceBackupFile')}
              <select
                value={restoreFile}
                onChange={(e) => setRestoreFile(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
              >
                <option value="">{t('admin.systemMaintenanceSelectFile')}</option>
                {files.map((f) => (
                  <option key={f.fileName} value={f.fileName}>
                    {f.fileName}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="text-sm">
              <span className="block text-white/90 mb-1">{t('admin.systemMaintenanceBackupFile')}</span>
              <input
                type="file"
                accept=".enc,application/octet-stream"
                className="mt-1 block w-full text-sm text-white/80 file:mr-3 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-white"
                onChange={(e) => setLocalBackupFile(e.target.files?.[0] ?? null)}
              />
              {localBackupFile ? (
                <span className="text-xs text-white/55 mt-1 block truncate">{localBackupFile.name}</span>
              ) : null}
            </div>
          )}
          <label className="text-sm">
            {t('admin.systemMaintenancePassphrase')}
            <PasswordPreviewInput
              value={restorePassphrase}
              onChange={(e) => setRestorePassphrase(e.target.value)}
              className="mt-1"
              inputClassName="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20"
              placeholder={t('admin.systemMaintenancePassphraseDecryptPlaceholder')}
              previewAriaLabel={t('admin.passwordPreviewAria')}
            />
          </label>
        </div>
        <button
          className="btn-admin-secondary"
          disabled={busy || !can('maintenance', 'update')}
          onClick={async () => {
            if (!restorePassphrase) return;
            if (restoreSource === 'server') {
              if (!restoreFile) return;
            } else if (!localBackupFile) {
              setMsg(t('admin.systemMaintenanceRestoreNoLocalFile'));
              return;
            }
            if (!window.confirm(t('admin.systemMaintenanceRestoreConfirm'))) return;
            setBusy(true);
            setMsg('');
            try {
              if (restoreSource === 'local' && localBackupFile) {
                const fd = new FormData();
                fd.append('file', localBackupFile);
                fd.append('passphrase', restorePassphrase);
                const res = await fetch(apiPath('admin/system-maintenance/restore'), {
                  method: 'POST',
                  credentials: 'include',
                  body: fd,
                });
                const body = (await res.json().catch(() => ({}))) as { error?: string };
                if (!res.ok) throw new Error(body.error || t('admin.systemMaintenanceMsgRestoreFailed'));
              } else {
                const res = await fetch(apiPath('admin/system-maintenance/restore'), {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fileName: restoreFile, passphrase: restorePassphrase }),
                });
                const body = (await res.json().catch(() => ({}))) as { error?: string };
                if (!res.ok) throw new Error(body.error || t('admin.systemMaintenanceMsgRestoreFailed'));
              }
              setMsg(t('admin.systemMaintenanceMsgRestoreCompleted'));
            } catch (e) {
              setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgRestoreFailed'));
            } finally {
              setBusy(false);
            }
          }}
        >
          {t('admin.systemMaintenanceRestoreData')}
        </button>
      </section>

      {msg ? <div className="text-sm text-cyan-200">{msg}</div> : null}

      <section className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-3">
        <h2 className="text-lg font-semibold mb-2">{t('admin.systemMaintenanceBackupFiles')}</h2>
        <div className="rounded-lg border border-white/10 p-3 bg-black/20 space-y-2">
          <h3 className="text-sm font-semibold text-white/90">{t('admin.systemMaintenanceUploadBackup')}</h3>
          <p className="text-sm text-white/60">{t('admin.systemMaintenanceUploadBackupDesc')}</p>
          <div className="flex flex-wrap items-end gap-2">
            <input
              ref={uploadInputRef}
              type="file"
              accept=".enc,application/octet-stream"
              className="text-sm text-white/80 file:mr-2 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-white"
              disabled={busy || !can('maintenance', 'create')}
            />
            <button
              type="button"
              className="btn-admin-secondary"
              disabled={busy || !can('maintenance', 'create')}
              onClick={async () => {
                const input = uploadInputRef.current;
                const file = input?.files?.[0];
                if (!file) return;
                setBusy(true);
                setMsg('');
                try {
                  const fd = new FormData();
                  fd.append('file', file);
                  const res = await fetch(apiPath('admin/system-maintenance/backups/upload'), {
                    method: 'POST',
                    credentials: 'include',
                    body: fd,
                  });
                  const body = (await res.json().catch(() => ({}))) as { error?: string };
                  if (!res.ok) throw new Error(body.error || t('admin.systemMaintenanceMsgUploadFailed'));
                  setMsg(t('admin.systemMaintenanceMsgUploadOk'));
                  if (input) input.value = '';
                  await load();
                } catch (e) {
                  setMsg(e instanceof Error ? e.message : t('admin.systemMaintenanceMsgUploadFailed'));
                } finally {
                  setBusy(false);
                }
              }}
            >
              {t('admin.systemMaintenanceUploadButton')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white/60">
              <tr>
                <th className="text-left py-2">{t('admin.systemMaintenanceFile')}</th>
                <th className="text-left py-2">{t('admin.systemMaintenanceSize')}</th>
                <th className="text-left py-2">{t('admin.systemMaintenanceModified')}</th>
                <th className="text-left py-2">{t('admin.systemMaintenanceAction')}</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.fileName} className="border-t border-white/10">
                  <td className="py-2">{f.fileName}</td>
                  <td>{Math.round((f.sizeBytes / 1024) * 10) / 10} KB</td>
                  <td>{new Date(f.modifiedAt).toLocaleString()}</td>
                  <td>
                    <a
                      href={apiPath(`admin/system-maintenance/backups/${encodeURIComponent(f.fileName)}`)}
                      className="text-cyan-300 hover:text-cyan-200"
                    >
                      {t('admin.systemMaintenanceDownload')}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
