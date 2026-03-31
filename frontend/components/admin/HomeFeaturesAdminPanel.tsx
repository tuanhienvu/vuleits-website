'use client';

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import {
  getModalOriginFromElement,
  type ModalOriginPoint,
  useAnimatedOriginModal,
} from '@/components/admin/useAnimatedOriginModal';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { useLocale } from '@/components/providers/LocaleProvider';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import AdminEmojiPickerField from '@/components/admin/AdminEmojiPickerField';
import { AdminFilterSearchIconButton, adminFilterPanelClass } from '@/components/admin/AdminFilterBarMobile';
import { isRichTextEmpty, richTextAsPlain } from '@/lib/richTextAdmin';

// --- Sections (UI): Header & table | Edit modal | Delete confirm ---

type HomeFeatureRow = {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
};

export default function HomeFeaturesAdminPanel({ heading }: { heading: string }) {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';
  const canAny = useCallback(
    (a: 'create' | 'read' | 'update' | 'delete') => can('homeFeatures', a) || can('banners', a),
    [can],
  );

  const [rows, setRows] = useState<HomeFeatureRow[]>([]);
  const [loading, setLoading] = useState(false);
  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<HomeFeatureRow | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ icon: '', title: '', description: '', order: 0, isActive: true });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const canDelete = canAny('delete');
  const colCount = canDelete ? 6 : 5;

  useEscapeToClose(modal.open && !saving, () => void modal.closeAnimated());

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/home-features', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as HomeFeatureRow[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load home features');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const canRead = useMemo(() => canAny('read'), [canAny]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeFilter === 'yes' && !r.isActive) return false;
      if (activeFilter === 'no' && r.isActive) return false;
      if (!q) return true;
      const descPlain = richTextAsPlain(r.description || '').toLowerCase();
      const hay = `${r.title} ${r.icon} ${r.order} ${descPlain}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, searchQuery, activeFilter]);

  useEffect(() => {
    if (!canRead) return;
    void refresh();
  }, [canRead, refresh]);

  useEffect(() => {
    const el = selectAllRef.current;
    if (!el || !canDelete) return;
    const n = filteredRows.length;
    const sel = filteredRows.filter((r) => selectedIds.has(r.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [filteredRows, selectedIds, canDelete]);

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (filteredRows.length === 0) return;
    if (filteredRows.every((r) => selectedIds.has(r.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const r of filteredRows) next.delete(r.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...filteredRows.map((r) => r.id)]));
    }
  };

  const openCreate = (triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(null);
    setForm({ icon: '✨', title: '', description: '', order: rows.length, isActive: true });
  };

  const openEdit = (r: HomeFeatureRow, triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(r.id);
    setForm({
      icon: r.icon,
      title: r.title,
      description: r.description,
      order: r.order,
      isActive: r.isActive,
    });
  };

  const submit = async () => {
    if (!canAny(editingId == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      const payload = {
        icon: form.icon.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        order: Number(form.order) || 0,
        isActive: form.isActive,
      };
      if (!payload.icon || !payload.title || isRichTextEmpty(form.description)) {
        toast.error('Icon, title, and description are required');
        setSaving(false);
        return;
      }
      const url = editingId == null ? '/api/admin/home-features' : `/api/admin/home-features/${editingId}`;
      const method = editingId == null ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success(editingId == null ? 'Created' : 'Updated');
      await modal.closeAnimated();
      await refresh();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!canAny('delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/home-features/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
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
        const res = await fetch(`/api/admin/home-features/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${ids.length} mục` : `Deleted ${ids.length} items`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!canRead) {
    return <div className="text-white/70">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-4">
      {/* ==================== HEADER & FEATURES TABLE ==================== */}
      <div className="flex min-w-0 flex-row items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-white sm:text-2xl">{heading}</h2>
        <div className="flex shrink-0 items-center gap-2">
          {canAny('create') ? (
            <button type="button" className="btn-admin-primary whitespace-nowrap" onClick={(e) => openCreate(e.currentTarget)}>
              {isVi ? 'Thêm tính năng' : 'Add feature'}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <label className="block sm:col-span-2 lg:col-span-2">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setMobileFiltersOpen(true)}
              placeholder={isVi ? 'Tiêu đề, icon, mô tả…' : 'Title, icon, description…'}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
          <label className="block">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Hoạt động' : 'Active'}</span>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">{isVi ? 'Tất cả' : 'All'}</option>
              <option value="yes">{isVi ? 'Có' : 'Yes'}</option>
              <option value="no">{isVi ? 'Không' : 'No'}</option>
            </select>
          </label>
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
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-left text-white/90 min-w-0 md:min-w-[640px]">
          <thead className="bg-white/5 text-white/70">
            <tr className="max-md:hidden">
              {canDelete ? (
                <th className="w-10 px-2 py-2">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="rounded border-white/30"
                    aria-label={isVi ? 'Chọn tất cả' : 'Select all'}
                    onChange={toggleSelectAll}
                    disabled={filteredRows.length === 0}
                  />
                </th>
              ) : null}
              <th className="px-3 py-2">Order</th>
              <th className="px-3 py-2">Icon</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-5 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r) => (
              <Fragment key={r.id}>
                <tr className="hidden border-t border-white/10 md:table-row">
                  {canDelete ? (
                    <td className="px-2 py-2 align-middle">
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelectRow(r.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </td>
                  ) : null}
                  <td className="px-3 py-2">{r.order}</td>
                  <td className="px-3 py-2">{r.icon}</td>
                  <td className="px-3 py-2 max-w-xs truncate" title={r.description}>
                    {r.title}
                  </td>
                  <td className="px-3 py-2">{r.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    {canAny('update') ? (
                      <button type="button" className="btn-admin-icon" onClick={(e) => openEdit(r, e.currentTarget)}>
                        <AdminEditIcon />
                      </button>
                    ) : null}
                    {canDelete ? (
                      <button
                        type="button"
                        className="btn-admin-icon-danger"
                        onClick={(e) => {
                          setDeleteDialogOrigin(getModalOriginFromElement(e.currentTarget));
                          setDeleteTarget(r);
                        }}
                      >
                        <AdminTrashIcon />
                      </button>
                    ) : null}
                  </td>
                </tr>
                <tr className="border-t border-white/10 md:hidden">
                  <td colSpan={colCount} className="p-0 align-top">
                    <AdminSwipeRow
                      canEdit={canAny('update')}
                      canDelete={canDelete}
                      onEdit={() => openEdit(r)}
                      onDelete={() => {
                        setDeleteDialogOrigin(null);
                        setDeleteTarget(r);
                      }}
                    >
                      <div className="flex items-center min-h-[4.5rem]">
                        {canDelete ? (
                          <label className="flex items-center px-2 border-r border-white/10 self-stretch" onTouchStart={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="rounded border-white/30"
                              checked={selectedIds.has(r.id)}
                              onChange={() => toggleSelectRow(r.id)}
                              aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                            />
                          </label>
                        ) : null}
                        <div className="min-w-0 flex-1 space-y-1 px-3 py-3">
                          <p className="text-xs text-white/50">
                            {isVi ? 'Thứ tự' : 'Order'}: {r.order} · {r.icon}
                          </p>
                          <p className="font-semibold text-white truncate">{r.title}</p>
                          <p className="text-xs text-white/60">{r.isActive ? (isVi ? 'Đang bật' : 'Active') : isVi ? 'Tắt' : 'Inactive'}</p>
                        </div>
                      </div>
                    </AdminSwipeRow>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && rows.length === 0 ? <p className="text-white/60">{isVi ? 'Chưa có tính năng.' : 'No features yet.'}</p> : null}
      {!loading && rows.length > 0 && filteredRows.length === 0 ? (
        <p className="text-white/60">{isVi ? 'Không có kết quả khớp bộ lọc.' : 'No items match your filters.'}</p>
      ) : null}

      {/* ==================== EDIT / CREATE HOME FEATURE MODAL ==================== */}
      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative glass max-w-4xl w-full min-w-0 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <h3 className="text-lg font-semibold text-white">{editingId == null ? (isVi ? 'Tính năng mới' : 'New feature') : isVi ? 'Sửa tính năng' : 'Edit feature'}</h3>
            <div className="block min-w-0 max-w-xs">
              <AdminEmojiPickerField
                id="home-feature-icon"
                value={form.icon}
                onChange={(icon) => setForm((f) => ({ ...f, icon }))}
                disabled={!canAny(editingId == null ? 'create' : 'update')}
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
            <label className="block">
              <span className="text-white/70 text-sm">Title</span>
              <input
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </label>
            <div className="block min-w-0">
              <span className="text-white/70 text-sm">{isVi ? 'Mô tả (định dạng)' : 'Description (rich text)'}</span>
              <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                <AdminTinyMceEditor
                  id="home-feature-description"
                  value={form.description}
                  onChange={(html) => setForm((f) => ({ ...f, description: html }))}
                  disabled={!canAny(editingId == null ? 'create' : 'update')}
                />
              </div>
            </div>
            <label className="block">
              <span className="text-white/70 text-sm">Order</span>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              />
            </label>
            <label className="flex items-center gap-2 text-white/90">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              />
              Active
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-admin-secondary" onClick={() => void modal.closeAnimated()} disabled={saving}>
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button type="button" className="btn-admin-primary" onClick={() => void submit()} disabled={saving}>
                {saving ? (isVi ? 'Đang lưu…' : 'Saving…') : isVi ? 'Lưu' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/* ==================== DELETE FEATURE CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa tính năng' : 'Delete feature'}
        message={deleteTarget ? (isVi ? `Xóa tính năng “${deleteTarget.title}”?` : `Delete feature “${deleteTarget.title}”?`) : ''}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => (deleteTarget ? void remove(deleteTarget.id) : undefined)}
      />
      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều tính năng' : 'Delete multiple features'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} tính năng đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected features? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeMany(Array.from(selectedIds))}
      />
    </div>
  );
}
