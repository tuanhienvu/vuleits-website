'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import {
  allUiMessageKeys,
  defaultMessagesByLocale,
  type Locale,
} from '@/lib/locale/defaultMessages';
import {
  buildSaveEntries,
  draftToAoA,
  mergeDraftWithPatch,
  parseTranslationSheet,
  type UiMessagesDraft,
} from '@/lib/locale/uiMessagesExcel';
import { apiPath } from '@/lib/apiRoutes';

const SAVE_CHUNK = 100;

async function putEntriesChunked(
  entries: { locale: Locale; key: string; value: string }[],
  chunkSize: number,
): Promise<void> {
  for (let i = 0; i < entries.length; i += chunkSize) {
    const chunk = entries.slice(i, i + chunkSize);
    const res = await fetch(apiPath('admin/ui-messages'), {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: chunk }),
    });
    if (!res.ok) throw new Error('save');
  }
}

function textareaRowsForKey(key: string): number {
  if (key.includes('heroIntro') || key.includes('Body') || key.includes('Hint') || key.includes('Subtitle')) return 4;
  return 2;
}

function keySection(key: string): string {
  const i = key.indexOf('.');
  return i === -1 ? key : key.slice(0, i);
}

function isKeyCustomized(draft: UiMessagesDraft, key: string): boolean {
  for (const loc of ['en-US', 'vi-VN'] as Locale[]) {
    const cur = (draft[key]?.[loc] ?? '').trim();
    const def = (defaultMessagesByLocale[loc][key] ?? '').trim();
    if (cur !== def) return true;
  }
  return false;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// --- Editor + table/card views | Excel export/import (backup & restore) | Filters & pagination ---

export default function TranslationsAdminPanel() {
  const { t, refreshUiMessages } = useLocale();
  const toast = useToast();
  const { can } = useAdminPermissions();
  const canSave = can('uiTexts', 'update');

  const [q, setQ] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'custom' | 'default'>('all');
  const [pageSize, setPageSize] = useState<number | 'all'>(25);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<UiMessagesDraft>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const importTargetRef = useRef<'editor' | 'server' | null>(null);

  const validKeySet = useMemo(() => new Set(allUiMessageKeys), []);

  const sectionOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const k of allUiMessageKeys) {
      const s = keySection(k);
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    const sections = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b));
    return { counts, sections };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath('admin/ui-messages'), { credentials: 'include' });
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('load');
      const data = (await res.json()) as Record<string, Record<string, string>>;
      const next: UiMessagesDraft = {};
      for (const key of allUiMessageKeys) {
        next[key] = {
          'en-US': data['en-US']?.[key] ?? defaultMessagesByLocale['en-US'][key] ?? '',
          'vi-VN': data['vi-VN']?.[key] ?? defaultMessagesByLocale['vi-VN'][key] ?? '',
        };
      }
      setDraft(next);
    } catch {
      toast.error(t('admin.uiMessagesLoadError'));
    } finally {
      setLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredKeys = useMemo(() => {
    let keys = allUiMessageKeys;

    if (sectionFilter) {
      keys = keys.filter((k) => keySection(k) === sectionFilter);
    }

    if (statusFilter === 'custom') {
      keys = keys.filter((k) => isKeyCustomized(draft, k));
    } else if (statusFilter === 'default') {
      keys = keys.filter((k) => !isKeyCustomized(draft, k));
    }

    const qq = q.trim().toLowerCase();
    if (qq) {
      keys = keys.filter((k) => {
        const row = draft[k];
        const en = (row?.['en-US'] ?? '').toLowerCase();
        const vi = (row?.['vi-VN'] ?? '').toLowerCase();
        return k.toLowerCase().includes(qq) || en.includes(qq) || vi.includes(qq);
      });
    }

    return keys;
  }, [q, draft, sectionFilter, statusFilter]);

  const pageCount = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(filteredKeys.length / pageSize));

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount));
  }, [pageCount]);

  useEffect(() => {
    setPage(1);
  }, [q, sectionFilter, statusFilter, pageSize]);

  const { displayedKeys, rangeFrom, rangeTo } = useMemo(() => {
    const total = filteredKeys.length;
    if (total === 0) {
      return { displayedKeys: [] as string[], rangeFrom: 0, rangeTo: 0 };
    }
    if (pageSize === 'all') {
      return { displayedKeys: filteredKeys, rangeFrom: 1, rangeTo: total };
    }
    const start = (page - 1) * pageSize;
    const slice = filteredKeys.slice(start, start + pageSize);
    return {
      displayedKeys: slice,
      rangeFrom: start + 1,
      rangeTo: start + slice.length,
    };
  }, [filteredKeys, page, pageSize]);

  const hasActiveFilters = Boolean(
    q.trim() || sectionFilter || statusFilter !== 'all' || pageSize !== 25,
  );

  const setCell = (key: string, locale: Locale, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [key]: { ...prev[key], [locale]: value },
    }));
  };

  const save = async () => {
    if (!canSave) {
      toast.error(t('admin.uiMessagesNeedUpdate'));
      return;
    }
    setSaving(true);
    try {
      const entries = buildSaveEntries(draft, allUiMessageKeys);
      await putEntriesChunked(entries, SAVE_CHUNK);
      toast.success(t('admin.uiMessagesSaveDone'));
      await refreshUiMessages();
      await load();
    } catch {
      toast.error(t('admin.uiMessagesSaveError'));
    } finally {
      setSaving(false);
    }
  };

  const exportExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      const aoa = draftToAoA(draft, allUiMessageKeys);
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'UI_Translations');
      const when = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(wb, `ui-translations-backup-${when}.xlsx`);
      toast.success(t('admin.uiMessagesExportDone'));
    } catch {
      toast.error(t('admin.uiMessagesSaveError'));
    }
  };

  const runImportFromFile = async (file: File, target: 'editor' | 'server') => {
    try {
      const XLSX = await import('xlsx');
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const name = wb.SheetNames[0];
      if (!name) {
        toast.error(t('admin.uiMessagesImportBadLayout'));
        return;
      }
      const sheet = wb.Sheets[name];
      if (!sheet) {
        toast.error(t('admin.uiMessagesImportBadLayout'));
        return;
      }
      const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' }) as unknown[][];
      const { patch, unknownKeys, appliedRows } = parseTranslationSheet(aoa, validKeySet);

      if (appliedRows === 0) {
        if (unknownKeys.length > 0) {
          toast.error(t('admin.uiMessagesImportNoRows'));
          toast.info(t('admin.uiMessagesImportSkippedUnknown', { count: String(unknownKeys.length) }));
        } else {
          toast.error(t('admin.uiMessagesImportBadLayout'));
        }
        return;
      }

      const merged = mergeDraftWithPatch(draft, patch);
      setDraft(merged);

      if (unknownKeys.length > 0) {
        toast.info(t('admin.uiMessagesImportSkippedUnknown', { count: String(unknownKeys.length) }));
      }

      if (target === 'editor') {
        toast.success(t('admin.uiMessagesImportEditorDone'));
        return;
      }

      if (!canSave) {
        toast.error(t('admin.uiMessagesNeedUpdate'));
        return;
      }

      setSaving(true);
      try {
        const entries = buildSaveEntries(merged, allUiMessageKeys);
        await putEntriesChunked(entries, SAVE_CHUNK);
        toast.success(t('admin.uiMessagesImportServerDone'));
        await refreshUiMessages();
        await load();
      } catch {
        toast.error(t('admin.uiMessagesSaveError'));
      } finally {
        setSaving(false);
      }
    } catch {
      toast.error(t('admin.uiMessagesImportBadLayout'));
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const target = importTargetRef.current;
    importTargetRef.current = null;
    if (!file || !target) return;
    void runImportFromFile(file, target);
  };

  const pickImport = (target: 'editor' | 'server') => {
    if (target === 'server' && !canSave) {
      toast.error(t('admin.uiMessagesNeedUpdate'));
      return;
    }
    importTargetRef.current = target;
    fileRef.current?.click();
  };

  if (loading && Object.keys(draft).length === 0) {
    return (
      <div className="glass p-8 rounded-2xl text-white/70" role="status">
        {t('admin.profileLoading')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <input
        ref={fileRef}
        type="file"
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        className="hidden"
        aria-hidden
        onChange={onFileChange}
      />

      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">{t('admin.uiMessages')}</h2>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 xl:col-span-8">
          <div className="inline-flex rounded-lg border border-white/15 overflow-hidden">
            <button
              type="button"
              className={`px-3 py-1.5 text-xs sm:text-sm w-full ${view === 'table' ? 'bg-cyan-500/25 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
              onClick={() => setView('table')}
            >
              {t('admin.uiMessagesViewTable')}
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-xs sm:text-sm w-full ${view === 'cards' ? 'bg-cyan-500/25 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
              onClick={() => setView('cards')}
            >
              {t('admin.uiMessagesViewCards')}
            </button>
          </div>
          <button type="button" className="btn-admin-secondary text-sm py-2 px-3 w-full" onClick={() => void exportExcel()}>
            {t('admin.uiMessagesExportExcel')}
          </button>
          <button type="button" className="btn-admin-secondary text-sm py-2 px-3 w-full" onClick={() => pickImport('editor')}>
            {t('admin.uiMessagesImportLoad')}
          </button>
          <button
            type="button"
            className="btn-admin-primary text-sm py-2 px-3 w-full disabled:opacity-50 bg-(--brand-accent) border-(--brand-accent) hover:bg-[color-mix(in_srgb,var(--brand-accent)_88%,#ffffff)]"
            disabled={!canSave}
            onClick={() => pickImport('server')}
          >
            {t('admin.uiMessagesImportSave')}
          </button>
          {canSave ? (
            <button
              type="button"
              className="btn-admin-primary text-sm py-2 px-3 w-full disabled:opacity-50 bg-(--brand-accent) border-(--brand-accent) hover:bg-[color-mix(in_srgb,var(--brand-accent)_88%,#ffffff)]"
              onClick={() => void save()}
              disabled={saving}
            >
              {saving ? t('admin.saving') : t('admin.uiMessagesSave')}
            </button>
          ) : null}
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-3 sm:p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-3 items-end">
          <label className="flex flex-col gap-1 text-sm text-white/80 xl:col-span-5">
            <span className="text-xs text-white/55">{t('admin.uiMessagesSearch')}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('admin.uiMessagesSearch')}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm w-full"
              aria-label="Search"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-white/80 xl:col-span-3">
            <span className="flex items-end justify-between gap-2 text-xs text-white/55 min-h-5">
              <span>{t('admin.uiMessagesFilterSection')}</span>
              {hasActiveFilters ? (
                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 underline underline-offset-2"
                  onClick={() => {
                    setQ('');
                    setSectionFilter('');
                    setStatusFilter('all');
                    setPageSize(25);
                    setPage(1);
                  }}
                >
                  {t('admin.uiMessagesClearFilters')}
                </button>
              ) : null}
            </span>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm"
            >
              <option value="">
                {t('admin.uiMessagesFilterSectionAll')} ({allUiMessageKeys.length})
              </option>
              {sectionOptions.sections.map((s) => (
                <option key={s} value={s}>
                  {s} ({sectionOptions.counts.get(s) ?? 0})
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-white/80 xl:col-span-2">
            <span className="text-xs text-white/55">{t('admin.uiMessagesFilterStatus')}</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'custom' | 'default')}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm"
            >
              <option value="all">{t('admin.uiMessagesFilterStatusAll')}</option>
              <option value="custom">{t('admin.uiMessagesFilterStatusCustom')}</option>
              <option value="default">{t('admin.uiMessagesFilterStatusDefault')}</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-white/80 xl:col-span-2">
            <span className="text-xs text-white/55">{t('admin.uiMessagesRowsPerPage')}</span>
            <select
              value={pageSize === 'all' ? 'all' : String(pageSize)}
              onChange={(e) => {
                const v = e.target.value;
                setPageSize(v === 'all' ? 'all' : Number(v));
              }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
              <option value="all">{t('admin.uiMessagesRowsAll')}</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/50 text-xs">
          <p>
            {t('admin.uiMessagesShowing', {
              from: String(rangeFrom),
              to: String(rangeTo),
              total: String(filteredKeys.length),
            })}{' '}
            <span className="text-white/35">· {filteredKeys.length} / {allUiMessageKeys.length}</span>
          </p>
          {pageSize !== 'all' && pageCount > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-admin-secondary text-xs py-1.5 px-2.5 disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {t('admin.uiMessagesPrev')}
              </button>
              <span className="text-white/60 tabular-nums">
                {page} / {pageCount}
              </span>
              <button
                type="button"
                className="btn-admin-secondary text-xs py-1.5 px-2.5 disabled:opacity-40"
                disabled={page >= pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                {t('admin.uiMessagesNext')}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {displayedKeys.length === 0 ? (
        <div className="glass rounded-xl border border-white/10 p-8 text-center text-white/65 text-sm">{t('admin.uiMessagesNoMatches')}</div>
      ) : view === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-white/10 max-h-[min(70vh,780px)] overflow-y-auto">
          <table className="w-full text-left text-xs sm:text-sm text-white/90 min-w-[720px]">
            <thead className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-white/10">
              <tr className="text-white/60">
                <th className="px-2 py-2 w-[22%] sticky left-0 bg-slate-900/95 z-20 border-r border-white/10">key</th>
                <th className="px-2 py-2">en-US</th>
                <th className="px-2 py-2">vi-VN</th>
              </tr>
            </thead>
            <tbody>
              {displayedKeys.map((key) => (
                <tr key={key} className="border-t border-white/10 align-top hover:bg-white/3">
                  <td className="px-2 py-2 font-mono text-[10px] sm:text-xs text-emerald-200/90 break-all sticky left-0 bg-black/50 border-r border-white/10">
                    {key}
                  </td>
                  <td className="px-2 py-2">
                    <textarea
                      value={draft[key]?.['en-US'] ?? ''}
                      onChange={(e) => setCell(key, 'en-US', e.target.value)}
                      disabled={!canSave}
                      rows={textareaRowsForKey(key)}
                      className="w-full min-w-[200px] px-2 py-1.5 rounded-lg bg-black/30 border border-white/15 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <textarea
                      value={draft[key]?.['vi-VN'] ?? ''}
                      onChange={(e) => setCell(key, 'vi-VN', e.target.value)}
                      disabled={!canSave}
                      rows={textareaRowsForKey(key)}
                      className="w-full min-w-[200px] px-2 py-1.5 rounded-lg bg-black/30 border border-white/15 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4 max-h-[min(70vh,720px)] overflow-y-auto pr-1">
          {displayedKeys.map((key) => (
            <div key={key} className="glass rounded-xl border border-white/10 p-4 space-y-2">
              <div className="font-mono text-xs text-emerald-200/90 break-all">{key}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="text-xs text-white/50">en-US</span>
                  <textarea
                    value={draft[key]?.['en-US'] ?? ''}
                    onChange={(e) => setCell(key, 'en-US', e.target.value)}
                    disabled={!canSave}
                    rows={textareaRowsForKey(key)}
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-white text-sm min-h-10 disabled:opacity-60"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs text-white/50">vi-VN</span>
                  <textarea
                    value={draft[key]?.['vi-VN'] ?? ''}
                    onChange={(e) => setCell(key, 'vi-VN', e.target.value)}
                    disabled={!canSave}
                    rows={textareaRowsForKey(key)}
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-white text-sm min-h-10 disabled:opacity-60"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
