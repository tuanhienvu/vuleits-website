'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  UI_FEATURES,
  type AdminCrudMatrix,
  type AdminUiFeatureId,
  makeEmptyAdminMatrix,
  normalizeAdminMatrix,
} from '@/lib/adminPermissionModel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import { getModalOriginFromElement, type ModalOriginPoint } from '@/components/admin/useAnimatedOriginModal';
import { useToast } from '@/components/providers/ToastProvider';
import { apiPath } from '@/lib/apiRoutes';

const ACTIONS = ['create', 'read', 'update', 'delete'] as const;

const FEATURE_LABELS: Record<AdminUiFeatureId, string> = {
  overview: 'Overview',
  services: 'Services',
  products: 'Products',
  news: 'News',
  media: 'Media',
  banners: 'Banners',
  homeFeatures: 'Home features',
  uiTexts: 'UI text & translations',
  contacts: 'Contacts',
  aboutTeam: 'About team',
  aboutStats: 'About stats',
  users: 'Users',
  userPassword: 'User passwords',
  permissions: 'Permissions',
  auditLogs: 'Audit logs',
};

type UserOpt = { id: number; email: string; roleId: number; isActive: boolean; isProtected: boolean };
type RoleOpt = { id: number; name: string };

/** `all` = edit RolePermission for the selected group; `number` = edit UserPermission for that user */
type UserTarget = 'all' | number;

// --- Sections (UI): Role/user selectors & actions | Permission matrix | Reset confirm ---

export default function PermissionsAdminPanel() {
  const { can } = useAdminPermissions();
  const toast = useToast();
  const [users, setUsers] = useState<UserOpt[]>([]);
  const [roles, setRoles] = useState<RoleOpt[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [userTarget, setUserTarget] = useState<UserTarget>('all');
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [matrix, setMatrix] = useState<AdminCrudMatrix>(() => makeEmptyAdminMatrix());
  const [locked, setLocked] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetDialogOrigin, setResetDialogOrigin] = useState<ModalOriginPoint | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch(apiPath('admin/users'), { credentials: 'include' }),
        fetch(apiPath('admin/roles'), { credentials: 'include' }),
      ]);
      if (!usersRes.ok) throw new Error('Failed');
      const data = (await usersRes.json()) as UserOpt[];
      const rows = Array.isArray(data) ? data.filter((u) => u.isActive) : [];
      setUsers(rows);
      if (rolesRes.ok) {
        const roleRows = (await rolesRes.json()) as RoleOpt[];
        const validRoles = Array.isArray(roleRows) ? roleRows : [];
        setRoles(validRoles);
        setSelectedRoleId((cur) => (cur && validRoles.some((r) => r.id === cur) ? cur : validRoles[0]?.id ?? null));
      } else {
        setRoles([]);
        setSelectedRoleId(null);
      }
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('permissions', 'read')) return;
    void loadUsers();
  }, [can, loadUsers]);

  const filteredUsers = useMemo(
    () => users.filter((u) => (selectedRoleId ? u.roleId === selectedRoleId : true)),
    [users, selectedRoleId],
  );

  useEffect(() => {
    if (userTarget !== 'all' && typeof userTarget === 'number' && !filteredUsers.some((u) => u.id === userTarget)) {
      setUserTarget('all');
    }
  }, [filteredUsers, userTarget]);

  const loadRoleDetail = useCallback(
    async (roleId: number) => {
      setDetailLoading(true);
      try {
        const res = await fetch(apiPath(`admin/roles/${roleId}/permissions`), { credentials: 'include' });
        if (!res.ok) throw new Error('Failed');
        const data = (await res.json()) as { features?: AdminCrudMatrix; editable?: boolean };
        if (data.features && typeof data.features === 'object') {
          setMatrix(normalizeAdminMatrix(data.features));
        } else {
          setMatrix(makeEmptyAdminMatrix());
        }
        setLocked(data.editable === false);
      } catch {
        toast.error('Failed to load role permissions');
        setMatrix(makeEmptyAdminMatrix());
      } finally {
        setDetailLoading(false);
      }
    },
    [toast],
  );

  const loadUserDetail = useCallback(
    async (userId: number) => {
      setDetailLoading(true);
      try {
        const res = await fetch(apiPath(`admin/permissions/${userId}`), { credentials: 'include' });
        if (!res.ok) throw new Error('Failed');
        const data = (await res.json()) as { features?: AdminCrudMatrix; editable?: boolean };
        if (data.features && typeof data.features === 'object') {
          setMatrix(normalizeAdminMatrix(data.features));
        } else {
          setMatrix(makeEmptyAdminMatrix());
        }
        setLocked(data.editable === false);
      } catch {
        toast.error('Failed to load user permissions');
        setMatrix(makeEmptyAdminMatrix());
      } finally {
        setDetailLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    if (!can('permissions', 'read')) return;
    if (userTarget === 'all') {
      if (!selectedRoleId) return;
      void loadRoleDetail(selectedRoleId);
      return;
    }
    void loadUserDetail(userTarget);
  }, [userTarget, selectedRoleId, can, loadRoleDetail, loadUserDetail]);

  const toggle = (f: AdminUiFeatureId, a: (typeof ACTIONS)[number]) => {
    if (locked || !can('permissions', 'update')) return;
    setMatrix((m) => {
      const prev = m[f] ?? { create: false, read: false, update: false, delete: false };
      return {
        ...m,
        [f]: { ...prev, [a]: !prev[a] },
      };
    });
  };

  const canRunActions =
    userTarget === 'all'
      ? selectedRoleId != null
      : typeof userTarget === 'number' && filteredUsers.some((u) => u.id === userTarget);

  const save = async () => {
    if (!can('permissions', 'update') || !canRunActions) return;
    setSaving(true);
    try {
      if (userTarget === 'all' && selectedRoleId != null) {
        const res = await fetch(apiPath(`admin/roles/${selectedRoleId}/permissions`), {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features: matrix }),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Save failed');
        }
        toast.success('Group permissions saved');
        await loadRoleDetail(selectedRoleId);
      } else if (typeof userTarget === 'number') {
        const res = await fetch(apiPath(`admin/permissions/${userTarget}`), {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features: matrix }),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Save failed');
        }
        toast.success('Permissions saved');
        await loadUserDetail(userTarget);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
      if (userTarget === 'all' && selectedRoleId != null) await loadRoleDetail(selectedRoleId);
      else if (typeof userTarget === 'number') await loadUserDetail(userTarget);
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!can('permissions', 'update') || !canRunActions) return;
    setResetConfirmOpen(true);
  };

  const performReset = async () => {
    if (!can('permissions', 'update') || !canRunActions) return;
    setSaving(true);
    try {
      if (userTarget === 'all' && selectedRoleId != null) {
        const res = await fetch(apiPath(`admin/roles/${selectedRoleId}/permissions`), {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Reset failed');
        }
        toast.success('Group permissions reset');
        await loadRoleDetail(selectedRoleId);
      } else if (typeof userTarget === 'number') {
        const res = await fetch(apiPath(`admin/permissions/${userTarget}`), {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Reset failed');
        toast.success('Permissions reset');
        await loadUserDetail(userTarget);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Reset failed');
    } finally {
      setSaving(false);
    }
  };

  if (!can('permissions', 'read')) {
    return <div className="text-white/70">No permission.</div>;
  }

  const roleName = roles.find((r) => r.id === selectedRoleId)?.name ?? '—';
  const scopeLine =
    userTarget === 'all'
      ? `Editing user group (role): ${roleName}`
      : `Editing user: ${users.find((u) => u.id === userTarget)?.email ?? '—'}`;

  const showTable =
    !loading &&
    !detailLoading &&
    (userTarget === 'all' ? selectedRoleId != null : typeof userTarget === 'number');

  return (
    <div className="space-y-4">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Permissions</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2 sm:items-end">
          <label className="text-sm text-white/80 flex flex-col gap-1">
            <span>User group</span>
            <select
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-w-[200px]"
              value={selectedRoleId ?? ''}
              onChange={(e) => {
                const id = Number(e.target.value) || null;
                setSelectedRoleId(id);
                setUserTarget('all');
              }}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/80 flex flex-col gap-1">
            <span>User</span>
            <select
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-w-[220px]"
              value={userTarget === 'all' ? 'all' : String(userTarget)}
              onChange={(e) => {
                const v = e.target.value;
                setUserTarget(v === 'all' ? 'all' : Number(v));
              }}
            >
              <option value="all">All (group permissions)</option>
              {filteredUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>
          </label>
          {can('permissions', 'update') ? (
            <div className="flex flex-wrap gap-2 items-center sm:ml-1">
              <button
                type="button"
                className="btn-admin-secondary"
                disabled={saving || detailLoading || !canRunActions}
                onClick={(e) => {
                  setResetDialogOrigin(getModalOriginFromElement(e.currentTarget));
                  void reset();
                }}
              >
                Reset to defaults
              </button>
              <button
                type="button"
                className="btn-admin-primary"
                disabled={saving || detailLoading || !canRunActions}
                onClick={() => void save()}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-white/60 text-sm">{scopeLine}</p>
      {loading ? <p className="text-white/70">Loading…</p> : null}
      {detailLoading ? <p className="text-white/70">Loading matrix…</p> : null}
      {locked ? (
        <p className="text-amber-200/90 text-sm">
          {userTarget === 'all'
            ? 'This role’s permissions cannot be edited (SYSADMIN). View only.'
            : 'This account’s permissions are managed by role (SYSADMIN / protected). View only.'}
        </p>
      ) : null}
      {/* ==================== CRUD PERMISSION MATRIX ==================== */}
      {showTable ? (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-xs sm:text-sm text-left text-white/90 min-w-[640px]">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-2 py-2 sticky left-0 bg-white/10">Feature</th>
                {ACTIONS.map((a) => (
                  <th key={a} className="px-2 py-2 text-center capitalize">
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UI_FEATURES.map((f) => (
                <tr key={f} className="border-t border-white/10">
                  <td className="px-2 py-2 sticky left-0 bg-black/40 font-medium">{FEATURE_LABELS[f]}</td>
                  {ACTIONS.map((a) => (
                    <td key={a} className="px-2 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={matrix[f]?.[a] ?? false}
                        onChange={() => toggle(f, a)}
                        disabled={locked || !can('permissions', 'update')}
                        className="accent-cyan-400"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {showTable ? (
        <p className="text-white/50 text-xs max-w-3xl">
          Default templates: <span className="text-white/65">{FEATURE_LABELS.uiTexts}</span> is granted for SYSADMIN,
          ADMIN, and MANAGER only. EDITOR and WRITER have no UI text access until you enable it in this matrix.
        </p>
      ) : null}
      {!loading && userTarget !== 'all' && filteredUsers.length === 0 ? (
        <p className="text-white/60">No active users in this group.</p>
      ) : null}
      {/* ==================== RESET PERMISSIONS CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={resetConfirmOpen}
        origin={resetDialogOrigin}
        title="Reset permissions"
        message={
          userTarget === 'all'
            ? 'Reset this user group role permission set to the default template for this role?'
            : 'Reset this user permission set to role defaults?'
        }
        confirmText="Reset"
        confirming={saving}
        onCancel={() => (!saving ? (setResetConfirmOpen(false), setResetDialogOrigin(null)) : undefined)}
        onConfirm={() => {
          void performReset().finally(() => {
            setResetConfirmOpen(false);
            setResetDialogOrigin(null);
          });
        }}
      />
    </div>
  );
}
