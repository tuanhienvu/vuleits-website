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

type Row = {
  id: number;
  emoji: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  isActive: boolean;
};

export default function AboutTeamAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ emoji: '', name: '', role: '', bio: '', order: 0, isActive: true });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const canDelete = can('aboutTeam', 'delete');
  const colCount = canDelete ? 6 : 5;

  useEscapeToClose(modal.open && !saving, () => void modal.closeAnimated());

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/about-team', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as Row[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load team');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('aboutTeam', 'read')) return;
    void refresh();
  }, [can, refresh]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeFilter === 'yes' && !r.isActive) return false;
      if (activeFilter === 'no' && r.isActive) return false;
      if (!q) return true;
      const bioPlain = richTextAsPlain(r.bio || '').toLowerCase();
      const hay = `${r.name} ${r.role} ${r.emoji} ${bioPlain}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, searchQuery, activeFilter]);

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
    setForm({ emoji: '👤', name: '', role: '', bio: '', order: rows.length, isActive: true });
  };

  const openEdit = (r: Row, triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(r.id);
    setForm({ emoji: r.emoji, name: r.name, role: r.role, bio: r.bio, order: r.order, isActive: r.isActive });
  };

  const submit = async () => {
    if (!can('aboutTeam', editingId == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      const payload = {
        emoji: form.emoji.trim(),
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        order: Number(form.order) || 0,
        isActive: form.isActive,
      };
      if (!payload.emoji || !payload.name || !payload.role || isRichTextEmpty(form.bio)) {
        toast.error('All fields are required');
        setSaving(false);
        return;
      }
      const url = editingId == null ? '/api/admin/about-team' : `/api/admin/about-team/${editingId}`;
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
    if (!can('aboutTeam', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/about-team/${id}`, { method: 'DELETE', credentials: 'include' });
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
        const res = await fetch(`/api/admin/about-team/${id}`, { method: 'DELETE', credentials: 'include' });
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

  if (!can('aboutTeam', 'read')) {
    return <div className="text-white/70">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-4">
      {/* ==================== HEADER & TEAM TABLE ==================== */}
      <div className="flex min-w-0 flex-row items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-white sm:text-2xl">
          {isVi ? 'Đội ngũ' : 'About team'}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {can('aboutTeam', 'create') ? (
            <button type="button" className="btn-admin-primary whitespace-nowrap" onClick={(e) => openCreate(e.currentTarget)}>
              {isVi ? 'Thêm thành viên' : 'Add member'}
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
              placeholder={isVi ? 'Tên, vai trò, bio…' : 'Name, role, bio…'}
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
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Role</th>
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
                  <td className="px-3 py-2">
                    {r.emoji} {r.name}
                  </td>
                  <td className="px-3 py-2 max-w-[140px] truncate">{r.role}</td>
                  <td className="px-3 py-2">{r.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    {can('aboutTeam', 'update') ? (
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
                      canEdit={can('aboutTeam', 'update')}
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
                            {isVi ? 'Thứ tự' : 'Order'}: {r.order}
                          </p>
                          <p className="font-semibold text-white">
                            {r.emoji} {r.name}
                          </p>
                          <p className="text-sm text-white/70 truncate">{r.role}</p>
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
      {!loading && rows.length === 0 ? <p className="text-white/60">{isVi ? 'Chưa có thành viên.' : 'No members yet.'}</p> : null}
      {!loading && rows.length > 0 && filteredRows.length === 0 ? (
        <p className="text-white/60">{isVi ? 'Không có kết quả khớp bộ lọc.' : 'No members match your filters.'}</p>
      ) : null}

      {/* ==================== EDIT / CREATE TEAM MEMBER MODAL ==================== */}
      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative w-full max-w-5xl max-h-[96vh] sm:max-h-[90vh] glass rounded-2xl border border-white/10 overflow-hidden min-w-0"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="flex items-start justify-between gap-4 px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {editingId == null ? (isVi ? 'Thành viên mới' : 'New member') : isVi ? 'Sửa thành viên' : 'Edit member'}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {isVi ? 'Tên, vai trò, emoji và tiểu sử có định dạng.' : 'Name, role, emoji, and rich-text bio.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void modal.closeAnimated()}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded shrink-0 min-h-10 min-w-10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(96vh-156px)] sm:max-h-[calc(90vh-148px)] px-4 sm:px-6 py-4 sm:py-5 pb-28 sm:pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr] gap-3 min-w-0">
                  <label className="block min-w-0">
                    <span className="text-white/70 text-sm">{isVi ? 'Tên' : 'Name'}</span>
                    <input
                      className="mt-1 w-full min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </label>
                  <label className="block min-w-0">
                    <span className="text-white/70 text-sm">{isVi ? 'Vai trò' : 'Role'}</span>
                    <input
                      className="mt-1 w-full min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    />
                  </label>
                  <div className="block min-w-0">
                    <AdminEmojiPickerField
                      id="about-team-emoji"
                      value={form.emoji}
                      onChange={(emoji) => setForm((f) => ({ ...f, emoji }))}
                      disabled={!can('aboutTeam', editingId == null ? 'create' : 'update')}
                      labels={
                        isVi
                          ? {
                              field: 'Emoji',
                              choose: 'Chọn emoji',
                              custom: 'Hoặc nhập tay',
                              openPicker: 'Mở bảng chọn emoji',
                            }
                          : {
                              field: 'Emoji',
                              choose: 'Pick an emoji',
                              custom: 'Or type your own',
                              openPicker: 'Open emoji picker',
                            }
                      }
                    />
                  </div>
                </div>
                <div className="block min-w-0">
                  <span className="text-white/70 text-sm">{isVi ? 'Tiểu sử (định dạng)' : 'Bio (rich text)'}</span>
                  <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                    <AdminTinyMceEditor
                      id="about-team-bio"
                      value={form.bio}
                      onChange={(html) => setForm((f) => ({ ...f, bio: html }))}
                      disabled={!can('aboutTeam', editingId == null ? 'create' : 'update')}
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
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
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

      {/* ==================== DELETE TEAM MEMBER CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa thành viên' : 'Delete team member'}
        message={deleteTarget ? (isVi ? `Xóa “${deleteTarget.name}” khỏi đội ngũ?` : `Remove “${deleteTarget.name}” from About Team?`) : ''}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => (deleteTarget ? void remove(deleteTarget.id) : undefined)}
      />
      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều thành viên' : 'Delete multiple members'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} thành viên đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected members? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeMany(Array.from(selectedIds))}
      />
    </div>
  );
}
