'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { UI_FEATURES, type AdminUiFeatureId } from '@/lib/adminPermissionModel';
import { getRoleRank } from '@/lib/adminRoleRank';
import { useToast } from '@/components/providers/ToastProvider';
import type { AboutIntroPayload } from '@/lib/aboutIntroSetting';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import NewsAdminPanel from '@/components/admin/NewsAdminPanel';

function isAdminFeatureTab(tab: string): tab is AdminUiFeatureId {
  return (UI_FEATURES as readonly string[]).includes(tab);
}

function catchMessage(e: unknown, fallback: string): string {
  return e instanceof Error ? e.message : fallback;
}

// Small client-side auth redirect component
function AuthRedirect() {
  useEffect(() => {
    try {
      // Try to access a protected API; if 401, redirect to login
      fetch('/api/admin/me', { credentials: 'include' }).then((res) => {
        if (!res.ok) {
          window.location.href = '/admin/login';
        }
      });
    } catch {
      // ignore
    }
  }, []);
  return null;
}

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { can, loading: permsLoading } = useAdminPermissions();
  const toast = useToast();

  // ==================== STATE MANAGEMENT [SEARCH: STATE, TAB] ====================
  const [activeTab, setActiveTab] = useState('overview');

  type AdminRole = { id: number; name: string };
  type AdminUser = {
    id: number;
    email: string;
    displayName: string | null;
    roleId: number;
    isActive: boolean;
    isProtected: boolean;
  };
  type HomeFeature = {
    id: number;
    icon: string;
    title: string;
    description: string;
    order: number;
    isActive: boolean;
  };
  type AboutStat = { id: number; number: string; label: string; order: number; isActive: boolean };
  type AboutTeamMember = {
    id: number;
    emoji: string;
    name: string;
    role: string;
    bio: string;
    order: number;
    isActive: boolean;
  };
  type ServiceItem = {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string | null;
    order: number;
    isActive: boolean;
  };

  type MediaLibraryRow = {
    id: number;
    url: string;
    filename: string;
    mimeType: string;
    folder: string;
    createdAt: string;
  };

  const [mediaList, setMediaList] = useState<MediaLibraryRow[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaFolder, setMediaFolder] = useState('library');
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  // Sync activeTab with URL parameter
  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab) {
      setActiveTab(urlTab);
      return;
    }

    // If query param is missing (can happen on reloads), restore the last tab.
    try {
      const stored = window.localStorage.getItem('admin_dashboard_tab');
      if (stored && isAdminFeatureTab(stored)) {
        setActiveTab(stored);
      } else {
        setActiveTab('overview');
      }
    } catch {
      setActiveTab('overview');
    }
  }, [searchParams]);

  useEffect(() => {
    if (permsLoading) return;
    if (!isAdminFeatureTab(activeTab)) return;
    if (can(activeTab, 'read')) return;

    // Keep existing navigation behavior for unauthorized tabs:
    // redirect to the first permitted feature (or login).
    const fallback = UI_FEATURES.find((f) => can(f, 'read'));
    if (fallback) {
      router.replace(`/admin/dashboard?tab=${fallback}`);
    } else {
      router.replace('/admin/login');
    }
  }, [permsLoading, activeTab, can, router]);

  useEffect(() => {
    try {
      window.localStorage.setItem('admin_dashboard_tab', activeTab);
    } catch {
      // ignore
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'media' || permsLoading || !can('media', 'read')) return;
    let cancelled = false;
    setMediaLoading(true);
    fetch('/api/admin/media?take=100&imagesOnly=0', { credentials: 'include' })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok || cancelled) return;
        if (Array.isArray(data)) setMediaList(data as MediaLibraryRow[]);
      })
      .catch(() => {
        if (!cancelled) toast.error('Failed to load media');
      })
      .finally(() => {
        if (!cancelled) setMediaLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, permsLoading, can, toast]);

  const uploadMediaFile = useCallback(
    async (file: File | null) => {
      if (!file || !can('media', 'create')) return;
      setMediaUploading(true);
      try {
        const fd = new FormData();
        fd.set('file', file);
        fd.set('folder', mediaFolder.trim() || 'library');
        const res = await fetch('/api/admin/media', { method: 'POST', credentials: 'include', body: fd });
        const data = (await res.json().catch(() => ({}))) as { error?: string; media?: MediaLibraryRow };
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        if (data.media) {
          setMediaList((prev) => [data.media!, ...prev]);
          toast.success('Upload complete');
        }
      } catch (e: unknown) {
        toast.error(catchMessage(e, 'Upload failed'));
      } finally {
        setMediaUploading(false);
        if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
      }
    },
    [can, mediaFolder, toast],
  );

  // ==================== STATISTICS CONFIG [SEARCH: STATS, DATA] ====================
  const stats = [
    { label: 'Total Products', value: '24', icon: '📦' },
    { label: 'Total News', value: '42', icon: '📰' },
    { label: 'Total Users', value: '8', icon: '👥' },
    { label: 'Contact Messages', value: '15', icon: '💬' },
  ];

  // ==================== USERS + PERMISSIONS (DB-backed) ====================
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    email: '',
    password: '',
    displayName: '',
    roleId: '' as number | '',
    isActive: true,
  });
  const [addUserSaving, setAddUserSaving] = useState(false);
  /** User Management: empty string = all roles; otherwise numeric role id as string (select value). */
  const [userManagementRoleFilter, setUserManagementRoleFilter] = useState('');

  type SessionMe = { id: number; email: string; roleId: number; role: { name: string } | null };
  const [sessionMe, setSessionMe] = useState<SessionMe | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (!res.ok) return;
        const data = (await res.json()) as SessionMe;
        if (!cancelled && data?.id) setSessionMe(data);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  type FeatureId =
    | 'overview'
    | 'services'
    | 'products'
    | 'news'
    | 'media'
    | 'banners'
    | 'homeFeatures'
    | 'contacts'
    | 'aboutTeam'
    | 'aboutStats'
    | 'users'
    | 'userPassword'
    | 'permissions';

  type CrudPermission = { create: boolean; read: boolean; update: boolean; delete: boolean };

  const features: Array<{ id: FeatureId; label: string; icon: string }> = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    // Product Group
    { id: 'services', label: 'Services', icon: '🧩' },
    { id: 'products', label: 'Products', icon: '📦' },
    // Contents
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'banners', label: 'Banners', icon: '🎬' },
    // Settings
    { id: 'homeFeatures', label: 'Home Features', icon: '🏠' },
    { id: 'contacts', label: 'Contacts', icon: '💬' },
    { id: 'aboutTeam', label: 'About Team', icon: '👤' },
    { id: 'aboutStats', label: 'About Stats', icon: '📈' },
    // Permission
    { id: 'users', label: 'Users (list, create, role, active)', icon: '👥' },
    { id: 'userPassword', label: 'User password (reset)', icon: '🔑' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' },
  ];

  const emptyCrud = (): CrudPermission => ({ create: false, read: false, update: false, delete: false });
  const fullCrud = (): CrudPermission => ({ create: true, read: true, update: true, delete: true });
  const makeEmptyMatrix = (): Record<FeatureId, CrudPermission> =>
    Object.fromEntries(features.map((f) => [f.id, emptyCrud()])) as Record<FeatureId, CrudPermission>;
  const makeFullMatrix = (): Record<FeatureId, CrudPermission> =>
    Object.fromEntries(features.map((f) => [f.id, fullCrud()])) as Record<FeatureId, CrudPermission>;

  const [selectedPermissionUserId, setSelectedPermissionUserId] = useState<number | null>(null);
  const [permissionMatrix, setPermissionMatrix] = useState<Record<FeatureId, CrudPermission>>(makeEmptyMatrix);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissionsSaving, setPermissionsSaving] = useState(false);
  const [permissionsResetting, setPermissionsResetting] = useState(false);
  /** Permissions tab: filter chooser list by role; empty = all roles. */
  const [permissionsTabRoleFilter, setPermissionsTabRoleFilter] = useState('');
  /** Permissions tab: empty = all users (within role filter); else one user id string. */
  const [permissionsTabUserFilter, setPermissionsTabUserFilter] = useState('');

  const selectedPermissionUser = useMemo(
    () => (selectedPermissionUserId != null ? users.find((u) => u.id === selectedPermissionUserId) || null : null),
    [selectedPermissionUserId, users],
  );

  /** User Management tab: ascending by role name, then display name / email. */
  const usersSortedForManagement = useMemo(() => {
    const roleLabel = (roleId: number) =>
      roles.find((r) => r.id === roleId)?.name ?? `\uFFFF#${roleId}`;
    const personLabel = (u: AdminUser) => {
      const d = (u.displayName ?? '').trim();
      return (d || u.email).toLocaleLowerCase();
    };
    return [...users].sort((a, b) => {
      const byRole = roleLabel(a.roleId).localeCompare(roleLabel(b.roleId), undefined, { sensitivity: 'base' });
      if (byRole !== 0) return byRole;
      return personLabel(a).localeCompare(personLabel(b), undefined, { sensitivity: 'base' });
    });
  }, [users, roles]);

  const rolesSortedByName = useMemo(
    () =>
      [...roles].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
    [roles],
  );

  const usersFilteredForManagement = useMemo(() => {
    if (userManagementRoleFilter === '') return usersSortedForManagement;
    const id = Number(userManagementRoleFilter);
    if (!Number.isFinite(id)) return usersSortedForManagement;
    return usersSortedForManagement.filter((u) => u.roleId === id);
  }, [usersSortedForManagement, userManagementRoleFilter]);

  const usersMatchingPermissionsRoleFilter = useMemo(() => {
    if (permissionsTabRoleFilter === '') return usersSortedForManagement;
    const rid = Number(permissionsTabRoleFilter);
    if (!Number.isFinite(rid)) return usersSortedForManagement;
    return usersSortedForManagement.filter((u) => u.roleId === rid);
  }, [usersSortedForManagement, permissionsTabRoleFilter]);

  const permissionsTabUserFilterValid = useMemo(() => {
    if (permissionsTabUserFilter === '') return true;
    const id = Number(permissionsTabUserFilter);
    if (!Number.isFinite(id)) return false;
    return usersMatchingPermissionsRoleFilter.some((u) => u.id === id);
  }, [permissionsTabUserFilter, usersMatchingPermissionsRoleFilter]);

  const usersForPermissionsChooserList = useMemo(() => {
    if (permissionsTabUserFilter === '' || !permissionsTabUserFilterValid) {
      return usersMatchingPermissionsRoleFilter;
    }
    const id = Number(permissionsTabUserFilter);
    return usersMatchingPermissionsRoleFilter.filter((u) => u.id === id);
  }, [usersMatchingPermissionsRoleFilter, permissionsTabUserFilter, permissionsTabUserFilterValid]);

  function permissionChooserUserLabel(u: AdminUser): string {
    const d = (u.displayName ?? '').trim();
    if (d) return d;
    return u.email;
  }

  useEffect(() => {
    if (!permissionsTabUserFilterValid && permissionsTabUserFilter !== '') {
      setPermissionsTabUserFilter('');
    }
  }, [permissionsTabUserFilterValid, permissionsTabUserFilter]);

  useEffect(() => {
    if (permissionsTabRoleFilter === '') return;
    const rid = Number(permissionsTabRoleFilter);
    if (!Number.isFinite(rid)) return;
    if (selectedPermissionUserId == null) return;
    const u = users.find((x) => x.id === selectedPermissionUserId);
    if (u && u.roleId !== rid) setSelectedPermissionUserId(null);
  }, [permissionsTabRoleFilter, selectedPermissionUserId, users]);

  async function loadRoles(): Promise<AdminRole[] | undefined> {
    setRolesLoading(true);
    try {
      const res = await fetch('/api/admin/roles', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        return undefined;
      }
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setRoles(list);
      return list;
    } catch {
      return undefined;
    } finally {
      setRolesLoading(false);
    }
  }

  async function loadUsers() {
    setUsersLoading(true);
    try {
      const res = await fetch('/api/admin/users', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setUsersLoading(false);
    }
  }

  async function openAddUserModal() {
    const list = (await loadRoles()) ?? roles;
    const admin = list.find((r) => r.name.toUpperCase() === 'ADMIN');
    setAddUserForm({
      email: '',
      password: '',
      displayName: '',
      roleId: admin?.id ?? (list[0]?.id ?? ''),
      isActive: true,
    });
    if (!list.length) toast.error('Could not load roles. Try again or refresh the page.');
    setAddUserModalOpen(true);
  }

  function closeAddUserModal() {
    if (addUserSaving) return;
    setAddUserModalOpen(false);
  }

  async function submitAddUser() {
    const email = addUserForm.email.trim();
    if (!email || !addUserForm.password) {
      toast.error('Email and password are required.');
      return;
    }
    if (addUserForm.roleId === '') {
      toast.error('Select a role.');
      return;
    }
    setAddUserSaving(true);
    try {
      const body: Record<string, unknown> = {
        email,
        password: addUserForm.password,
        roleId: addUserForm.roleId,
        isActive: addUserForm.isActive,
      };
      const dn = addUserForm.displayName.trim();
      if (dn) body.displayName = dn;

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error((data as { error?: string }).error || 'Failed to create user');
        return;
      }
      setAddUserModalOpen(false);
      await loadUsers();
      toast.success('User created');
    } catch {
      toast.error('Network error');
    } finally {
      setAddUserSaving(false);
    }
  }

  const loadPermissionMatrix = useCallback(async (userId: number) => {
    setPermissionsLoading(true);
    try {
      const res = await fetch(`/api/admin/permissions/${userId}`, { credentials: 'include' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        throw new Error((data as { error?: string })?.error || 'Failed to load permissions');
      }
      const data = await res.json();
      if (data?.features) setPermissionMatrix(data.features as Record<FeatureId, CrudPermission>);
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load permissions'));
    } finally {
      setPermissionsLoading(false);
    }
  }, [toast]);

  async function savePermissionMatrix(userId: number) {
    setPermissionsSaving(true);
    try {
      const res = await fetch(`/api/admin/permissions/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: permissionMatrix }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to save permissions');
      }
      await loadPermissionMatrix(userId);
      toast.success('Permissions saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to save permissions'));
    } finally {
      setPermissionsSaving(false);
    }
  }

  const allPermissionCheckboxesSelected = useMemo(() => {
    const actions = ['create', 'read', 'update', 'delete'] as const;
    const ids = Object.keys(permissionMatrix) as FeatureId[];
    return ids.length > 0 && ids.every((fid) => actions.every((a) => Boolean(permissionMatrix[fid]?.[a])));
  }, [permissionMatrix]);

  function toggleSelectAllPermissions() {
    setPermissionMatrix(allPermissionCheckboxesSelected ? makeEmptyMatrix() : makeFullMatrix());
  }

  async function resetPermissionMatrixToDefaults(userId: number) {
    if (
      !window.confirm(
        "Reset this user's permissions to the built-in defaults for their current role? Any custom permission changes will be removed.",
      )
    ) {
      return;
    }
    setPermissionsResetting(true);
    try {
      const res = await fetch(`/api/admin/permissions/${userId}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Failed to reset permissions');
      }
      if (data?.features) setPermissionMatrix(data.features as Record<FeatureId, CrudPermission>);
      else await loadPermissionMatrix(userId);
      toast.success('Permissions reset to role defaults');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to reset permissions'));
    } finally {
      setPermissionsResetting(false);
    }
  }

  // Load users/roles when opening management tabs
  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'permissions') {
      void loadRoles();
      void loadUsers();
    }
  }, [activeTab]);

  // Preselect user in Permission tab from URL (?userId=...)
  useEffect(() => {
    if (activeTab !== 'permissions') return;
    const idParam = searchParams.get('userId');
    if (!idParam) return;
    const id = Number(idParam);
    if (Number.isFinite(id)) setSelectedPermissionUserId(id);
  }, [activeTab, searchParams]);

  // When selection changes in Permission tab, fetch their matrix
  useEffect(() => {
    if (activeTab !== 'permissions') return;
    if (selectedPermissionUserId == null) return;
    void loadPermissionMatrix(selectedPermissionUserId);
  }, [activeTab, selectedPermissionUserId, loadPermissionMatrix]);

  // ==================== HOME FEATURES STATE [SEARCH: HOME FEATURES, CRUD] ====================
  const [homeFeatures, setHomeFeatures] = useState<HomeFeature[]>([]);
  const [hfLoading, setHfLoading] = useState(false);
  const [hfModalOpen, setHfModalOpen] = useState(false);
  const [hfSaving, setHfSaving] = useState(false);
  const [hfForm, setHfForm] = useState({
    id: null as number | null,
    icon: '',
    title: '',
    description: '',
    order: 0,
    isActive: true,
  });

  // ==================== ABOUT STATS STATE [SEARCH: ABOUT STATS, CRUD] ====================
  const [aboutStats, setAboutStats] = useState<AboutStat[]>([]);
  const [asLoading, setAsLoading] = useState(false);
  const [asModalOpen, setAsModalOpen] = useState(false);
  const [asSaving, setAsSaving] = useState(false);
  const [asForm, setAsForm] = useState({
    id: null as number | null,
    number: '',
    label: '',
    order: 0,
    isActive: true,
  });

  async function loadAboutStats() {
    setAsLoading(true);
    try {
      const res = await fetch('/api/admin/about-stats', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load about stats');
      }
      const data = await res.json();
      setAboutStats(Array.isArray(data) ? (data as AboutStat[]) : []);
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load about stats'));
    } finally {
      setAsLoading(false);
    }
  }

  function openCreateAboutStat() {
    setAsForm({ id: null, number: '', label: '', order: 0, isActive: true });
    setAsModalOpen(true);
  }

  function openEditAboutStat(stat: AboutStat) {
    setAsForm({
      id: stat.id,
      number: stat.number || '',
      label: stat.label || '',
      order: typeof stat.order === 'number' ? stat.order : 0,
      isActive: stat.isActive !== false,
    });
    setAsModalOpen(true);
  }

  async function saveAboutStat() {
    setAsSaving(true);
    try {
      const payload = { number: asForm.number, label: asForm.label, order: Number(asForm.order), isActive: Boolean(asForm.isActive) };
      const isEdit = asForm.id != null;
      const url = isEdit ? `/api/admin/about-stats/${asForm.id}` : '/api/admin/about-stats';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }
      setAsModalOpen(false);
      await loadAboutStats();
      toast.success('Saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Save failed'));
    } finally {
      setAsSaving(false);
    }
  }

  async function deleteAboutStat(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this stat?');
    if (!ok) return;
    try {
      const res = await fetch(`/api/admin/about-stats/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadAboutStats();
      toast.success('Deleted');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Delete failed'));
    }
  }

  // ==================== ABOUT TEAM STATE [SEARCH: ABOUT TEAM, CRUD] ====================
  const [aboutTeam, setAboutTeam] = useState<AboutTeamMember[]>([]);
  const [atLoading, setAtLoading] = useState(false);
  const [atModalOpen, setAtModalOpen] = useState(false);
  const [atSaving, setAtSaving] = useState(false);
  const [atForm, setAtForm] = useState({
    id: null as number | null,
    emoji: '',
    name: '',
    role: '',
    bio: '',
    order: 0,
    isActive: true,
  });

  const [aboutPageIntro, setAboutPageIntro] = useState<AboutIntroPayload>({
    titleEn: '',
    titleVi: '',
    bodyEn: '',
    bodyVi: '',
    heroImageUrl: '',
    heroImageAltEn: '',
    heroImageAltVi: '',
  });
  const [aiIntroLoading, setAiIntroLoading] = useState(false);
  const [aiIntroSaving, setAiIntroSaving] = useState(false);
  const [heroIntroImageLibraryOpen, setHeroIntroImageLibraryOpen] = useState(false);
  const [heroIntroImageLibraryLoading, setHeroIntroImageLibraryLoading] = useState(false);
  const [heroIntroImageLibraryList, setHeroIntroImageLibraryList] = useState<MediaLibraryRow[]>([]);
  const [heroIntroImageUploading, setHeroIntroImageUploading] = useState(false);
  const heroIntroImageFileRef = useRef<HTMLInputElement>(null);

  async function loadAboutIntro() {
    setAiIntroLoading(true);
    try {
      const res = await fetch('/api/admin/about-intro', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load about intro');
      }
      const data = (await res.json()) as AboutIntroPayload;
      setAboutPageIntro({
        titleEn: data.titleEn ?? '',
        titleVi: data.titleVi ?? '',
        bodyEn: data.bodyEn ?? '',
        bodyVi: data.bodyVi ?? '',
        heroImageUrl: data.heroImageUrl ?? '',
        heroImageAltEn: data.heroImageAltEn ?? '',
        heroImageAltVi: data.heroImageAltVi ?? '',
      });
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load about intro'));
    } finally {
      setAiIntroLoading(false);
    }
  }

  async function saveAboutIntro() {
    setAiIntroSaving(true);
    try {
      const res = await fetch('/api/admin/about-intro', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutPageIntro),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }
      toast.success('About introduction saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Save failed'));
    } finally {
      setAiIntroSaving(false);
    }
  }

  const openHeroIntroImageLibrary = useCallback(async () => {
    if (!can('aboutTeam', 'update')) return;
    if (!can('media', 'read')) {
      toast.error('Media read permission is required to browse uploaded images.');
      return;
    }
    setHeroIntroImageLibraryOpen(true);
    setHeroIntroImageLibraryLoading(true);
    try {
      const res = await fetch('/api/admin/media?take=100', { credentials: 'include' });
      if (!res.ok) {
        setHeroIntroImageLibraryList([]);
        return;
      }
      const list = (await res.json()) as MediaLibraryRow[];
      setHeroIntroImageLibraryList(Array.isArray(list) ? list : []);
    } catch {
      setHeroIntroImageLibraryList([]);
    } finally {
      setHeroIntroImageLibraryLoading(false);
    }
  }, [can, toast]);

  const uploadHeroIntroImage = useCallback(
    async (file: File | null) => {
      if (!file || !can('aboutTeam', 'update')) return;
      if (!can('media', 'create')) {
        toast.error('Media upload permission is required to add files.');
        return;
      }
      setHeroIntroImageUploading(true);
      try {
        const fd = new FormData();
        fd.set('file', file);
        fd.set('folder', 'library');
        const res = await fetch('/api/admin/media', { method: 'POST', credentials: 'include', body: fd });
        const data = (await res.json().catch(() => ({}))) as { error?: string; media?: MediaLibraryRow };
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        if (data.media?.url) {
          setAboutPageIntro((x) => ({ ...x, heroImageUrl: data.media!.url }));
          toast.success('Image uploaded. Save introduction to publish.');
        }
      } catch (e: unknown) {
        toast.error(catchMessage(e, 'Upload failed'));
      } finally {
        setHeroIntroImageUploading(false);
        if (heroIntroImageFileRef.current) heroIntroImageFileRef.current.value = '';
      }
    },
    [can, toast],
  );

  function pickHeroIntroImageFromLibrary(row: MediaLibraryRow) {
    setAboutPageIntro((x) => ({ ...x, heroImageUrl: row.url }));
    setHeroIntroImageLibraryOpen(false);
  }

  useEffect(() => {
    if (!heroIntroImageLibraryOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHeroIntroImageLibraryOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [heroIntroImageLibraryOpen]);

  async function loadAboutTeam() {
    setAtLoading(true);
    try {
      const res = await fetch('/api/admin/about-team', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load about team');
      }
      const data = await res.json();
      setAboutTeam(Array.isArray(data) ? (data as AboutTeamMember[]) : []);
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load about team'));
    } finally {
      setAtLoading(false);
    }
  }

  function openCreateAboutTeam() {
    setAtForm({ id: null, emoji: '', name: '', role: '', bio: '', order: 0, isActive: true });
    setAtModalOpen(true);
  }

  function openEditAboutTeam(member: AboutTeamMember) {
    setAtForm({
      id: member.id,
      emoji: member.emoji || '',
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      order: typeof member.order === 'number' ? member.order : 0,
      isActive: member.isActive !== false,
    });
    setAtModalOpen(true);
  }

  async function saveAboutTeam() {
    setAtSaving(true);
    try {
      const payload = {
        emoji: atForm.emoji,
        name: atForm.name,
        role: atForm.role,
        bio: atForm.bio,
        order: Number(atForm.order),
        isActive: Boolean(atForm.isActive),
      };
      const isEdit = atForm.id != null;
      const url = isEdit ? `/api/admin/about-team/${atForm.id}` : '/api/admin/about-team';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }
      setAtModalOpen(false);
      await loadAboutTeam();
      toast.success('Saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Save failed'));
    } finally {
      setAtSaving(false);
    }
  }

  async function deleteAboutTeam(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this team member?');
    if (!ok) return;
    try {
      const res = await fetch(`/api/admin/about-team/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadAboutTeam();
      toast.success('Deleted');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Delete failed'));
    }
  }

  // ==================== SERVICES STATE [SEARCH: SERVICES, CRUD] ====================
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [svLoading, setSvLoading] = useState(false);
  const [svModalOpen, setSvModalOpen] = useState(false);
  const [svSaving, setSvSaving] = useState(false);
  const [svForm, setSvForm] = useState({
    id: null as number | null,
    icon: '',
    title: '',
    description: '',
    featuresText: '',
    order: 0,
    isActive: true,
  });

  function stringifyFeatures(features: string | null): string {
    if (!features) return '';
    try {
      const parsed = JSON.parse(features);
      if (Array.isArray(parsed)) return parsed.map((x) => String(x)).join('\n');
    } catch {
      // ignore
    }
    return '';
  }

  async function loadServices() {
    setSvLoading(true);
    try {
      const res = await fetch('/api/admin/services', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load services');
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? (data as ServiceItem[]) : []);
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load services'));
    } finally {
      setSvLoading(false);
    }
  }

  function openCreateService() {
    setSvForm({ id: null, icon: '', title: '', description: '', featuresText: '', order: 0, isActive: true });
    setSvModalOpen(true);
  }

  function openEditService(service: ServiceItem) {
    setSvForm({
      id: service.id,
      icon: service.icon || '',
      title: service.title || '',
      description: service.description || '',
      featuresText: stringifyFeatures(service.features),
      order: typeof service.order === 'number' ? service.order : 0,
      isActive: service.isActive !== false,
    });
    setSvModalOpen(true);
  }

  async function saveService() {
    setSvSaving(true);
    try {
      const payload = {
        icon: svForm.icon,
        title: svForm.title,
        description: svForm.description,
        order: Number(svForm.order),
        isActive: Boolean(svForm.isActive),
        features: svForm.featuresText,
      };
      const isEdit = svForm.id != null;
      const url = isEdit ? `/api/admin/services/${svForm.id}` : '/api/admin/services';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }
      setSvModalOpen(false);
      await loadServices();
      toast.success('Saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Save failed'));
    } finally {
      setSvSaving(false);
    }
  }

  async function deleteService(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this service?');
    if (!ok) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadServices();
      toast.success('Deleted');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Delete failed'));
    }
  }

  async function loadHomeFeatures() {
    setHfLoading(true);
    try {
      const res = await fetch('/api/admin/home-features', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load home features');
      }
      const data = await res.json();
      setHomeFeatures(Array.isArray(data) ? (data as HomeFeature[]) : []);
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Failed to load home features'));
    } finally {
      setHfLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === 'homeFeatures') {
      loadHomeFeatures();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'aboutStats') loadAboutStats();
    if (activeTab === 'aboutTeam') {
      void loadAboutTeam();
      void loadAboutIntro();
    }
    if (activeTab === 'services') loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  function openCreateHomeFeature() {
    setHfForm({ id: null, icon: '', title: '', description: '', order: 0, isActive: true });
    setHfModalOpen(true);
  }

  function openEditHomeFeature(feature: HomeFeature) {
    setHfForm({
      id: feature.id,
      icon: feature.icon || '',
      title: feature.title || '',
      description: feature.description || '',
      order: typeof feature.order === 'number' ? feature.order : 0,
      isActive: feature.isActive !== false,
    });
    setHfModalOpen(true);
  }

  async function saveHomeFeature() {
    setHfSaving(true);
    try {
      const payload = {
        icon: hfForm.icon,
        title: hfForm.title,
        description: hfForm.description,
        order: Number(hfForm.order),
        isActive: Boolean(hfForm.isActive),
      };

      const isEdit = hfForm.id != null;
      const url = isEdit ? `/api/admin/home-features/${hfForm.id}` : '/api/admin/home-features';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }

      setHfModalOpen(false);
      await loadHomeFeatures();
      toast.success('Saved');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Save failed'));
    } finally {
      setHfSaving(false);
    }
  }

  async function deleteHomeFeature(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this feature?');
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/home-features/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadHomeFeatures();
      toast.success('Deleted');
    } catch (e: unknown) {
      toast.error(catchMessage(e, 'Delete failed'));
    }
  }

  // Get active tab from URL using useMemo
  const activeTabMemo = useMemo(() => {
    return searchParams.get('tab') || 'overview';
  }, [searchParams]);

  // Ensure sidebar active state uses same tab value (kept for parity with previous implementation)
  // (activeTabMemo isn't strictly required, but avoids behavior change)
  useEffect(() => {
    if (activeTab !== activeTabMemo) setActiveTab(activeTabMemo);
  }, [activeTabMemo, activeTab]);

  return (
    <>
      {/* ==================== AUTH CHECK [SEARCH: AUTH, PROTECT] ==================== */}
      {typeof window !== 'undefined' && <AuthRedirect />}

      {/* ==================== STATS CARDS SECTION [SEARCH: STATS, CARDS, OVERVIEW] ==================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass p-6 rounded-2xl">
              {/* Stat Display */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className="text-4xl" aria-label={`${stat.label} icon`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== TAB CONTENT SECTION [SEARCH: CONTENT, TAB-CONTENT, MANAGEMENT] ==================== */}
      <div className="glass p-8 rounded-2xl">
        {/* ========== OVERVIEW TAB CONTENT ========== */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white/70">📈 Your content is performing well. 42 news articles and 24 active products.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white/70">💡 Tip: Keep your content updated regularly for better engagement.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========== HOME FEATURES TAB CONTENT [SEARCH: HOME FEATURES, CRUD, MANAGEMENT] ========== */}
        {activeTab === 'homeFeatures' && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Home Features</h2>
                <p className="text-white/60 text-sm mt-1">Manage the features grid shown on the public home page.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadHomeFeatures()} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                  Refresh
                </button>
                <button onClick={openCreateHomeFeature} className="cta-button px-6 py-2">
                  + Add Feature
                </button>
              </div>
            </div>


            {hfLoading ? (
              <div className="text-white/80">Loading...</div>
            ) : (
              <div className="space-y-3">
                {homeFeatures.length === 0 ? (
                  <div className="bg-white/10 p-4 rounded-lg text-white/70">
                    No features yet. Click “Add Feature” to create the first one.
                  </div>
                ) : (
                  homeFeatures.map((f) => (
                    <div key={f.id} className="bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                      <div className="flex gap-3">
                        <div className="text-3xl leading-none">{f.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-semibold">{f.title}</p>
                            {!f.isActive && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200">
                                Inactive
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                              Order: {f.order}
                            </span>
                          </div>
                          <div
                            className="text-white/70 text-sm mt-1"
                            // Preview embedded HTML/CSS/JS snippets (same behavior as public pages).
                            dangerouslySetInnerHTML={{ __html: f.description || '' }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-1 md:justify-end">
                        <button
                          type="button"
                          onClick={() => openEditHomeFeature(f)}
                          aria-label={`Edit ${f.title}`}
                          className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>✏️</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteHomeFeature(f.id)}
                          aria-label={`Delete ${f.title}`}
                          className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Modal */}
            {hfModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={() => setHfModalOpen(false)} />
                <div className="relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{hfForm.id ? 'Edit Feature' : 'Add Feature'}</h3>
                      <p className="text-white/60 text-sm mt-1">Icon can be emoji (e.g. ⚡) or short text.</p>
                    </div>
                    <button
                      onClick={() => setHfModalOpen(false)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-white/80 text-sm">Icon</span>
                      <input
                        value={hfForm.icon}
                        onChange={(e) => setHfForm((s) => ({ ...s, icon: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="✨"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Order</span>
                      <input
                        type="number"
                        value={hfForm.order}
                        onChange={(e) => setHfForm((s) => ({ ...s, order: Number(e.target.value) }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Title</span>
                      <input
                        value={hfForm.title}
                        onChange={(e) => setHfForm((s) => ({ ...s, title: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Fast Performance"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Description</span>
                      <textarea
                        value={hfForm.description}
                        onChange={(e) => setHfForm((s) => ({ ...s, description: e.target.value }))}
                        rows={4}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Describe the feature..."
                      />
                    </label>
                    <label className="flex items-center gap-3 md:col-span-2 mt-1">
                      <input
                        type="checkbox"
                        checked={hfForm.isActive}
                        onChange={(e) => setHfForm((s) => ({ ...s, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-white/80 text-sm">Active (show on home page)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => setHfModalOpen(false)}
                      className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20"
                      disabled={hfSaving}
                    >
                      Cancel
                    </button>
                    <button onClick={saveHomeFeature} className="cta-button px-6 py-2" disabled={hfSaving}>
                      {hfSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== ABOUT STATS TAB CONTENT [SEARCH: ABOUT STATS, CRUD, MANAGEMENT] ========== */}
        {activeTab === 'aboutStats' && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">About Stats</h2>
                <p className="text-white/60 text-sm mt-1">Manage the statistics cards on the About page.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadAboutStats()} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                  Refresh
                </button>
                <button onClick={openCreateAboutStat} className="cta-button px-6 py-2">
                  + Add Stat
                </button>
              </div>
            </div>


            {asLoading ? (
              <div className="text-white/80">Loading...</div>
            ) : (
              <div className="space-y-3">
                {aboutStats.length === 0 ? (
                  <div className="bg-white/10 p-4 rounded-lg text-white/70">No stats yet.</div>
                ) : (
                  aboutStats.map((s) => (
                    <div key={s.id} className="bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-semibold">{s.number}</p>
                          <span className="text-white/60">—</span>
                          <p className="text-white/80">{s.label}</p>
                          {!s.isActive && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200">
                              Inactive
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                            Order: {s.order}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => openEditAboutStat(s)}
                          aria-label={`Edit ${s.label}`}
                          className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>✏️</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAboutStat(s.id)}
                          aria-label={`Delete ${s.label}`}
                          className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {asModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={() => setAsModalOpen(false)} />
                <div className="relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{asForm.id ? 'Edit Stat' : 'Add Stat'}</h3>
                      <p className="text-white/60 text-sm mt-1">Example: “150+” — “Projects Completed”.</p>
                    </div>
                    <button
                      onClick={() => setAsModalOpen(false)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-white/80 text-sm">Number</span>
                      <input
                        value={asForm.number}
                        onChange={(e) => setAsForm((x) => ({ ...x, number: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="150+"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Order</span>
                      <input
                        type="number"
                        value={asForm.order}
                        onChange={(e) => setAsForm((x) => ({ ...x, order: Number(e.target.value) }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Label</span>
                      <input
                        value={asForm.label}
                        onChange={(e) => setAsForm((x) => ({ ...x, label: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Projects Completed"
                      />
                    </label>
                    <label className="flex items-center gap-3 md:col-span-2 mt-1">
                      <input
                        type="checkbox"
                        checked={asForm.isActive}
                        onChange={(e) => setAsForm((x) => ({ ...x, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-white/80 text-sm">Active (show on About page)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setAsModalOpen(false)} className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20" disabled={asSaving}>
                      Cancel
                    </button>
                    <button onClick={saveAboutStat} className="cta-button px-6 py-2" disabled={asSaving}>
                      {asSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== ABOUT TEAM TAB CONTENT [SEARCH: ABOUT TEAM, CRUD, MANAGEMENT] ========== */}
        {activeTab === 'aboutTeam' && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">About Team</h2>
                <p className="text-white/60 text-sm mt-1">Edit the About page introduction and team members (public site).</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    void loadAboutTeam();
                    void loadAboutIntro();
                  }}
                  className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30"
                >
                  Refresh
                </button>
                <button onClick={openCreateAboutTeam} className="cta-button px-6 py-2">
                  + Add Member
                </button>
              </div>
            </div>

            <div className="mb-8 glass p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-lg font-bold text-white">About page — introduction</h3>
                <button
                  type="button"
                  onClick={() => void saveAboutIntro()}
                  className="cta-button px-5 py-2 text-sm shrink-0 disabled:opacity-50"
                  disabled={aiIntroSaving || aiIntroLoading || !can('aboutTeam', 'update')}
                >
                  {aiIntroSaving ? 'Saving…' : 'Save introduction'}
                </button>
              </div>
              <p className="text-white/60 text-sm">
                Shown in the top content block on the public About page (above statistics). Use a blank line between paragraphs. The hero image also appears on the Home page (right column of the hero).
              </p>
              {aiIntroLoading ? (
                <div className="text-white/70 text-sm">Loading introduction…</div>
              ) : (
                <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-white/80 text-sm font-medium">Home &amp; About — hero image</p>
                  <p className="text-white/50 text-xs">
                    Use an external URL, upload a new image, or pick from the media library (saved under <code className="text-white/60">/uploads/library/</code>). Leave empty for the default emoji on Home.
                  </p>
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="relative w-28 h-20 rounded-lg border border-white/20 bg-white/5 overflow-hidden shrink-0">
                      {aboutPageIntro.heroImageUrl.trim() ? (
                        <Image
                          src={aboutPageIntro.heroImageUrl.trim()}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="112px"
                          unoptimized={/^https?:\/\//i.test(aboutPageIntro.heroImageUrl.trim())}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/35 text-2xl">🎨</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-48 space-y-2">
                      <label className="block">
                        <span className="text-white/70 text-xs">Image URL</span>
                        <input
                          value={aboutPageIntro.heroImageUrl}
                          onChange={(e) => setAboutPageIntro((x) => ({ ...x, heroImageUrl: e.target.value }))}
                          readOnly={!can('aboutTeam', 'update')}
                          className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                          placeholder="https://… or /uploads/library/…"
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => void openHeroIntroImageLibrary()}
                          disabled={!can('aboutTeam', 'update') || !can('media', 'read')}
                          className="bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 disabled:opacity-40 disabled:pointer-events-none"
                        >
                          Select from uploaded
                        </button>
                        <label
                          className={`inline-flex items-center gap-2 bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 cursor-pointer ${
                            !can('aboutTeam', 'update') || !can('media', 'create') || heroIntroImageUploading
                              ? 'opacity-40 pointer-events-none'
                              : ''
                          }`}
                        >
                          <input
                            ref={heroIntroImageFileRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            disabled={
                              heroIntroImageUploading || !can('aboutTeam', 'update') || !can('media', 'create')
                            }
                            onChange={(e) => void uploadHeroIntroImage(e.target.files?.[0] ?? null)}
                          />
                          {heroIntroImageUploading ? 'Uploading…' : 'Upload file'}
                        </label>
                      </div>
                      {(!can('media', 'read') || !can('media', 'create')) && can('aboutTeam', 'update') && (
                        <p className="text-amber-200/80 text-xs">
                          Upload and library need <span className="text-white/90">Media</span> permissions (read / create) in your role.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-white/70 text-xs">Alt text (English)</span>
                      <input
                        value={aboutPageIntro.heroImageAltEn}
                        onChange={(e) => setAboutPageIntro((x) => ({ ...x, heroImageAltEn: e.target.value }))}
                        readOnly={!can('aboutTeam', 'update')}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/70 text-xs">Alt text (Tiếng Việt)</span>
                      <input
                        value={aboutPageIntro.heroImageAltVi}
                        onChange={(e) => setAboutPageIntro((x) => ({ ...x, heroImageAltVi: e.target.value }))}
                        readOnly={!can('aboutTeam', 'update')}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-white/80 text-sm font-medium">English</p>
                    <label className="block">
                      <span className="text-white/70 text-xs">Section title</span>
                      <input
                        value={aboutPageIntro.titleEn}
                        onChange={(e) => setAboutPageIntro((x) => ({ ...x, titleEn: e.target.value }))}
                        readOnly={!can('aboutTeam', 'update')}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                      />
                    </label>
                    <div className="block">
                      <span className="text-white/70 text-xs">Body (rich text)</span>
                      <div className="mt-1 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e]">
                        <AdminTinyMceEditor
                          id="about-intro-body-en"
                          value={aboutPageIntro.bodyEn}
                          onChange={(html) => setAboutPageIntro((x) => ({ ...x, bodyEn: html }))}
                          disabled={!can('aboutTeam', 'update')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white/80 text-sm font-medium">Tiếng Việt</p>
                    <label className="block">
                      <span className="text-white/70 text-xs">Tiêu đề mục</span>
                      <input
                        value={aboutPageIntro.titleVi}
                        onChange={(e) => setAboutPageIntro((x) => ({ ...x, titleVi: e.target.value }))}
                        readOnly={!can('aboutTeam', 'update')}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                      />
                    </label>
                    <div className="block">
                      <span className="text-white/70 text-xs">Nội dung (định dạng rich text)</span>
                      <div className="mt-1 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e]">
                        <AdminTinyMceEditor
                          id="about-intro-body-vi"
                          value={aboutPageIntro.bodyVi}
                          onChange={(html) => setAboutPageIntro((x) => ({ ...x, bodyVi: html }))}
                          disabled={!can('aboutTeam', 'update')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            {atLoading ? (
              <div className="text-white/80">Loading...</div>
            ) : (
              <div className="space-y-3">
                {aboutTeam.length === 0 ? (
                  <div className="bg-white/10 p-4 rounded-lg text-white/70">No team members yet.</div>
                ) : (
                  aboutTeam.map((m) => (
                    <div key={m.id} className="bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                      <div className="flex gap-3">
                        <div className="text-3xl leading-none">{m.emoji}</div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white font-semibold">{m.name}</p>
                            <span className="text-purple-200 text-sm">{m.role}</span>
                            {!m.isActive && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200">
                                Inactive
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                              Order: {m.order}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mt-1">{m.bio}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 md:justify-end">
                        <button
                          type="button"
                          onClick={() => openEditAboutTeam(m)}
                          aria-label={`Edit ${m.name}`}
                          className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>✏️</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAboutTeam(m.id)}
                          aria-label={`Delete ${m.name}`}
                          className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {atModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={() => setAtModalOpen(false)} />
                <div className="relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{atForm.id ? 'Edit Team Member' : 'Add Team Member'}</h3>
                      <p className="text-white/60 text-sm mt-1">Emoji is the avatar icon.</p>
                    </div>
                    <button
                      onClick={() => setAtModalOpen(false)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-white/80 text-sm">Emoji</span>
                      <input
                        value={atForm.emoji}
                        onChange={(e) => setAtForm((x) => ({ ...x, emoji: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="👨‍💻"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Order</span>
                      <input
                        type="number"
                        value={atForm.order}
                        onChange={(e) => setAtForm((x) => ({ ...x, order: Number(e.target.value) }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Name</span>
                      <input
                        value={atForm.name}
                        onChange={(e) => setAtForm((x) => ({ ...x, name: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="John Anderson"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Role</span>
                      <input
                        value={atForm.role}
                        onChange={(e) => setAtForm((x) => ({ ...x, role: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="CEO & Founder"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Bio</span>
                      <textarea
                        value={atForm.bio}
                        onChange={(e) => setAtForm((x) => ({ ...x, bio: e.target.value }))}
                        rows={4}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="flex items-center gap-3 md:col-span-2 mt-1">
                      <input
                        type="checkbox"
                        checked={atForm.isActive}
                        onChange={(e) => setAtForm((x) => ({ ...x, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-white/80 text-sm">Active (show on About page)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setAtModalOpen(false)} className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20" disabled={atSaving}>
                      Cancel
                    </button>
                    <button onClick={saveAboutTeam} className="cta-button px-6 py-2" disabled={atSaving}>
                      {atSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {heroIntroImageLibraryOpen &&
              typeof document !== 'undefined' &&
              createPortal(
                <div
                  className="fixed inset-0 z-100 flex min-h-dvh w-full items-center justify-center p-4 sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="hero-intro-picker-title"
                >
                  <div
                    className="absolute inset-0 bg-black/70"
                    aria-hidden
                    onClick={() => setHeroIntroImageLibraryOpen(false)}
                  />
                  <div className="relative z-10 mx-auto w-full max-w-2xl max-h-[min(85vh,100dvh-2rem)] shrink-0 flex flex-col rounded-2xl border border-white/15 bg-[#12121a] shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                      <h2 id="hero-intro-picker-title" className="text-lg font-semibold text-white">
                        Pick hero image
                      </h2>
                      <button
                        type="button"
                        onClick={() => setHeroIntroImageLibraryOpen(false)}
                        className="text-white/70 hover:text-white px-2 py-1 rounded"
                      >
                        Close
                      </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                      {heroIntroImageLibraryLoading ? (
                        <p className="text-white/60 text-sm">Loading…</p>
                      ) : heroIntroImageLibraryList.length === 0 ? (
                        <p className="text-white/60 text-sm">
                          No images in the library yet. Upload files in the Media tab first.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {heroIntroImageLibraryList.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => pickHeroIntroImageFromLibrary(m)}
                              className="relative aspect-square rounded-lg border border-white/20 overflow-hidden hover:ring-2 hover:ring-white/40"
                            >
                              <Image
                                src={m.url}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="120px"
                                unoptimized={/^https?:\/\//i.test(m.url)}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>,
                document.body,
              )}
          </div>
        )}

        {/* ========== SERVICES TAB CONTENT [SEARCH: SERVICES, CRUD, MANAGEMENT] ========== */}
        {activeTab === 'services' && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Services</h2>
                <p className="text-white/60 text-sm mt-1">Manage service cards shown on the Services page.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadServices()} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                  Refresh
                </button>
                <button onClick={openCreateService} className="cta-button px-6 py-2">
                  + Add Service
                </button>
              </div>
            </div>


            {svLoading ? (
              <div className="text-white/80">Loading...</div>
            ) : (
              <div className="space-y-3">
                {services.length === 0 ? (
                  <div className="bg-white/10 p-4 rounded-lg text-white/70">No services yet.</div>
                ) : (
                  services.map((s) => (
                    <div key={s.id} className="bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                      <div className="flex gap-3">
                        <div className="text-3xl leading-none">{s.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white font-semibold">{s.title}</p>
                            {!s.isActive && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200">
                                Inactive
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                              Order: {s.order}
                            </span>
                          </div>
                          <div
                            className="text-white/70 text-sm mt-1"
                            // Preview embedded HTML/CSS/JS snippets (same behavior as public pages).
                            dangerouslySetInnerHTML={{ __html: s.description || '' }}
                          />
                          {stringifyFeatures(s.features).trim() && (
                            <p className="text-white/50 text-sm mt-2 whitespace-pre-line">{stringifyFeatures(s.features)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 md:justify-end">
                        <button
                          type="button"
                          onClick={() => openEditService(s)}
                          aria-label={`Edit ${s.title}`}
                          className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>✏️</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteService(s.id)}
                          aria-label={`Delete ${s.title}`}
                          className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = '';
                          }}
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {svModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={() => setSvModalOpen(false)} />
                <div className="relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{svForm.id ? 'Edit Service' : 'Add Service'}</h3>
                      <p className="text-white/60 text-sm mt-1">Enter one feature per line.</p>
                    </div>
                    <button
                      onClick={() => setSvModalOpen(false)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-white/80 text-sm">Icon</span>
                      <input
                        value={svForm.icon}
                        onChange={(e) => setSvForm((x) => ({ ...x, icon: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="🎨"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Order</span>
                      <input
                        type="number"
                        value={svForm.order}
                        onChange={(e) => setSvForm((x) => ({ ...x, order: Number(e.target.value) }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Title</span>
                      <input
                        value={svForm.title}
                        onChange={(e) => setSvForm((x) => ({ ...x, title: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Description</span>
                      <textarea
                        value={svForm.description}
                        onChange={(e) => setSvForm((x) => ({ ...x, description: e.target.value }))}
                        rows={3}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-white/80 text-sm">Features</span>
                      <textarea
                        value={svForm.featuresText}
                        onChange={(e) => setSvForm((x) => ({ ...x, featuresText: e.target.value }))}
                        rows={5}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder={'Feature 1\nFeature 2\nFeature 3'}
                      />
                    </label>
                    <label className="flex items-center gap-3 md:col-span-2 mt-1">
                      <input
                        type="checkbox"
                        checked={svForm.isActive}
                        onChange={(e) => setSvForm((x) => ({ ...x, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-white/80 text-sm">Active (show on Services page)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setSvModalOpen(false)} className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20" disabled={svSaving}>
                      Cancel
                    </button>
                    <button onClick={saveService} className="cta-button px-6 py-2" disabled={svSaving}>
                      {svSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== USERS TAB CONTENT [SEARCH: USERS, ROLES, MANAGEMENT] ========== */}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="text-2xl font-bold text-white shrink-0">User Management</h2>
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full lg:w-auto lg:justify-end">
                  <label className="flex flex-col gap-1.5 min-w-0 sm:min-w-48">
                    <span className="text-white/70 text-xs font-medium uppercase tracking-wide">Role filter</span>
                    <select
                      value={userManagementRoleFilter}
                      onChange={(e) => setUserManagementRoleFilter(e.target.value)}
                      disabled={rolesLoading || !roles.length}
                      className="bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Filter users by role"
                    >
                      <option value="" className="bg-gray-800 text-white">
                        All roles
                      </option>
                      {rolesSortedByName.map((r) => (
                        <option key={r.id} value={String(r.id)} className="bg-gray-800 text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {can('users', 'create') && (
                    <button type="button" onClick={() => void openAddUserModal()} className="cta-button px-6 py-2 shrink-0">
                      + Add User
                    </button>
                  )}
                </div>
              </div>
            </div>

            {!permsLoading && can('users', 'read') && (
              <p className="text-white/60 text-sm mb-4">
                Role and active flag use <span className="text-white/80">Users → Update</span>. Password reset uses{' '}
                <span className="text-white/80">User password → Update</span>.
              </p>
            )}

            {usersLoading || rolesLoading ? (
              <div className="text-white/80">Loading...</div>
            ) : (
              <div className="space-y-3">
                {usersFilteredForManagement.length === 0 ? (
                  <p className="text-white/60 text-sm py-6">
                    {userManagementRoleFilter === ''
                      ? 'No users yet.'
                      : 'No users with this role. Choose another filter or All roles.'}
                  </p>
                ) : null}
                {usersFilteredForManagement.map((user) => {
                  const roleName = roles.find((r) => r.id === user.roleId)?.name || String(user.roleId);
                  const isSysadminRow = roleName.toUpperCase() === 'SYSADMIN';
                  const inactiveRow = !user.isActive;
                  const opRoleName = sessionMe?.role?.name ?? '';
                  const opIsSysadminOperator = opRoleName.toUpperCase() === 'SYSADMIN';
                  const sameRoleLevelAsOperator =
                    sessionMe != null &&
                    (user.id === sessionMe.id || getRoleRank(opRoleName) === getRoleRank(roleName));
                  const cannotChangeActiveStatus = !opIsSysadminOperator && sameRoleLevelAsOperator;
                  const canEditUser = can('users', 'update');
                  const canResetPassword = can('userPassword', 'update');
                  const canDeleteUser = can('users', 'delete');
                  return (
                    <div
                      key={user.id}
                      className="bg-white/15 border border-white/20 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3 shadow-md"
                    >
                      <div>
                        <p className="text-white font-semibold text-base">{user.email}</p>
                        {user.displayName ? (
                          <p className="text-white/90 text-sm mt-0.5">{user.displayName}</p>
                        ) : null}
                        <p className="text-white/80 text-sm mt-1">Role: {roleName}</p>
                        {inactiveRow ? (
                          <p className="text-amber-200/90 text-xs mt-1.5 font-medium">
                            Sign-in disabled — account is inactive
                          </p>
                        ) : null}
                      </div>

                      <div className="flex gap-2 items-center flex-wrap justify-end">
                        {/* 1. Active | Inactive */}
                        <div
                          className={`inline-flex rounded-lg border border-white/30 overflow-hidden text-xs sm:text-sm font-medium shadow-sm ${
                            !canEditUser || cannotChangeActiveStatus ? 'opacity-50' : ''
                          }`}
                          role="group"
                          aria-label="Account status"
                          title={
                            cannotChangeActiveStatus
                              ? 'Only SYSADMIN can change active status for you or users at your role level'
                              : undefined
                          }
                        >
                          <button
                            type="button"
                            disabled={!canEditUser || cannotChangeActiveStatus}
                            onClick={async () => {
                              if (user.isActive) return;
                              const res = await fetch(`/api/admin/users/${user.id}`, {
                                method: 'PUT',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ isActive: true }),
                              });
                              if (!res.ok) {
                                const data = await res.json().catch(() => ({}));
                                toast.error((data as { error?: string })?.error || 'Update failed');
                                return;
                              }
                              await loadUsers();
                            }}
                            className={`px-3 py-2 min-w-18 transition-colors ${
                              user.isActive
                                ? 'bg-emerald-500/35 text-emerald-50 border-r border-white/20'
                                : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                            }`}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            disabled={!canEditUser || isSysadminRow || cannotChangeActiveStatus}
                            title={
                              cannotChangeActiveStatus
                                ? 'Only SYSADMIN can change active status for you or users at your role level'
                                : isSysadminRow
                                  ? 'SYSADMIN account cannot be set inactive from here'
                                  : undefined
                            }
                            onClick={async () => {
                              if (!user.isActive) return;
                              const res = await fetch(`/api/admin/users/${user.id}`, {
                                method: 'PUT',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ isActive: false }),
                              });
                              if (!res.ok) {
                                const data = await res.json().catch(() => ({}));
                                toast.error((data as { error?: string })?.error || 'Update failed');
                                return;
                              }
                              await loadUsers();
                            }}
                            className={`px-3 py-2 min-w-18 transition-colors ${
                              !user.isActive
                                ? 'bg-red-500/30 text-red-100'
                                : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            Inactive
                          </button>
                        </div>

                        {/* 2. User role */}
                        <select
                          value={user.roleId}
                          disabled={!canEditUser || isSysadminRow || inactiveRow}
                          title={
                            inactiveRow
                              ? 'Activate the account before changing role'
                              : isSysadminRow
                                ? 'SYSADMIN role cannot be changed here'
                                : undefined
                          }
                          onChange={async (e) => {
                            const roleId = Number(e.target.value);
                            const res = await fetch(`/api/admin/users/${user.id}`, {
                              method: 'PUT',
                              credentials: 'include',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ roleId }),
                            });
                            if (!res.ok) {
                              const data = await res.json().catch(() => ({}));
                              toast.error((data as { error?: string })?.error || 'Role update failed');
                              return;
                            }
                            await loadUsers();
                          }}
                          className="bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="User role"
                        >
                          {roles.map((r) => (
                            <option key={r.id} value={r.id} className="bg-gray-800 text-white">
                              {r.name}
                            </option>
                          ))}
                        </select>

                        {/* 3. Permissions */}
                        {can('permissions', 'read') && (
                          <button
                            type="button"
                            disabled={isSysadminRow || inactiveRow}
                            title={
                              inactiveRow
                                ? 'Activate the account before opening permissions'
                                : isSysadminRow
                                  ? 'SYSADMIN permissions are fixed'
                                  : undefined
                            }
                            onClick={() => {
                              if (isSysadminRow || inactiveRow) return;
                              window.location.href = `/admin/dashboard?tab=permissions&userId=${user.id}`;
                            }}
                            className={`bg-white/25 border border-white/30 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-sm ${
                              isSysadminRow || inactiveRow
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/35 hover:border-white/40'
                            }`}
                          >
                            Permissions
                          </button>
                        )}

                        {/* 4. Reset password */}
                        <button
                          type="button"
                          disabled={!canResetPassword || inactiveRow}
                          title={inactiveRow ? 'Activate the account before resetting password' : undefined}
                          onClick={async () => {
                            const pw = window.prompt('New password for this user:');
                            if (!pw) return;
                            const res = await fetch(`/api/admin/users/${user.id}`, {
                              method: 'PUT',
                              credentials: 'include',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ password: pw }),
                            });
                            if (!res.ok) {
                              const data = await res.json().catch(() => ({}));
                              toast.error((data as { error?: string })?.error || 'Reset failed');
                              return;
                            }
                            toast.success('Password updated.');
                          }}
                          className={`bg-amber-500/25 border border-amber-400/40 text-amber-50 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/35 transition-all ${
                            !canResetPassword || inactiveRow ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Reset password
                        </button>

                        {/* 5. Delete */}
                        <button
                          type="button"
                          onClick={async () => {
                            const res = await fetch(`/api/admin/users/${user.id}`, {
                              method: 'DELETE',
                              credentials: 'include',
                            });
                            if (res.ok) await loadUsers();
                          }}
                          disabled={user.isProtected || !canDeleteUser || isSysadminRow}
                          title={isSysadminRow ? 'SYSADMIN cannot be deleted' : undefined}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            user.isProtected || !canDeleteUser || isSysadminRow
                              ? 'bg-gray-700/40 border border-gray-600/30 text-gray-300 cursor-not-allowed'
                              : 'bg-red-500/30 border border-red-400/40 text-red-100 hover:bg-red-500/40 hover:border-red-400/50 shadow-sm'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {addUserModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={closeAddUserModal} aria-hidden />
                <div
                  className="relative w-full max-w-md glass p-6 rounded-2xl border border-white/10"
                  role="dialog"
                  aria-labelledby="add-user-title"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 id="add-user-title" className="text-xl font-bold text-white">
                        Add new user
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        Creates an account that can sign in to the admin area. Feature permissions default to the template
                        for the role you select below.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeAddUserModal}
                      disabled={addUserSaving}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded disabled:opacity-50"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void submitAddUser();
                    }}
                  >
                    <label className="block">
                      <span className="text-white/80 text-sm">Email</span>
                      <input
                        type="email"
                        autoComplete="off"
                        value={addUserForm.email}
                        onChange={(e) => setAddUserForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="user@example.com"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Password</span>
                      <input
                        type="password"
                        autoComplete="new-password"
                        value={addUserForm.password}
                        onChange={(e) => setAddUserForm((f) => ({ ...f, password: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Initial password"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Display name (optional)</span>
                      <input
                        type="text"
                        value={addUserForm.displayName}
                        onChange={(e) => setAddUserForm((f) => ({ ...f, displayName: e.target.value }))}
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Shown in the admin UI"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/80 text-sm">Role</span>
                      <p className="text-white/45 text-xs mt-0.5 mb-1">
                        Default feature permissions for this role are applied when the user is created.
                      </p>
                      <select
                        value={addUserForm.roleId === '' ? '' : String(addUserForm.roleId)}
                        onChange={(e) =>
                          setAddUserForm((f) => ({
                            ...f,
                            roleId: e.target.value === '' ? '' : Number(e.target.value),
                          }))
                        }
                        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                        aria-label="Role for new user"
                      >
                        {roles.length === 0 ? (
                          <option value="" className="bg-gray-800 text-white">
                            No roles loaded
                          </option>
                        ) : (
                          roles.map((r) => (
                            <option key={r.id} value={r.id} className="bg-gray-800 text-white">
                              {r.name}
                            </option>
                          ))
                        )}
                      </select>
                    </label>

                    <div className="block">
                      <span className="text-white/80 text-sm">Account status</span>
                      <div
                        className="mt-2 inline-flex w-full max-w-sm rounded-lg border border-white/30 overflow-hidden text-sm font-medium shadow-sm"
                        role="group"
                        aria-label="Account status for new user"
                      >
                        <button
                          type="button"
                          onClick={() => setAddUserForm((f) => ({ ...f, isActive: true }))}
                          className={`flex-1 px-3 py-2 transition-colors ${
                            addUserForm.isActive
                              ? 'bg-emerald-500/35 text-emerald-50 border-r border-white/20'
                              : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                          }`}
                        >
                          Active
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddUserForm((f) => ({ ...f, isActive: false }))}
                          className={`flex-1 px-3 py-2 transition-colors ${
                            !addUserForm.isActive
                              ? 'bg-red-500/30 text-red-100'
                              : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                          }`}
                        >
                          Inactive
                        </button>
                      </div>
                      <p className="text-white/50 text-xs mt-1.5">
                        Inactive accounts cannot sign in until someone sets them to Active.
                      </p>
                    </div>


                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={closeAddUserModal}
                        className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20"
                        disabled={addUserSaving}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="cta-button px-6 py-2" disabled={addUserSaving || roles.length === 0}>
                        {addUserSaving ? 'Creating…' : 'Create user'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== PERMISSIONS TAB CONTENT [SEARCH: PERMISSION FEATURES] ========== */}
        {activeTab === 'permissions' && (
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Permission Features</h2>
              <div className="text-white/60 text-sm">
                {can('permissions', 'update')
                  ? 'Click a user row to edit CRUD per feature. Users = list/create/role/active; User password = reset password.'
                  : 'View only — you need permissions.update to change checkboxes.'}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-80 flex flex-col gap-4">
                <div className="space-y-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/70 text-xs font-medium uppercase tracking-wide">Filter by role</span>
                    <select
                      value={permissionsTabRoleFilter}
                      onChange={(e) => setPermissionsTabRoleFilter(e.target.value)}
                      disabled={usersLoading || rolesLoading || !roles.length}
                      className="w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Filter permission users by role"
                    >
                      <option value="" className="bg-gray-800 text-white">
                        All roles
                      </option>
                      {rolesSortedByName.map((r) => (
                        <option key={r.id} value={String(r.id)} className="bg-gray-800 text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/70 text-xs font-medium uppercase tracking-wide">Filter by user</span>
                    <select
                      value={permissionsTabUserFilterValid ? permissionsTabUserFilter : ''}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPermissionsTabUserFilter(v);
                        if (v === '') return;
                        const id = Number(v);
                        if (!Number.isFinite(id)) return;
                        setSelectedPermissionUserId(id);
                      }}
                      disabled={usersLoading || rolesLoading || usersMatchingPermissionsRoleFilter.length === 0}
                      className="w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Filter permission users by name"
                    >
                      <option value="" className="bg-gray-800 text-white">
                        All users
                      </option>
                      {usersMatchingPermissionsRoleFilter.map((u) => {
                        const d = (u.displayName ?? '').trim();
                        const line =
                          d && d.toLowerCase() !== u.email.toLowerCase()
                            ? `${d} (${u.email})`
                            : u.email;
                        return (
                          <option key={u.id} value={String(u.id)} className="bg-gray-800 text-white">
                            {!u.isActive ? `${line} — Inactive` : line}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>

                <div className="space-y-2">
                  {usersForPermissionsChooserList.length === 0 ? (
                    <p className="text-white/55 text-sm py-2">No users match these filters.</p>
                  ) : null}
                  {usersForPermissionsChooserList.map((user) => {
                    const isSelected = user.id === selectedPermissionUserId;
                    const roleName = roles.find((r) => r.id === user.roleId)?.name || String(user.roleId);
                    const permUserInactive = !user.isActive;
                    return (
                      <button
                        key={user.id}
                        type="button"
                        disabled={permUserInactive}
                        title={permUserInactive ? 'Activate the user before editing permissions' : undefined}
                        onClick={() => {
                          if (permUserInactive) return;
                          setSelectedPermissionUserId(user.id);
                        }}
                        className={`w-full text-left p-4 rounded-lg border transition-all shadow-sm ${
                          permUserInactive
                            ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10 text-white/50'
                            : isSelected
                              ? 'bg-white/20 border-white/30 text-white'
                              : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{permissionChooserUserLabel(user)}</p>
                            <p className="text-sm text-white/70 mt-0.5">{user.email}</p>
                            <p className="text-sm text-white/70 mt-1">Role: {roleName}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            {permUserInactive && (
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-100">
                                Inactive
                              </span>
                            )}
                            {user.isProtected && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200">
                                Protected
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1">
                {!selectedPermissionUserId ? (
                  <div className="bg-white/10 border border-white/15 rounded-xl p-6 text-white/70">
                    Select a user to edit permissions.
                  </div>
                ) : (
                  <div className="bg-white/10 border border-white/15 rounded-xl p-4">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
                      <div>
                        <div className="text-white font-semibold">
                          Editing: {selectedPermissionUser?.email || 'User'}
                        </div>
                        <div className="text-white/60 text-sm mt-1">
                          SYSADMIN cannot be changed (protected).
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={toggleSelectAllPermissions}
                          className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium border border-white/25 hover:bg-white/30"
                          disabled={
                            permissionsLoading ||
                            permissionsSaving ||
                            permissionsResetting ||
                            selectedPermissionUser?.isProtected === true ||
                            !can('permissions', 'update')
                          }
                          title={
                            allPermissionCheckboxesSelected
                              ? 'Clear every permission checkbox (save to apply)'
                              : 'Select every permission checkbox (save to apply)'
                          }
                        >
                          {allPermissionCheckboxesSelected ? 'Deselect all' : 'Select all'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedPermissionUserId != null) {
                              void resetPermissionMatrixToDefaults(selectedPermissionUserId);
                            }
                          }}
                          className="bg-amber-500/25 border border-amber-400/35 text-amber-50 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/35"
                          disabled={
                            permissionsLoading ||
                            permissionsSaving ||
                            permissionsResetting ||
                            selectedPermissionUser?.isProtected === true ||
                            !can('permissions', 'update')
                          }
                          title="Replace custom User permissions with the template for this user’s current role"
                        >
                          {permissionsResetting ? 'Resetting...' : 'Default permissions'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedPermissionUserId != null) savePermissionMatrix(selectedPermissionUserId);
                          }}
                          className="cta-button px-6 py-2"
                          disabled={
                            permissionsLoading ||
                            permissionsSaving ||
                            permissionsResetting ||
                            selectedPermissionUser?.isProtected === true ||
                            !can('permissions', 'update')
                          }
                        >
                          {permissionsSaving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>

                    {permissionsLoading ? (
                      <div className="text-white/80">Loading permissions...</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] border-separate border-spacing-0">
                          <thead>
                            <tr className="text-left">
                              <th className="py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15">Feature</th>
                              <th className="py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15">Create</th>
                              <th className="py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15">Read</th>
                              <th className="py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15">Update</th>
                              <th className="py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {features.map((f) => (
                              <tr key={f.id} className="hover:bg-white/5">
                                <td className="py-3 px-3 border-b border-white/10">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl shrink-0">{f.icon}</span>
                                    <span className="text-white font-medium">{f.label}</span>
                                  </div>
                                </td>
                                {(['create', 'read', 'update', 'delete'] as const).map((action) => {
                                  const checked = Boolean(permissionMatrix?.[f.id]?.[action]);
                                  const disabled =
                                    selectedPermissionUser?.isProtected === true || !can('permissions', 'update');
                                  return (
                                    <td key={action} className="py-3 px-3 border-b border-white/10">
                                      <label
                                        className={`inline-flex items-center gap-2 ${
                                          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          disabled={disabled || permissionsSaving || permissionsResetting}
                                          onChange={(e) => {
                                            const value = e.target.checked;
                                            setPermissionMatrix((prev) => ({
                                              ...prev,
                                              [f.id]: { ...prev[f.id], [action]: value },
                                            }));
                                          }}
                                          className="w-4 h-4"
                                        />
                                        <span className="text-white/70 text-sm">{action.toUpperCase().slice(0, 1)}</span>
                                      </label>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Placeholder content for other tabs to preserve existing UI */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <button className="cta-button px-6 py-2">+ Add Product</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Product {i}</p>
                    <p className="text-white/50 text-sm">Status: Active</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                      aria-label="Edit Product"
                    >
                      <span aria-hidden>✏️</span>
                    </button>
                    <button
                      type="button"
                      className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                      aria-label="Delete Product"
                    >
                      <span aria-hidden>🗑️</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <NewsAdminPanel />
        )}

        {activeTab === 'media' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Media Library</h2>
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-white/70 text-sm whitespace-nowrap">
                  Subfolder
                  <input
                    type="text"
                    value={mediaFolder}
                    onChange={(e) => setMediaFolder(e.target.value)}
                    placeholder="library"
                    className="ml-2 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm w-36"
                    disabled={!can('media', 'create')}
                  />
                </label>
                <input
                  ref={mediaFileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,video/mp4,video/webm"
                  onChange={(e) => void uploadMediaFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  className="cta-button px-6 py-2 disabled:opacity-50"
                  disabled={!can('media', 'create') || mediaUploading}
                  onClick={() => mediaFileInputRef.current?.click()}
                >
                  {mediaUploading ? 'Uploading…' : '+ Upload Media'}
                </button>
              </div>
            </div>
            {mediaLoading ? (
              <p className="text-white/60">Loading…</p>
            ) : mediaList.length === 0 ? (
              <p className="text-white/50">No files yet. Uploads are stored under <code className="text-white/70">public/uploads/&lt;subfolder&gt;/</code>.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mediaList.map((m) => (
                  <div
                    key={m.id}
                    className="relative bg-white/10 p-3 rounded-lg text-center overflow-hidden group"
                  >
                    {(can('media', 'update') || can('media', 'delete')) && (
                      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {can('media', 'update') && (
                          <button
                            type="button"
                            aria-label={`Edit media ${m.filename}`}
                            className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.animation = '';
                            }}
                            onClick={() => window.open(m.url, '_blank', 'noopener,noreferrer')}
                          >
                            <span aria-hidden>✏️</span>
                          </button>
                        )}
                        {can('media', 'delete') && (
                          <button
                            type="button"
                            aria-label={`Delete media ${m.filename}`}
                            className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.animation = '';
                            }}
                            onClick={async () => {
                              const ok = window.confirm('Delete this media item?');
                              if (!ok) return;
                              setMediaLoading(true);
                              try {
                                const res = await fetch(`/api/admin/media/${m.id}`, {
                                  method: 'DELETE',
                                  credentials: 'include',
                                });
                                if (!res.ok) {
                                  if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                                  const data = await res.json().catch(() => ({}));
                                  throw new Error(data?.error || 'Delete failed');
                                }
                                toast.success('Deleted');

                                const ref = await fetch('/api/admin/media?take=100&imagesOnly=0', {
                                  credentials: 'include',
                                });
                                const refData = await ref.json().catch(() => null);
                                if (Array.isArray(refData)) setMediaList(refData as MediaLibraryRow[]);
                              } catch (e: unknown) {
                                const msg = e instanceof Error ? e.message : 'Delete failed';
                                toast.error(msg);
                              } finally {
                                setMediaLoading(false);
                              }
                            }}
                          >
                            <span aria-hidden>🗑️</span>
                          </button>
                        )}
                      </div>
                    )}
                    <div
                      className={`aspect-square relative mb-2 bg-black/20 rounded overflow-hidden ${
                        m.mimeType.startsWith('image/') ? '' : 'flex items-center justify-center'
                      }`}
                    >
                      {m.mimeType.startsWith('image/') ? (
                        <Image
                          src={m.url}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <span className="text-4xl">
                          {m.mimeType.includes('pdf')
                            ? '📄'
                            : m.mimeType.startsWith('video/')
                              ? '🎬'
                              : '📎'}
                        </span>
                      )}
                    </div>
                    <p className="text-white/80 text-xs truncate" title={m.filename}>
                      {m.filename}
                    </p>
                    <p className="text-white/40 text-[10px] truncate">{m.folder}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'banners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Banner Sliders</h2>
              <button className="cta-button px-6 py-2">+ Create Banner</button>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Banner Slider {i}</p>
                    <p className="text-white/50 text-sm">3 slides</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                      aria-label={`Edit Banner Slider ${i}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                    >
                      <span aria-hidden>✏️</span>
                    </button>
                    <button
                      type="button"
                      className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors transform-gpu"
                      aria-label={`Delete Banner Slider ${i}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                    >
                      <span aria-hidden>🗑️</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-medium">User {i}</p>
                      <p className="text-white/50 text-sm">user{i}@example.com</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">New</span>
                  </div>
                  <p className="text-white/70">This is a contact message from the user...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

