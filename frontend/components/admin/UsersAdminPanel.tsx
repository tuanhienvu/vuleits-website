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
import { AdminFilterSearchIconButton, adminFilterPanelClass } from '@/components/admin/AdminFilterBarMobile';

type UserRow = {
  id: number;
  email: string;
  displayName: string | null;
  roleId: number;
  isActive: boolean;
  isProtected: boolean;
};

type RoleRow = { id: number; name: string };

// --- Sections (UI): Header & table | Edit/create modal | Delete confirm ---

export default function UsersAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';
  const [users, setUsers] = useState<UserRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(false);
  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    displayName: '',
    roleId: 0,
    isActive: true,
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const canDelete = can('users', 'delete');
  const colCount = canDelete ? 6 : 5;

  useEscapeToClose(modal.open && !saving, () => void modal.closeAnimated());

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [uRes, rRes] = await Promise.all([
        fetch('/api/admin/users', { credentials: 'include' }),
        fetch('/api/admin/roles', { credentials: 'include' }),
      ]);
      if (!uRes.ok) {
        if (uRes.status === 401) window.location.href = '/admin/login';
        throw new Error('Users failed');
      }
      const uData = (await uRes.json()) as UserRow[];
      setUsers(Array.isArray(uData) ? uData : []);
      if (rRes.ok) {
        const rData = (await rRes.json()) as RoleRow[];
        setRoles(Array.isArray(rData) ? rData : []);
        setForm((f) => ({ ...f, roleId: rData[0]?.id ?? f.roleId }));
      }
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('users', 'read')) return;
    void loadAll();
  }, [can, loadAll]);

  const isDeleteDisabled = useCallback(
    (u: UserRow) => {
      const roleName = (roles.find((r) => r.id === u.roleId)?.name || '').toUpperCase();
      return u.isProtected || roleName === 'SYSADMIN';
    },
    [roles],
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter && String(u.roleId) !== roleFilter) return false;
      if (activeFilter === 'yes' && !u.isActive) return false;
      if (activeFilter === 'no' && u.isActive) return false;
      if (!q) return true;
      const email = u.email.toLowerCase();
      const disp = (u.displayName ?? '').toLowerCase();
      return email.includes(q) || disp.includes(q);
    });
  }, [users, searchQuery, roleFilter, activeFilter]);

  const deletableFilteredUsers = useMemo(
    () => filteredUsers.filter((u) => !isDeleteDisabled(u)),
    [filteredUsers, isDeleteDisabled],
  );

  useEffect(() => {
    const el = selectAllRef.current;
    if (!el || !canDelete) return;
    const n = deletableFilteredUsers.length;
    const sel = deletableFilteredUsers.filter((u) => selectedIds.has(u.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [deletableFilteredUsers, selectedIds, canDelete]);

  const toggleSelectRow = (id: number) => {
    const u = users.find((x) => x.id === id);
    if (!u || isDeleteDisabled(u)) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (deletableFilteredUsers.length === 0) return;
    const allOn = deletableFilteredUsers.every((u) => selectedIds.has(u.id));
    if (allOn) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const u of deletableFilteredUsers) next.delete(u.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...deletableFilteredUsers.map((u) => u.id)]));
    }
  };

  const openCreate = (triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(null);
    setForm({
      email: '',
      password: '',
      displayName: '',
      roleId: roles[0]?.id ?? 0,
      isActive: true,
    });
  };

  const openEdit = (u: UserRow, triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(u.id);
    setForm({
      email: u.email,
      password: '',
      displayName: u.displayName ?? '',
      roleId: u.roleId,
      isActive: u.isActive,
    });
  };

  const submit = async () => {
    if (editingId == null && !can('users', 'create')) return;
    if (editingId != null && !can('users', 'update') && !can('userPassword', 'update')) return;
    setSaving(true);
    try {
      if (editingId == null) {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email.trim(),
            password: form.password,
            displayName: form.displayName.trim() || null,
            roleId: form.roleId,
            isActive: form.isActive,
          }),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Create failed');
        }
        toast.success(isVi ? 'Đã tạo người dùng' : 'User created');
      } else {
        const body: Record<string, unknown> = {
          email: form.email.trim(),
          displayName: form.displayName.trim() || null,
          roleId: form.roleId,
          isActive: form.isActive,
        };
        if (form.password.trim()) body.password = form.password;
        if (!can('users', 'update')) {
          delete body.email;
          delete body.displayName;
          delete body.roleId;
          delete body.isActive;
          if (!form.password.trim()) {
            toast.error('Enter a new password');
            setSaving(false);
            return;
          }
        }
        const res = await fetch(`/api/admin/users/${editingId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Update failed');
        }
        toast.success(isVi ? 'Đã cập nhật người dùng' : 'User updated');
      }
      await modal.closeAnimated();
      await loadAll();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (u: UserRow) => {
    if (!can('users', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      setDeleteTarget(null);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(u.id);
        return next;
      });
      await loadAll();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const removeMany = async (ids: number[]) => {
    if (!canDelete) return;
    const allowed = ids.filter((id) => {
      const u = users.find((x) => x.id === id);
      return u && !isDeleteDisabled(u);
    });
    if (allowed.length === 0) return;
    setDeleting(true);
    try {
      for (const id of allowed) {
        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${allowed.length} người dùng` : `Deleted ${allowed.length} users`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
      await loadAll();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!can('users', 'read')) {
    return <div className="text-white/70">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-4">
      {/* ==================== HEADER & USER TABLE ==================== */}
      <div className="flex min-w-0 flex-row items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-white sm:text-2xl">
          {isVi ? 'Người dùng' : 'Users'}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {can('users', 'create') ? (
            <button type="button" className="btn-admin-primary whitespace-nowrap" onClick={(e) => openCreate(e.currentTarget)}>
              {isVi ? 'Thêm người dùng' : 'Add user'}
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
          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setMobileFiltersOpen(true)}
              placeholder={isVi ? 'Email, tên hiển thị…' : 'Email, display name…'}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
          <label className="block">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Vai trò' : 'Role'}</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">{isVi ? 'Tất cả' : 'All'}</option>
              {roles.map((r) => (
                <option key={r.id} value={String(r.id)}>
                  {r.name}
                </option>
              ))}
            </select>
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
                    disabled={deletableFilteredUsers.length === 0}
                  />
                </th>
              ) : null}
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Display</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-5 py-2 text-right">{isVi ? 'Thao tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <Fragment key={u.id}>
                <tr className="hidden border-t border-white/10 md:table-row">
                  {canDelete ? (
                    <td className="px-2 py-2 align-middle">
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(u.id)}
                        onChange={() => toggleSelectRow(u.id)}
                        disabled={isDeleteDisabled(u)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                        title={isDeleteDisabled(u) ? 'SYSADMIN/protected user cannot be deleted' : undefined}
                      />
                    </td>
                  ) : null}
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2">{u.displayName ?? '—'}</td>
                  <td className="px-3 py-2">{roles.find((r) => r.id === u.roleId)?.name ?? u.roleId}</td>
                  <td className="px-3 py-2">{u.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    {can('users', 'update') || can('userPassword', 'update') ? (
                      <button type="button" className="btn-admin-icon" onClick={(e) => openEdit(u, e.currentTarget)}>
                        <AdminEditIcon />
                      </button>
                    ) : null}
                    {canDelete ? (
                      <button
                        type="button"
                        className={`btn-admin-icon-danger ${isDeleteDisabled(u) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                          setDeleteDialogOrigin(getModalOriginFromElement(e.currentTarget));
                          setDeleteTarget(u);
                        }}
                        disabled={isDeleteDisabled(u)}
                        title={isDeleteDisabled(u) ? 'SYSADMIN/protected user cannot be deleted' : 'Delete user'}
                      >
                        <AdminTrashIcon />
                      </button>
                    ) : null}
                  </td>
                </tr>
                <tr className="border-t border-white/10 md:hidden">
                  <td colSpan={colCount} className="p-0 align-top">
                    <AdminSwipeRow
                      canEdit={can('users', 'update') || can('userPassword', 'update')}
                      canDelete={canDelete && !isDeleteDisabled(u)}
                      onEdit={() => openEdit(u)}
                      onDelete={() => {
                        setDeleteDialogOrigin(null);
                        setDeleteTarget(u);
                      }}
                    >
                      <div className="flex items-center min-h-[4.5rem]">
                        {canDelete ? (
                          <label
                            className={`flex items-center px-2 border-r border-white/10 self-stretch ${isDeleteDisabled(u) ? 'opacity-40' : ''}`}
                            onTouchStart={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="rounded border-white/30"
                              checked={selectedIds.has(u.id)}
                              onChange={() => toggleSelectRow(u.id)}
                              disabled={isDeleteDisabled(u)}
                              aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                            />
                          </label>
                        ) : null}
                        <div className="min-w-0 flex-1 space-y-1 px-3 py-3">
                          <p className="font-medium text-white break-all">{u.email}</p>
                          <p className="text-sm text-white/70">{u.displayName ?? '—'}</p>
                          <p className="text-xs text-white/60">
                            {roles.find((r) => r.id === u.roleId)?.name ?? u.roleId} ·{' '}
                            {u.isActive ? (isVi ? 'Hoạt động' : 'Active') : isVi ? 'Ngưng' : 'Inactive'}
                          </p>
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
      {!loading && users.length === 0 ? <p className="text-white/60">{isVi ? 'Chưa có người dùng.' : 'No users.'}</p> : null}
      {!loading && users.length > 0 && filteredUsers.length === 0 ? (
        <p className="text-white/60">{isVi ? 'Không có kết quả khớp bộ lọc.' : 'No users match your filters.'}</p>
      ) : null}

      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative glass max-w-md w-full rounded-2xl p-6 space-y-3 max-h-[90vh] overflow-y-auto"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <h3 className="text-lg font-semibold text-white">{editingId == null ? (isVi ? 'Người dùng mới' : 'New user') : isVi ? 'Sửa người dùng' : 'Edit user'}</h3>
            <label className="block">
              <span className="text-white/70 text-sm">Email</span>
              <input
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                disabled={editingId != null && !can('users', 'update')}
              />
            </label>
            <label className="block">
              <span className="text-white/70 text-sm">{editingId == null ? 'Password' : 'New password (optional)'}</span>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="new-password"
              />
            </label>
            <label className="block">
              <span className="text-white/70 text-sm">Display name</span>
              <input
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.displayName}
                onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                disabled={editingId != null && !can('users', 'update')}
              />
            </label>
            <label className="block">
              <span className="text-white/70 text-sm">Role</span>
              <select
                className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                value={form.roleId}
                onChange={(e) => setForm((f) => ({ ...f, roleId: Number(e.target.value) }))}
                disabled={editingId != null && !can('users', 'update')}
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-white/90">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                disabled={editingId != null && !can('users', 'update')}
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

      {/* ==================== DELETE USER CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa người dùng' : 'Delete user'}
        message={deleteTarget ? (isVi ? `Xóa người dùng ${deleteTarget.email}?` : `Delete user ${deleteTarget.email}?`) : ''}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => (deleteTarget ? void remove(deleteTarget) : undefined)}
      />
      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều người dùng' : 'Delete multiple users'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} người dùng đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected users? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeMany(Array.from(selectedIds))}
      />
    </div>
  );
}
