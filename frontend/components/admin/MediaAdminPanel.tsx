'use client';

/**
 * Admin Media Library: upload, grid, delete, and preview (lightbox / Plyr).
 *
 * Preview URLs are normalized via `normalizePublicAssetUrlForBrowser` on load so
 * Docker/internal hostnames resolve to `/uploads/...` and the Next.js rewrite proxies to the API.
 *
 * Extend: swap `MediaPreviewModal` for a different viewer; add audio in `mediaKinds.ts` + modal branch.
 */

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import { getModalOriginFromElement, type ModalOriginPoint } from '@/components/admin/useAnimatedOriginModal';
import { apiPath } from '@/lib/apiRoutes';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';
import {
  FILE_INPUT_ACCEPT,
  isImageMime,
  isLikelyUploadableFile,
  isPdfMime,
  isVideoMime,
} from '@/components/admin/media/mediaKinds';

const MediaPreviewModal = dynamic(() => import('@/components/admin/media/MediaPreviewModal'), {
  ssr: false,
});

// --- Sections (UI): Toolbar (search, upload) | Media grid | Preview modal | Delete confirm ---

type MediaRow = {
  id: number;
  url: string;
  filename: string;
  mimeType: string;
  folder: string;
  createdAt: string;
};

function normalizeMediaRows(list: MediaRow[]): MediaRow[] {
  return list.map((r) => ({ ...r, url: normalizePublicAssetUrlForBrowser(r.url) }));
}

export default function MediaAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale, t } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaRow | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [q, setQ] = useState('');
  const [folder, setFolder] = useState('library');
  const [folderOptions, setFolderOptions] = useState<string[]>(['library']);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaRow | null>(null);
  const [brokenThumbs, setBrokenThumbs] = useState<Set<number>>(() => new Set());
  const selectAllVisibleRef = useRef<HTMLInputElement>(null);

  const canDelete = can('media', 'delete');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiPath('admin/media')}?take=200&imagesOnly=0`, { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as MediaRow[];
      setRows(normalizeMediaRows(Array.isArray(data) ? data : []));
      setBrokenThumbs(new Set());
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('media', 'read')) return;
    void refresh();
  }, [can, refresh]);

  useEffect(() => {
    if (!can('media', 'read')) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiPath('admin/categories/medias')}?locale=${encodeURIComponent(locale)}`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = (await res.json()) as Array<{ slug?: unknown; name?: unknown; isActive?: unknown }>;
        if (cancelled || !Array.isArray(data)) return;
        const slugs = data
          .filter((x) => x?.isActive !== false)
          .map((x) => (typeof x.slug === 'string' ? x.slug.trim() : ''))
          .filter(Boolean);
        const next = Array.from(new Set(['library', ...slugs]));
        setFolderOptions(next);
        setFolder((prev) => (next.includes(prev) ? prev : next[0]));
      } catch {
        // ignore category list errors and keep defaults
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [can, isVi, locale]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return rows;
    return rows.filter((r) => `${r.filename} ${r.folder} ${r.mimeType}`.toLowerCase().includes(qq));
  }, [rows, q]);

  useEffect(() => {
    const el = selectAllVisibleRef.current;
    if (!el || !canDelete) return;
    const n = filtered.length;
    const sel = filtered.filter((r) => selectedIds.has(r.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [filtered, selectedIds, canDelete]);

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllVisible = () => {
    if (filtered.length === 0) return;
    if (filtered.every((r) => selectedIds.has(r.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const r of filtered) next.delete(r.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...filtered.map((r) => r.id)]));
    }
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!can('media', 'create')) return;
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isLikelyUploadableFile(file)) {
      toast.error(t('admin.mediaUnsupportedUpload'));
      e.target.value = '';
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch(apiPath('admin/media'), { method: 'POST', credentials: 'include', body: fd });
      const j = (await res.json().catch(() => ({}))) as { error?: string; media?: MediaRow };
      if (!res.ok) {
        throw new Error(j.error || 'Upload failed');
      }
      toast.success(isVi ? 'Đã tải lên' : 'Uploaded');
      if (j.media) {
        const normalized = normalizeMediaRows([j.media])[0];
        if (normalized) {
          setRows((prev) => {
            const rest = prev.filter((r) => r.id !== normalized.id);
            return [normalized, ...rest];
          });
        }
      } else {
        await refresh();
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const remove = async (id: number) => {
    if (!can('media', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath(`admin/media/${id}`), { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success(isVi ? 'Đã xóa' : 'Deleted');
      setDeleteTarget(null);
      setPreviewItem((p) => (p?.id === id ? null : p));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const removeMany = async (ids: number[]) => {
    if (!canDelete) return;
    setDeleting(true);
    try {
      for (const id of ids) {
        const res = await fetch(apiPath(`admin/media/${id}`), { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${ids.length} tệp` : `Deleted ${ids.length} files`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
      setPreviewItem(null);
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!can('media', 'read')) {
    return <div className="text-white/70">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-3">
      {/* ==================== TOOLBAR: SEARCH & UPLOAD ==================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">{isVi ? 'Thư viện media' : 'Media Library'}</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isVi ? 'Tìm kiếm…' : 'Search…'}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm min-w-[200px]"
          />
          {can('media', 'create') ? (
            <>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
              >
                {folderOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label className="btn-admin-primary cursor-pointer">
                {uploading ? (isVi ? 'Đang tải lên…' : 'Uploading…') : isVi ? 'Tải lên' : 'Upload'}
                <input
                  type="file"
                  className="hidden"
                  accept={FILE_INPUT_ACCEPT}
                  onChange={(e) => void upload(e)}
                  disabled={uploading}
                />
              </label>
            </>
          ) : null}
        </div>
      </div>
      {loading ? <p className="text-white/70">{isVi ? 'Đang tải…' : 'Loading…'}</p> : null}
      {canDelete && selectedIds.size > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-500/35 bg-red-950/35 px-3 py-2 text-sm text-white">
          <span>{isVi ? `Đã chọn ${selectedIds.size}` : `${selectedIds.size} selected`}</span>
          <button type="button" className="btn-admin-danger text-sm py-1 px-3" onClick={() => setBulkDeleteOpen(true)}>
            {isVi ? 'Xóa đã chọn' : 'Delete selected'}
          </button>
          <button type="button" className="btn-admin-secondary text-sm py-1 px-3" onClick={() => setSelectedIds(new Set())}>
            {isVi ? 'Bỏ chọn' : 'Clear'}
          </button>
        </div>
      ) : null}
      {canDelete && filtered.length > 0 ? (
        <label className="hidden md:flex items-center gap-2 text-sm text-white/70">
          <input
            ref={selectAllVisibleRef}
            type="checkbox"
            className="rounded border-white/30"
            aria-label={isVi ? 'Chọn tất cả đang hiển thị' : 'Select all visible'}
            onChange={toggleSelectAllVisible}
          />
          {isVi ? 'Chọn tất cả đang hiển thị' : 'Select all visible'}
        </label>
      ) : null}
      {/* ==================== MEDIA GRID ==================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((m) => {
          const displayUrl = m.url;
          return (
            <div key={m.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col relative min-h-0">
              {canDelete ? (
                <label
                  className="absolute left-2 top-2 z-30 hidden md:flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-black/55 ring-1 ring-white/20"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="rounded border-white/40"
                    checked={selectedIds.has(m.id)}
                    onChange={() => toggleSelectRow(m.id)}
                    aria-label={isVi ? 'Chọn' : 'Select'}
                  />
                </label>
              ) : null}
              {canDelete ? (
                <button
                  type="button"
                  className="absolute right-2 top-2 z-30 hidden md:flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-black/55 ring-1 ring-white/20 text-red-300 hover:bg-black/70 hover:text-red-200"
                  aria-label={isVi ? 'Xóa' : 'Delete'}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    setDeleteDialogOrigin(getModalOriginFromElement(e.currentTarget));
                    setDeleteTarget(m);
                  }}
                >
                  <AdminTrashIcon />
                </button>
              ) : null}
              <AdminSwipeRow
                className="flex min-h-0 flex-1 flex-col"
                canDelete={canDelete}
                onDelete={() => {
                  setDeleteDialogOrigin(null);
                  setDeleteTarget(m);
                }}
              >
                <div className="relative flex min-h-0 flex-1 flex-col">
                  {canDelete ? (
                    <label
                      className="absolute left-2 top-2 z-20 flex h-7 w-7 md:hidden cursor-pointer items-center justify-center rounded-md bg-black/55 ring-1 ring-white/20"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="rounded border-white/40"
                        checked={selectedIds.has(m.id)}
                        onChange={() => toggleSelectRow(m.id)}
                        aria-label={isVi ? 'Chọn' : 'Select'}
                      />
                    </label>
                  ) : null}
                  <div className="relative aspect-square bg-black/30">
                    <button
                      type="button"
                      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-left outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                      aria-label={`${t('admin.mediaOpenPreview')}: ${m.filename}`}
                      onClick={() => setPreviewItem(m)}
                    >
                      <span className="sr-only">
                        {t('admin.mediaOpenPreview')}: {m.filename}
                      </span>
                    </button>
                    <div className="pointer-events-none absolute inset-0 z-0">
                      {isImageMime(m.mimeType) && !brokenThumbs.has(m.id) ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={displayUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={() =>
                            setBrokenThumbs((prev) => {
                              const next = new Set(prev);
                              next.add(m.id);
                              return next;
                            })
                          }
                        />
                      ) : null}
                      {isImageMime(m.mimeType) && brokenThumbs.has(m.id) ? (
                        <div className="flex h-full w-full items-center justify-center bg-black/40 px-2 text-center text-[10px] text-amber-200/90">
                          {isVi ? 'Lỗi ảnh' : 'Image error'}
                        </div>
                      ) : null}
                      {isVideoMime(m.mimeType) ? (
                        <div className="relative h-full w-full">
                          <video
                            src={displayUrl}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            aria-hidden
                          />
                          <span
                            className="absolute bottom-2 right-2 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-medium text-white"
                            aria-hidden
                          >
                            ▶
                          </span>
                        </div>
                      ) : null}
                      {isPdfMime(m.mimeType) ? (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-zinc-900/90 p-2 text-center">
                          <span className="text-2xl" aria-hidden>
                            PDF
                          </span>
                          <span className="text-[10px] text-white/60">PDF</span>
                        </div>
                      ) : null}
                      {!isImageMime(m.mimeType) && !isVideoMime(m.mimeType) && !isPdfMime(m.mimeType) ? (
                        <div className="flex h-full w-full items-center justify-center p-2 text-center text-[10px] text-white/50">
                          {m.mimeType}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-2 text-xs text-white/70 flex-1 break-all">{m.filename}</div>
                </div>
              </AdminSwipeRow>
            </div>
          );
        })}
      </div>
      {!loading && filtered.length === 0 ? <p className="text-white/60">{isVi ? 'Không có tệp media.' : 'No media files.'}</p> : null}

      {previewItem ? (
        <MediaPreviewModal
          item={{
            id: previewItem.id,
            url: previewItem.url,
            filename: previewItem.filename,
            mimeType: previewItem.mimeType,
          }}
          onClose={() => setPreviewItem(null)}
          t={t}
        />
      ) : null}

      {/* ==================== DELETE MEDIA CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa tệp media' : 'Delete media file'}
        message={deleteTarget ? (isVi ? `Xóa “${deleteTarget.filename}”?` : `Delete “${deleteTarget.filename}”?`) : ''}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => (deleteTarget ? void remove(deleteTarget.id) : undefined)}
      />
      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều tệp' : 'Delete multiple files'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} tệp đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected files? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeMany(Array.from(selectedIds))}
      />
    </div>
  );
}
