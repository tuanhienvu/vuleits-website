'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import { apiPath } from '@/lib/apiRoutes';
import { normalizeRoleName } from '@/lib/adminRoleRank';

type LogRow = {
  id: number;
  level: string;
  category: string;
  message: string;
  metadata: unknown;
  traceId: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

type MeResponse = {
  id: number;
  email: string;
  roleId: number;
  role: { name: string } | null;
};

function formatMetadata(meta: unknown): string {
  if (meta == null) return '—';
  try {
    const s = JSON.stringify(meta);
    return s.length > 400 ? `${s.slice(0, 400)}…` : s;
  } catch {
    return '—';
  }
}

export default function AuditLogsAdminPanel() {
  const { t } = useLocale();
  const { can } = useAdminPermissions();
  const toast = useToast();

  const [me, setMe] = useState<MeResponse | null>(null);
  const [items, setItems] = useState<LogRow[]>([]);
  const [nextBeforeId, setNextBeforeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [level, setLevel] = useState('');
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LogRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const isSysadmin = useMemo(
    () => normalizeRoleName(me?.role?.name) === 'SYSADMIN',
    [me?.role?.name],
  );

  const canEditNote = isSysadmin && can('auditLogs', 'update');
  const canDeleteEntry = isSysadmin && can('auditLogs', 'delete');

  useEffect(() => {
    let cancelled = false;
    const loadMe = async () => {
      try {
        const res = await fetch(apiPath('admin/me'), { credentials: 'include' });
        if (!res.ok) return;
        const j = (await res.json()) as MeResponse;
        if (!cancelled) setMe(j);
      } catch {
        /* ignore */
      }
    };
    void loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchPage = useCallback(
    async (beforeId: number | null, append: boolean) => {
      const params = new URLSearchParams();
      params.set('take', '50');
      if (beforeId != null) params.set('beforeId', String(beforeId));
      if (level.trim()) params.set('level', level.trim());

      const res = await fetch(`${apiPath('admin/logs')}?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('load failed');
      }
      const data = (await res.json()) as { items?: LogRow[]; nextBeforeId?: number | null };
      const batch = Array.isArray(data.items) ? data.items : [];
      setNextBeforeId(typeof data.nextBeforeId === 'number' ? data.nextBeforeId : null);
      setItems((prev) => {
        const base = append ? prev : [];
        const seen = new Set(base.map((r) => r.id));
        const merged = [...base];
        for (const row of batch) {
          if (seen.has(row.id)) continue;
          seen.add(row.id);
          merged.push(row);
        }
        return merged;
      });
      setNoteDrafts((prev) => {
        const next = append ? { ...prev } : {};
        for (const row of batch) {
          if (next[row.id] === undefined) next[row.id] = row.note ?? '';
        }
        return next;
      });
    },
    [level],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await fetchPage(null, false);
    } catch {
      toast.error(t('admin.logsLoadError'));
    } finally {
      setLoading(false);
    }
  }, [fetchPage, toast, t]);

  useEffect(() => {
    if (!can('auditLogs', 'read')) return;
    void refresh();
  }, [can, refresh]);

  const loadMore = async () => {
    if (nextBeforeId == null || loadingMore) return;
    setLoadingMore(true);
    try {
      await fetchPage(nextBeforeId, true);
    } catch {
      toast.error(t('admin.logsLoadError'));
    } finally {
      setLoadingMore(false);
    }
  };

  const saveNote = async (row: LogRow) => {
    if (!canEditNote) return;
    const note = noteDrafts[row.id] ?? '';
    setSavingId(row.id);
    try {
      const res = await fetch(apiPath(`admin/logs/${row.id}`), {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(err.error || t('admin.logsSaveError'));
        return;
      }
      const j = (await res.json()) as { item?: LogRow };
      if (j.item) {
        setItems((prev) => prev.map((r) => (r.id === row.id ? j.item! : r)));
        setNoteDrafts((d) => ({ ...d, [row.id]: j.item!.note ?? '' }));
      }
      toast.success(t('admin.logsNoteSaved'));
    } catch {
      toast.error(t('admin.logsSaveError'));
    } finally {
      setSavingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !canDeleteEntry) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath(`admin/logs/${deleteTarget.id}`), {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(err.error || t('admin.logsDeleteError'));
        return;
      }
      setItems((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success(t('admin.logsDeleted'));
    } catch {
      toast.error(t('admin.logsDeleteError'));
    } finally {
      setDeleting(false);
    }
  };

  if (!can('auditLogs', 'read')) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-4 w-full max-w-[min(100%,1200px)]">
      <p className="text-white/65 text-sm">{t('admin.logsPageHint')}</p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-white/80">
          <span>{t('admin.logsFilterLevel')}</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-white"
          >
            <option value="">{t('admin.logsFilterAll')}</option>
            <option value="info">info</option>
            <option value="warn">warn</option>
            <option value="error">error</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="text-sm px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-white/15 disabled:opacity-50"
        >
          {loading ? t('admin.logsLoading') : t('admin.logsRefresh')}
        </button>
      </div>

      {!isSysadmin ? (
        <p className="text-amber-200/90 text-sm">{t('admin.logsOnlySysadmin')}</p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-xs sm:text-sm text-left text-white/90 min-w-[720px]">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-2 py-2 whitespace-nowrap">{t('admin.logsColTime')}</th>
              <th className="px-2 py-2">{t('admin.logsColLevel')}</th>
              <th className="px-2 py-2">{t('admin.logsColCategory')}</th>
              <th className="px-2 py-2 min-w-[140px]">{t('admin.logsColMessage')}</th>
              <th className="px-2 py-2 min-w-[180px]">{t('admin.logsColDetails')}</th>
              <th className="px-2 py-2 min-w-[200px]">{t('admin.logsNote')}</th>
              {canDeleteEntry ? <th className="px-2 py-2 w-24">{t('admin.logsDelete')}</th> : null}
            </tr>
          </thead>
          <tbody>
            {loading && items.length === 0 ? (
              <tr>
                <td colSpan={canDeleteEntry ? 7 : 6} className="px-2 py-6 text-center text-white/60">
                  {t('admin.logsLoading')}
                </td>
              </tr>
            ) : null}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={canDeleteEntry ? 7 : 6} className="px-2 py-6 text-center text-white/60">
                  {t('admin.logsEmpty')}
                </td>
              </tr>
            ) : null}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-white/10 align-top">
                <td className="px-2 py-2 whitespace-nowrap text-white/75">
                  {new Date(row.createdAt).toLocaleString()}
                </td>
                <td className="px-2 py-2 font-mono text-cyan-200/90">{row.level}</td>
                <td className="px-2 py-2">{row.category}</td>
                <td className="px-2 py-2 wrap-break-word">{row.message}</td>
                <td className="px-2 py-2 font-mono text-[11px] sm:text-xs text-white/65 break-all max-w-md">
                  {formatMetadata(row.metadata)}
                  {row.traceId ? (
                    <span className="block mt-1 text-white/45">trace: {row.traceId}</span>
                  ) : null}
                </td>
                <td className="px-2 py-2">
                  {canEditNote ? (
                    <div className="flex flex-col gap-1">
                      <textarea
                        value={noteDrafts[row.id] ?? ''}
                        onChange={(e) => setNoteDrafts((d) => ({ ...d, [row.id]: e.target.value }))}
                        rows={2}
                        className="w-full rounded-lg bg-black/30 border border-white/15 px-2 py-1 text-white text-xs"
                        placeholder={t('admin.logsNotePlaceholder')}
                      />
                      <button
                        type="button"
                        disabled={savingId === row.id}
                        onClick={() => void saveNote(row)}
                        className="self-start text-xs px-2 py-1 rounded-md bg-cyan-600/80 hover:bg-cyan-600 text-white disabled:opacity-50"
                      >
                        {savingId === row.id ? t('admin.logsSaving') : t('admin.logsSaveNote')}
                      </button>
                    </div>
                  ) : (
                    <span className="text-white/70 whitespace-pre-wrap">{row.note || '—'}</span>
                  )}
                </td>
                {canDeleteEntry ? (
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(row)}
                      className="text-xs px-2 py-1 rounded-md bg-red-900/50 hover:bg-red-800/60 text-red-100"
                    >
                      {t('admin.logsDelete')}
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {nextBeforeId != null ? (
        <button
          type="button"
          disabled={loadingMore}
          onClick={() => void loadMore()}
          className="text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 disabled:opacity-50"
        >
          {loadingMore ? t('admin.logsLoading') : t('admin.logsLoadMore')}
        </button>
      ) : null}

      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={null}
        title={t('admin.logsDelete')}
        message={t('admin.logsDeleteConfirm')}
        confirmText={t('admin.logsDelete')}
        confirming={deleting}
        onCancel={() => (!deleting ? setDeleteTarget(null) : undefined)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
}
