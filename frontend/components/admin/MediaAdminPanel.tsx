'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import { getModalOriginFromElement, type ModalOriginPoint } from '@/components/admin/useAnimatedOriginModal';

// --- Sections (UI): Toolbar (search, upload) | Media grid | Delete confirm ---

type MediaRow = {
  id: number;
  url: string;
  filename: string;
  mimeType: string;
  folder: string;
  createdAt: string;
};

export default function MediaAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
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
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllVisibleRef = useRef<HTMLInputElement>(null);

  const canDelete = can('media', 'delete');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media?take=200&imagesOnly=0', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as MediaRow[];
      setRows(Array.isArray(data) ? data : []);
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
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/admin/media', { method: 'POST', credentials: 'include', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      toast.success(isVi ? 'Đã tải lên' : 'Uploaded');
      await refresh();
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
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success(isVi ? 'Đã xóa' : 'Deleted');
      setDeleteTarget(null);
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
        const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${ids.length} tệp` : `Deleted ${ids.length} files`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
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
              <input
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm w-32"
                placeholder={isVi ? 'thư mục' : 'folder'}
              />
              <label className="btn-admin-primary cursor-pointer">
                {uploading ? (isVi ? 'Đang tải lên…' : 'Uploading…') : isVi ? 'Tải lên' : 'Upload'}
                <input type="file" className="hidden" onChange={(e) => void upload(e)} disabled={uploading} />
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
        {filtered.map((m) => (
          <div key={m.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col relative min-h-0">
            {canDelete ? (
              <label
                className="absolute left-2 top-2 z-30 hidden md:flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-black/55 ring-1 ring-white/20"
                onTouchStart={(e) => e.stopPropagation()}
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
                className="absolute right-2 top-2 z-30 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-black/55 ring-1 ring-white/20 text-red-300 hover:bg-black/70 hover:text-red-200"
                aria-label={isVi ? 'Xóa' : 'Delete'}
                onTouchStart={(e) => e.stopPropagation()}
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
                    onTouchStart={(e) => e.stopPropagation()}
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
                <div className="aspect-square bg-black/30 relative">
                  {m.mimeType.startsWith('image/') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-xs p-2 text-center">{m.mimeType}</div>
                  )}
                </div>
                <div className="p-2 text-xs text-white/70 flex-1 break-all">{m.filename}</div>
              </div>
            </AdminSwipeRow>
          </div>
        ))}
      </div>
      {!loading && filtered.length === 0 ? <p className="text-white/60">{isVi ? 'Không có tệp media.' : 'No media files.'}</p> : null}

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
