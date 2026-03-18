'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Small client-side auth redirect component
function AuthRedirect() {
  useEffect(() => {
    try {
      // Try to access a protected API; if 401, redirect to login
      fetch('/api/admin/users', { credentials: 'include' }).then((res) => {
        if (!res.ok) {
          window.location.href = '/admin/login';
        }
      });
    } catch (err) {
      // ignore
    }
  }, []);
  return null;
}

export default function DashboardClient() {
  const searchParams = useSearchParams();

  // ==================== STATE MANAGEMENT [SEARCH: STATE, TAB] ====================
  const [activeTab, setActiveTab] = useState('overview');

  type AdminRole = { id: string; name: string };
  type AdminUser = { id: number; email: string; role: string; isProtected: boolean };
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

  // Sync activeTab with URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab') || 'overview';
    setActiveTab(tab);
  }, [searchParams]);

  // ==================== STATISTICS CONFIG [SEARCH: STATS, DATA] ====================
  const stats = [
    { label: 'Total Products', value: '24', icon: '📦' },
    { label: 'Total News', value: '42', icon: '📰' },
    { label: 'Total Users', value: '8', icon: '👥' },
    { label: 'Contact Messages', value: '15', icon: '💬' },
  ];

  // ==================== TAB CONFIGURATION [SEARCH: TABS, MENU, NAV] ====================
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'homeFeatures', label: 'Home Features', icon: '🏠' },
    { id: 'aboutStats', label: 'About Stats', icon: '📈' },
    { id: 'aboutTeam', label: 'About Team', icon: '👤' },
    { id: 'services', label: 'Services', icon: '🧩' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'banners', label: 'Banners', icon: '🎬' },
    { id: 'contacts', label: 'Contacts', icon: '💬' },
  ];

  // ==================== AUTHZ SAMPLE DATA [SEARCH: USERS, ROLES, PERMISSIONS] ====================
  const initialRoles: AdminRole[] = [
    { id: 'SYSADMIN', name: 'SYSADMIN' },
    { id: 'ADMIN', name: 'ADMIN' },
    { id: 'EDITOR', name: 'EDITOR' },
  ];

  const initialPermissions = [
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'site.manage',
    'full_control',
  ];

  const [roles] = useState<AdminRole[]>(initialRoles);
  const [permissions] = useState<string[]>(initialPermissions);

  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const s = localStorage.getItem('admin_users');
        if (s) return JSON.parse(s) as AdminUser[];
      }
    } catch (err) {}
    return [
      {
        id: 1,
        email: 'vuleitsolution@gmail.com',
        role: 'SYSADMIN',
        isProtected: true,
      },
    ];
  });

  const [userPermissions, setUserPermissions] = useState<Record<string, string[]>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const s = localStorage.getItem('admin_user_permissions');
        if (s) return JSON.parse(s) as Record<string, string[]>;
      }
    } catch (err) {}
    return {
      'vuleitsolution@gmail.com': [...initialPermissions],
    };
  });

  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(users[0]?.email || null);

  // ==================== HOME FEATURES STATE [SEARCH: HOME FEATURES, CRUD] ====================
  const [homeFeatures, setHomeFeatures] = useState<HomeFeature[]>([]);
  const [hfLoading, setHfLoading] = useState(false);
  const [hfError, setHfError] = useState<string | null>(null);
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
  const [asError, setAsError] = useState<string | null>(null);
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
    setAsError(null);
    try {
      const res = await fetch('/api/admin/about-stats', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load about stats');
      }
      const data = await res.json();
      setAboutStats(Array.isArray(data) ? (data as AboutStat[]) : []);
    } catch (e: any) {
      setAsError(e?.message || 'Failed to load about stats');
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
    setAsError(null);
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
    } catch (e: any) {
      setAsError(e?.message || 'Save failed');
    } finally {
      setAsSaving(false);
    }
  }

  async function deleteAboutStat(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this stat?');
    if (!ok) return;
    setAsError(null);
    try {
      const res = await fetch(`/api/admin/about-stats/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadAboutStats();
    } catch (e: any) {
      setAsError(e?.message || 'Delete failed');
    }
  }

  // ==================== ABOUT TEAM STATE [SEARCH: ABOUT TEAM, CRUD] ====================
  const [aboutTeam, setAboutTeam] = useState<AboutTeamMember[]>([]);
  const [atLoading, setAtLoading] = useState(false);
  const [atError, setAtError] = useState<string | null>(null);
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

  async function loadAboutTeam() {
    setAtLoading(true);
    setAtError(null);
    try {
      const res = await fetch('/api/admin/about-team', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load about team');
      }
      const data = await res.json();
      setAboutTeam(Array.isArray(data) ? (data as AboutTeamMember[]) : []);
    } catch (e: any) {
      setAtError(e?.message || 'Failed to load about team');
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
    setAtError(null);
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
    } catch (e: any) {
      setAtError(e?.message || 'Save failed');
    } finally {
      setAtSaving(false);
    }
  }

  async function deleteAboutTeam(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this team member?');
    if (!ok) return;
    setAtError(null);
    try {
      const res = await fetch(`/api/admin/about-team/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadAboutTeam();
    } catch (e: any) {
      setAtError(e?.message || 'Delete failed');
    }
  }

  // ==================== SERVICES STATE [SEARCH: SERVICES, CRUD] ====================
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [svLoading, setSvLoading] = useState(false);
  const [svError, setSvError] = useState<string | null>(null);
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
    setSvError(null);
    try {
      const res = await fetch('/api/admin/services', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load services');
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? (data as ServiceItem[]) : []);
    } catch (e: any) {
      setSvError(e?.message || 'Failed to load services');
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
    setSvError(null);
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
    } catch (e: any) {
      setSvError(e?.message || 'Save failed');
    } finally {
      setSvSaving(false);
    }
  }

  async function deleteService(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this service?');
    if (!ok) return;
    setSvError(null);
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadServices();
    } catch (e: any) {
      setSvError(e?.message || 'Delete failed');
    }
  }

  async function loadHomeFeatures() {
    setHfLoading(true);
    setHfError(null);
    try {
      const res = await fetch('/api/admin/home-features', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to load home features');
      }
      const data = await res.json();
      setHomeFeatures(Array.isArray(data) ? (data as HomeFeature[]) : []);
    } catch (e: any) {
      setHfError(e?.message || 'Failed to load home features');
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
    if (activeTab === 'aboutTeam') loadAboutTeam();
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
    setHfError(null);
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
    } catch (e: any) {
      setHfError(e?.message || 'Save failed');
    } finally {
      setHfSaving(false);
    }
  }

  async function deleteHomeFeature(id: number) {
    const ok = typeof window === 'undefined' ? true : window.confirm('Delete this feature?');
    if (!ok) return;

    setHfError(null);
    try {
      const res = await fetch(`/api/admin/home-features/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Delete failed');
      }
      await loadHomeFeatures();
    } catch (e: any) {
      setHfError(e?.message || 'Delete failed');
    }
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_users', JSON.stringify(users));
        localStorage.setItem('admin_user_permissions', JSON.stringify(userPermissions));
      }
    } catch (err) {}
  }, [users, userPermissions]);

  function updateUserRole(email: string, newRole: string) {
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, role: newRole } : u)));
  }

  function toggleUserPermission(email: string, permission: string) {
    setUserPermissions((prev) => {
      const copy = { ...prev };
      const list = new Set(copy[email] || []);
      if (list.has(permission)) list.delete(permission);
      else list.add(permission);
      copy[email] = Array.from(list);
      return copy;
    });
  }

  function deleteUser(email: string) {
    setUsers((prev) => prev.filter((u) => u.email !== email || u.isProtected));
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

            {hfError && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4">{hfError}</div>
            )}

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
                          <p className="text-white/70 text-sm mt-1">{f.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 md:justify-end">
                        <button onClick={() => openEditHomeFeature(f)} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                          Edit
                        </button>
                        <button onClick={() => deleteHomeFeature(f.id)} className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">
                          Delete
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

            {asError && <div className="bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4">{asError}</div>}

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
                      <div className="flex gap-2">
                        <button onClick={() => openEditAboutStat(s)} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                          Edit
                        </button>
                        <button onClick={() => deleteAboutStat(s.id)} className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">
                          Delete
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
                <p className="text-white/60 text-sm mt-1">Manage team members shown on the About page.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadAboutTeam()} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                  Refresh
                </button>
                <button onClick={openCreateAboutTeam} className="cta-button px-6 py-2">
                  + Add Member
                </button>
              </div>
            </div>

            {atError && <div className="bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4">{atError}</div>}

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
                      <div className="flex gap-2 md:justify-end">
                        <button onClick={() => openEditAboutTeam(m)} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                          Edit
                        </button>
                        <button onClick={() => deleteAboutTeam(m.id)} className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">
                          Delete
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

            {svError && <div className="bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4">{svError}</div>}

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
                          <p className="text-white/70 text-sm mt-1">{s.description}</p>
                          {stringifyFeatures(s.features).trim() && (
                            <p className="text-white/50 text-sm mt-2 whitespace-pre-line">{stringifyFeatures(s.features)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 md:justify-end">
                        <button onClick={() => openEditService(s)} className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">
                          Edit
                        </button>
                        <button onClick={() => deleteService(s.id)} className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">
                          Delete
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <button
                onClick={() => {
                  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
                  const newUser = { id: nextId, email: `user${nextId}@example.com`, role: 'EDITOR', isProtected: false };
                  setUsers((s) => [...s, newUser]);
                }}
                className="cta-button px-6 py-2"
              >
                + Add User
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="bg-white/15 border border-white/20 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3 shadow-md"
                >
                  <div>
                    <p className="text-white font-semibold text-base">{user.email}</p>
                    <p className="text-white/80 text-sm mt-1">Role: {user.role}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.email, e.target.value)}
                      className="bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 cursor-pointer"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.name} className="bg-gray-800 text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setSelectedUserEmail(user.email)}
                      className="bg-white/25 border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/35 hover:border-white/40 transition-all font-medium shadow-sm"
                    >
                      Permissions
                    </button>
                    <button
                      onClick={() => deleteUser(user.email)}
                      disabled={user.isProtected}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        user.isProtected
                          ? 'bg-gray-700/40 border border-gray-600/30 text-gray-300 cursor-not-allowed'
                          : 'bg-red-500/30 border border-red-400/40 text-red-100 hover:bg-red-500/40 hover:border-red-400/50 shadow-sm'
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Permissions Matrix */}
            {selectedUserEmail && (
              <div className="pt-6 border-t border-white/20 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Permissions for {selectedUserEmail}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {permissions.map((p) => {
                    const checked = (userPermissions[selectedUserEmail] || []).includes(p);
                    return (
                      <label
                        key={p}
                        className="flex items-center gap-3 bg-white/15 border border-white/20 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-all shadow-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleUserPermission(selectedUserEmail, p)}
                          className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
                        />
                        <span className="text-white font-medium text-sm">{p}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
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
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">News Management</h2>
              <button className="cta-button px-6 py-2">+ Add News</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">News Article {i}</p>
                    <p className="text-white/50 text-sm">Tags: Updates, News</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Media Library</h2>
              <button className="cta-button px-6 py-2">+ Upload Media</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-white/70 text-sm">image_{i}.jpg</p>
                </div>
              ))}
            </div>
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
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
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

