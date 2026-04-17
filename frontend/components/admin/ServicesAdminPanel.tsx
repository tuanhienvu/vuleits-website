'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useAnimatedOriginModal } from '@/components/admin/useAnimatedOriginModal';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import AdminEmojiPickerField from '@/components/admin/AdminEmojiPickerField';
import { AdminFilterSearchIconButton, adminFilterPanelClass } from '@/components/admin/AdminFilterBarMobile';
import { richTextAsPlain } from '@/lib/richTextAdmin';
import { apiPath } from '@/lib/apiRoutes';

// --- Sections (UI): Header & filters | List & pager | Edit modal | Delete modal ---
// --- Sections (logic): Paged list state | CRUD handlers ---

type ServiceRow = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string | null;
  order: number;
  isActive: boolean;
};

const PAGE_SIZES = [10, 20, 50];

function parseFeatures(v: string | null): string[] {
  if (!v) return [];
  try {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) return parsed.map((x) => String(x));
  } catch {
    // ignore
  }
  return v
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function ServicesAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';

  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null as number | null,
    icon: '🧩',
    title: '',
    description: '',
    featuresText: '',
    order: 0,
    isActive: true,
  });

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const deleteModal = useAnimatedOriginModal(600, () => setDeleteTarget(null));
  const [deleting, setDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const selectAllPageRef = useRef<HTMLInputElement>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const canDelete = can('services', 'delete');

  useEscapeToClose(modal.open && !saving, () => void modal.closeAnimated());
  useEscapeToClose(deleteModal.open && !deleting, () => void deleteModal.closeAnimated());

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath('admin/services'), { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as ServiceRow[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load services');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('services', 'read')) return;
    void refresh();
  }, [can, refresh]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status === 'active' && !r.isActive) return false;
      if (status === 'inactive' && r.isActive) return false;
      if (!qq) return true;
      const descPlain = richTextAsPlain(r.description || '').toLowerCase();
      const hay = `${r.title} ${descPlain} ${parseFeatures(r.features).join(' ')}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [rows, q, status]);

  const total = filtered.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [q, status, pageSize]);

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [page, maxPage]);

  useEffect(() => {
    const el = selectAllPageRef.current;
    if (!el || !canDelete) return;
    const n = paged.length;
    const sel = paged.filter((r) => selectedIds.has(r.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [paged, selectedIds, canDelete]);

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllPage = () => {
    if (paged.length === 0) return;
    if (paged.every((r) => selectedIds.has(r.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const r of paged) next.delete(r.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...paged.map((r) => r.id)]));
    }
  };

  const openCreate = (triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setForm({ id: null, icon: '🧩', title: '', description: '', featuresText: '', order: rows.length, isActive: true });
  };

  const openEdit = (r: ServiceRow, triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setForm({
      id: r.id,
      icon: r.icon,
      title: r.title,
      description: r.description,
      featuresText: parseFeatures(r.features).join('\n'),
      order: r.order,
      isActive: r.isActive,
    });
  };

  const submit = async () => {
    if (!can('services', form.id == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      const payload = {
        icon: form.icon.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        features: form.featuresText
          .split(/\r?\n/)
          .map((x) => x.trim())
          .filter(Boolean),
        order: Number(form.order),
        isActive: form.isActive,
      };
      const isEdit = form.id != null;
      const res = await fetch(isEdit ? apiPath(`admin/services/${form.id}`) : apiPath('admin/services'), {
        method: isEdit ? 'PUT' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Save failed');
      }
      await modal.closeAnimated();
      toast.success(isVi ? 'Đã lưu' : 'Saved');
      await refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (r: ServiceRow, triggerEl?: HTMLElement | null) => {
    deleteModal.openFromElement(triggerEl);
    setDeleteTarget({ id: r.id, title: r.title });
  };

  const remove = async () => {
    if (!deleteTarget || !can('services', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath(`admin/services/${deleteTarget.id}`), {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      await deleteModal.closeAnimated();
      toast.success(isVi ? 'Đã xóa' : 'Deleted');
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const deleteSelectedServices = async () => {
    if (!canDelete || selectedIds.size === 0) return;
    const ids = [...selectedIds];
    const ok = window.confirm(
      isVi ? `Xóa ${ids.length} dịch vụ đã chọn?` : `Delete ${ids.length} selected services?`,
    );
    if (!ok) return;
    setDeleting(true);
    try {
      for (const id of ids) {
        const res = await fetch(apiPath(`admin/services/${id}`), { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${ids.length} dịch vụ` : `Deleted ${ids.length} services`);
      setSelectedIds(new Set());
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!can('services', 'read')) {
    return <div className="text-fg-muted">{isVi ? 'Không có quyền xem dịch vụ.' : 'No permission to read services.'}</div>;
  }

  return (
    <>
      <div className="top-0 z-20 w-full backdrop-blur bg-[#0a0a0a]/60 border-b border-white/10 p-4 rounded-2xl">
        <div className="mb-4 flex min-w-0 flex-row items-center justify-between gap-2">
          <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-fg sm:text-2xl">
            {isVi ? 'Quản lý dịch vụ' : 'Services Management'}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            {can('services', 'create') ? (
              <button type="button" className="btn-admin-primary whitespace-nowrap" onClick={(e) => openCreate(e.currentTarget)}>
                {isVi ? '+ Thêm dịch vụ' : '+ Add Service'}
              </button>
            ) : null}
            <AdminFilterSearchIconButton
              open={mobileFiltersOpen}
              onToggle={() => {
                setMobileFiltersOpen((v) => {
                  const next = !v;
                  if (next) queueMicrotask(() => searchInputRef.current?.focus());
                  return next;
                });
              }}
              labelOpen={isVi ? 'Mở tìm kiếm và bộ lọc' : 'Open search and filters'}
              labelClose={isVi ? 'Đóng tìm kiếm và bộ lọc' : 'Close search and filters'}
            />
          </div>
        </div>
        <div className={`glass w-full p-4 rounded-2xl border border-white/10 bg-white/5 ${adminFilterPanelClass(mobileFiltersOpen)}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label>
              <span className="text-fg-muted text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
              <input
                ref={searchInputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setMobileFiltersOpen(true)}
                placeholder="Title/description/features..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-(--focus-ring)"
              />
            </label>
            <label>
              <span className="text-fg-muted text-sm block mb-2">{isVi ? 'Trạng thái' : 'Status'}</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-fg focus:outline-none focus:ring-2 focus:ring-(--focus-ring)"
              >
                <option value="all">{isVi ? 'Tất cả' : 'All'}</option>
                <option value="active">{isVi ? 'Đang hoạt động' : 'Active'}</option>
                <option value="inactive">{isVi ? 'Ngừng hoạt động' : 'Inactive'}</option>
              </select>
            </label>
            <label>
              <span className="text-fg-muted text-sm block mb-2">{isVi ? 'Kích thước trang' : 'Page size'}</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-fg focus:outline-none focus:ring-2 focus:ring-(--focus-ring)"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* ==================== SERVICE LIST & PAGINATION ==================== */}
      <div className="pt-4">
        {canDelete && selectedIds.size > 0 ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-500/35 bg-red-950/35 px-3 py-2 text-sm text-fg mb-3">
            <span>{isVi ? `Đã chọn ${selectedIds.size}` : `${selectedIds.size} selected`}</span>
            <button
              type="button"
              className="btn-admin-danger text-sm py-1 px-3"
              disabled={deleting}
              onClick={() => void deleteSelectedServices()}
            >
              {isVi ? 'Xóa đã chọn' : 'Delete selected'}
            </button>
            <button type="button" className="btn-admin-secondary text-sm py-1 px-3" onClick={() => setSelectedIds(new Set())}>
              {isVi ? 'Bỏ chọn' : 'Clear'}
            </button>
          </div>
        ) : null}
        {loading ? (
          <div className="text-fg-muted">{isVi ? 'Đang tải...' : 'Loading...'}</div>
        ) : rows.length === 0 ? (
          <div className="glass p-6 rounded-2xl text-fg-muted">{isVi ? 'Chưa có dịch vụ.' : 'No services yet.'}</div>
        ) : total === 0 ? (
          <div className="glass p-6 rounded-2xl text-fg-muted">
            {isVi ? 'Không có kết quả khớp bộ lọc.' : 'No services match your filters.'}
          </div>
        ) : (
          <div className="space-y-3">
            {canDelete && paged.length > 0 ? (
              <label className="hidden md:flex items-center gap-2 text-sm text-fg-muted px-1">
                <input
                  ref={selectAllPageRef}
                  type="checkbox"
                  className="rounded border-white/30"
                  aria-label={isVi ? 'Chọn tất cả trên trang' : 'Select all on page'}
                  onChange={toggleSelectAllPage}
                />
                {isVi ? 'Chọn tất cả trên trang này' : 'Select all on this page'}
              </label>
            ) : null}
            {paged.map((r) => (
              <AdminSwipeRow
                key={r.id}
                className="w-full rounded-xl border border-white/10 bg-white/5"
                canEdit={can('services', 'update')}
                canDelete={canDelete}
                onEdit={() => openEdit(r)}
                onDelete={() => confirmDelete(r)}
                actionsDesktop={
                  <>
                    {can('services', 'update') ? (
                      <button
                        type="button"
                        onClick={(e) => openEdit(r, e.currentTarget)}
                        aria-label={`${isVi ? 'Sửa' : 'Edit'} ${r.title}`}
                        className="btn-admin-icon"
                      >
                        <AdminEditIcon />
                      </button>
                    ) : null}
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={(e) => confirmDelete(r, e.currentTarget)}
                        aria-label={`${isVi ? 'Xóa' : 'Delete'} ${r.title}`}
                        className="btn-admin-icon-danger"
                      >
                        <AdminTrashIcon />
                      </button>
                    ) : null}
                  </>
                }
              >
                <div className="flex items-center gap-3 p-4 min-h-[52px]">
                  {canDelete ? (
                    <label className="hidden md:flex items-center shrink-0" onTouchStart={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelectRow(r.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </label>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold wrap-break-word">{r.title}</p>
                  </div>
                  {canDelete ? (
                    <label className="flex md:hidden items-center shrink-0 px-1" onTouchStart={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelectRow(r.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </label>
                  ) : null}
                </div>
              </AdminSwipeRow>
            ))}
          </div>
        )}

        {!loading && total > 0 ? (
          <div className="w-full flex items-center justify-between mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white/60 text-sm">
              Page <span className="text-white/80 font-medium">{page}</span> of{' '}
              <span className="text-white/80 font-medium">{maxPage}</span> (total{' '}
              <span className="text-white/80 font-medium">{total}</span>)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-admin-pager"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {isVi ? 'Trước' : 'Prev'}
              </button>
              <button
                type="button"
                className="btn-admin-pager"
                disabled={page >= maxPage}
                onClick={() => setPage((p) => p + 1)}
              >
                {isVi ? 'Sau' : 'Next'}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* ==================== EDIT / CREATE SERVICE MODAL ==================== */}
      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative w-full max-w-3xl max-h-[90vh] glass rounded-2xl border border-white/10 overflow-hidden"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white">{form.id ? (isVi ? 'Sửa dịch vụ' : 'Edit Service') : isVi ? 'Thêm dịch vụ' : 'Add Service'}</h3>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-5 py-4 space-y-4 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="block min-w-0">
                  <AdminEmojiPickerField
                    id={`service-icon-${form.id ?? 'new'}`}
                    value={form.icon}
                    onChange={(icon) => setForm((p) => ({ ...p, icon }))}
                    disabled={!can('services', form.id == null ? 'create' : 'update')}
                    labels={
                      isVi
                        ? {
                            field: 'Biểu tượng',
                            choose: 'Chọn biểu tượng',
                            custom: 'Hoặc nhập tay',
                            openPicker: 'Mở bảng chọn biểu tượng',
                          }
                        : {
                            field: 'Icon',
                            choose: 'Pick an icon',
                            custom: 'Or type your own',
                            openPicker: 'Open icon picker',
                          }
                    }
                  />
                </div>
                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">{isVi ? 'Tiêu đề' : 'Title'}</span>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                    placeholder="Service title"
                  />
                </label>
              </div>
              <div className="block w-full min-w-0">
                <span className="text-white/80 text-sm">{isVi ? 'Mô tả (định dạng)' : 'Description (rich text)'}</span>
                <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                  <AdminTinyMceEditor
                    id={`service-description-${form.id ?? 'new'}`}
                    value={form.description}
                    onChange={(html) => setForm((p) => ({ ...p, description: html }))}
                    disabled={!can('services', form.id == null ? 'create' : 'update')}
                  />
                </div>
              </div>
              <label className="block">
                <span className="text-white/80 text-sm">{isVi ? 'Tính năng (mỗi dòng một mục)' : 'Features (one line per item)'}</span>
                <textarea
                  rows={6}
                  value={form.featuresText}
                  onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-white/80 text-sm">{isVi ? 'Thứ tự' : 'Order'}</span>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-white/80 text-sm">{isVi ? 'Trạng thái' : 'Status'}</span>
                  <select
                    value={form.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.value === 'active' }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                  >
                    <option value="active">{isVi ? 'Đang hoạt động' : 'Active'}</option>
                    <option value="inactive">{isVi ? 'Ngừng hoạt động' : 'Inactive'}</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button onClick={() => void modal.closeAnimated()} className="btn-admin-secondary" disabled={saving}>
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button onClick={() => void submit()} className="btn-admin-primary" disabled={saving}>
                {saving ? (isVi ? 'Đang lưu...' : 'Saving...') : isVi ? 'Lưu' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ==================== DELETE SERVICE MODAL ==================== */}
      {deleteModal.open ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void deleteModal.closeAnimated()} />
          <div
            className="relative w-full max-w-md rounded-2xl border border-red-400/30 bg-[#181320] shadow-2xl overflow-hidden"
            style={{
              transformOrigin: `${deleteModal.origin.x}px ${deleteModal.origin.y}px`,
              animation: deleteModal.closing
                ? `modal-zoom-out ${deleteModal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${deleteModal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-red-500/10">
              <h3 className="text-lg font-bold text-white">{isVi ? 'Xác nhận xóa' : 'Confirm delete'}</h3>
              <p className="text-red-200/90 text-sm mt-1">{isVi ? 'Hành động này không thể hoàn tác.' : 'This action cannot be undone.'}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-white/80 text-sm">
                {isVi ? 'Xóa dịch vụ' : 'Delete service'}: <span className="text-white font-medium">{deleteTarget?.title ?? ''}</span>?
              </p>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button
                type="button"
                onClick={() => void deleteModal.closeAnimated()}
                className="btn-admin-secondary"
                disabled={deleting}
              >
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => void remove()}
                className="btn-admin-danger"
                disabled={deleting}
              >
                {deleting ? (isVi ? 'Đang xóa...' : 'Deleting...') : isVi ? 'Xóa' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
