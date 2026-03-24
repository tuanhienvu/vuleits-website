(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function isAdminFeatureTab(tab) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UI_FEATURES"].includes(tab);
}
function catchMessage(e, fallback) {
    return e instanceof Error ? e.message : fallback;
}
// Small client-side auth redirect component
function AuthRedirect() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthRedirect.useEffect": ()=>{
            try {
                // Try to access a protected API; if 401, redirect to login
                fetch('/api/admin/users', {
                    credentials: 'include'
                }).then({
                    "AuthRedirect.useEffect": (res)=>{
                        if (!res.ok) {
                            window.location.href = '/admin/login';
                        }
                    }
                }["AuthRedirect.useEffect"]);
            } catch  {
            // ignore
            }
        }
    }["AuthRedirect.useEffect"], []);
    return null;
}
_s(AuthRedirect, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AuthRedirect;
function DashboardClient() {
    _s1();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { can, loading: permsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"])();
    // ==================== STATE MANAGEMENT [SEARCH: STATE, TAB] ====================
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Sync activeTab with URL parameter
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            const tab = searchParams.get('tab') || 'overview';
            setActiveTab(tab);
        }
    }["DashboardClient.useEffect"], [
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (permsLoading) return;
            const tab = searchParams.get('tab') || 'overview';
            if (!isAdminFeatureTab(tab)) return;
            if (can(tab, 'read')) return;
            const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UI_FEATURES"].find({
                "DashboardClient.useEffect.fallback": (f)=>can(f, 'read')
            }["DashboardClient.useEffect.fallback"]);
            if (fallback) {
                router.replace(`/admin/dashboard?tab=${fallback}`);
            } else {
                router.replace('/admin/login');
            }
        }
    }["DashboardClient.useEffect"], [
        permsLoading,
        searchParams,
        can,
        router
    ]);
    // ==================== STATISTICS CONFIG [SEARCH: STATS, DATA] ====================
    const stats = [
        {
            label: 'Total Products',
            value: '24',
            icon: '📦'
        },
        {
            label: 'Total News',
            value: '42',
            icon: '📰'
        },
        {
            label: 'Total Users',
            value: '8',
            icon: '👥'
        },
        {
            label: 'Contact Messages',
            value: '15',
            icon: '💬'
        }
    ];
    // ==================== USERS + PERMISSIONS (DB-backed) ====================
    const [roles, setRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usersLoading, setUsersLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rolesLoading, setRolesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sessionMe, setSessionMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            let cancelled = false;
            ({
                "DashboardClient.useEffect": async ()=>{
                    try {
                        const res = await fetch('/api/admin/me', {
                            credentials: 'include'
                        });
                        if (!res.ok) return;
                        const data = await res.json();
                        if (!cancelled && data?.id) setSessionMe(data);
                    } catch  {
                    // ignore
                    }
                }
            })["DashboardClient.useEffect"]();
            return ({
                "DashboardClient.useEffect": ()=>{
                    cancelled = true;
                }
            })["DashboardClient.useEffect"];
        }
    }["DashboardClient.useEffect"], []);
    const features = [
        {
            id: 'overview',
            label: 'Overview',
            icon: '📊'
        },
        // Product Group
        {
            id: 'services',
            label: 'Services',
            icon: '🧩'
        },
        {
            id: 'products',
            label: 'Products',
            icon: '📦'
        },
        // Contents
        {
            id: 'news',
            label: 'News',
            icon: '📰'
        },
        {
            id: 'media',
            label: 'Media',
            icon: '🖼️'
        },
        {
            id: 'banners',
            label: 'Banners',
            icon: '🎬'
        },
        // Settings
        {
            id: 'homeFeatures',
            label: 'Home Features',
            icon: '🏠'
        },
        {
            id: 'contacts',
            label: 'Contacts',
            icon: '💬'
        },
        {
            id: 'aboutTeam',
            label: 'About Team',
            icon: '👤'
        },
        {
            id: 'aboutStats',
            label: 'About Stats',
            icon: '📈'
        },
        // Permission
        {
            id: 'users',
            label: 'Users (list, create, role, active)',
            icon: '👥'
        },
        {
            id: 'userPassword',
            label: 'User password (reset)',
            icon: '🔑'
        },
        {
            id: 'permissions',
            label: 'Permissions',
            icon: '🔐'
        }
    ];
    const emptyCrud = ()=>({
            create: false,
            read: false,
            update: false,
            delete: false
        });
    const makeEmptyMatrix = ()=>Object.fromEntries(features.map((f)=>[
                f.id,
                emptyCrud()
            ]));
    const [selectedPermissionUserId, setSelectedPermissionUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [permissionMatrix, setPermissionMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(makeEmptyMatrix);
    const [permissionsLoading, setPermissionsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionsSaving, setPermissionsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionsError, setPermissionsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedPermissionUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[selectedPermissionUser]": ()=>selectedPermissionUserId != null ? users.find({
                "DashboardClient.useMemo[selectedPermissionUser]": (u)=>u.id === selectedPermissionUserId
            }["DashboardClient.useMemo[selectedPermissionUser]"]) || null : null
    }["DashboardClient.useMemo[selectedPermissionUser]"], [
        selectedPermissionUserId,
        users
    ]);
    async function loadRoles() {
        setRolesLoading(true);
        try {
            const res = await fetch('/api/admin/roles', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                return;
            }
            const data = await res.json();
            setRoles(Array.isArray(data) ? data : []);
        } catch  {
        // ignore
        } finally{
            setRolesLoading(false);
        }
    }
    async function loadUsers() {
        setUsersLoading(true);
        try {
            const res = await fetch('/api/admin/users', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                return;
            }
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch  {
        // ignore
        } finally{
            setUsersLoading(false);
        }
    }
    const loadPermissionMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[loadPermissionMatrix]": async (userId)=>{
            setPermissionsLoading(true);
            setPermissionsError(null);
            try {
                const res = await fetch(`/api/admin/permissions/${userId}`, {
                    credentials: 'include'
                });
                if (!res.ok) {
                    const data = await res.json().catch({
                        "DashboardClient.useCallback[loadPermissionMatrix]": ()=>({})
                    }["DashboardClient.useCallback[loadPermissionMatrix]"]);
                    if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                    throw new Error(data?.error || 'Failed to load permissions');
                }
                const data = await res.json();
                if (data?.features) setPermissionMatrix(data.features);
            } catch (e) {
                setPermissionsError(catchMessage(e, 'Failed to load permissions'));
            } finally{
                setPermissionsLoading(false);
            }
        }
    }["DashboardClient.useCallback[loadPermissionMatrix]"], []);
    async function savePermissionMatrix(userId) {
        setPermissionsSaving(true);
        setPermissionsError(null);
        try {
            const res = await fetch(`/api/admin/permissions/${userId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    features: permissionMatrix
                })
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to save permissions');
            }
            await loadPermissionMatrix(userId);
        } catch (e) {
            setPermissionsError(catchMessage(e, 'Failed to save permissions'));
        } finally{
            setPermissionsSaving(false);
        }
    }
    // Load users/roles when opening management tabs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab === 'users' || activeTab === 'permissions') {
                void loadRoles();
                void loadUsers();
            }
        }
    }["DashboardClient.useEffect"], [
        activeTab
    ]);
    // Preselect user in Permission tab from URL (?userId=...)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab !== 'permissions') return;
            const idParam = searchParams.get('userId');
            if (!idParam) return;
            const id = Number(idParam);
            if (Number.isFinite(id)) setSelectedPermissionUserId(id);
        }
    }["DashboardClient.useEffect"], [
        activeTab,
        searchParams
    ]);
    // When selection changes in Permission tab, fetch their matrix
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab !== 'permissions') return;
            if (selectedPermissionUserId == null) return;
            void loadPermissionMatrix(selectedPermissionUserId);
        }
    }["DashboardClient.useEffect"], [
        activeTab,
        selectedPermissionUserId,
        loadPermissionMatrix
    ]);
    // ==================== HOME FEATURES STATE [SEARCH: HOME FEATURES, CRUD] ====================
    const [homeFeatures, setHomeFeatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hfLoading, setHfLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hfError, setHfError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hfModalOpen, setHfModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hfSaving, setHfSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hfForm, setHfForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        icon: '',
        title: '',
        description: '',
        order: 0,
        isActive: true
    });
    // ==================== ABOUT STATS STATE [SEARCH: ABOUT STATS, CRUD] ====================
    const [aboutStats, setAboutStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [asLoading, setAsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [asError, setAsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [asModalOpen, setAsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [asSaving, setAsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [asForm, setAsForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        number: '',
        label: '',
        order: 0,
        isActive: true
    });
    async function loadAboutStats() {
        setAsLoading(true);
        setAsError(null);
        try {
            const res = await fetch('/api/admin/about-stats', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to load about stats');
            }
            const data = await res.json();
            setAboutStats(Array.isArray(data) ? data : []);
        } catch (e) {
            setAsError(catchMessage(e, 'Failed to load about stats'));
        } finally{
            setAsLoading(false);
        }
    }
    function openCreateAboutStat() {
        setAsForm({
            id: null,
            number: '',
            label: '',
            order: 0,
            isActive: true
        });
        setAsModalOpen(true);
    }
    function openEditAboutStat(stat) {
        setAsForm({
            id: stat.id,
            number: stat.number || '',
            label: stat.label || '',
            order: typeof stat.order === 'number' ? stat.order : 0,
            isActive: stat.isActive !== false
        });
        setAsModalOpen(true);
    }
    async function saveAboutStat() {
        setAsSaving(true);
        setAsError(null);
        try {
            const payload = {
                number: asForm.number,
                label: asForm.label,
                order: Number(asForm.order),
                isActive: Boolean(asForm.isActive)
            };
            const isEdit = asForm.id != null;
            const url = isEdit ? `/api/admin/about-stats/${asForm.id}` : '/api/admin/about-stats';
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Save failed');
            }
            setAsModalOpen(false);
            await loadAboutStats();
        } catch (e) {
            setAsError(catchMessage(e, 'Save failed'));
        } finally{
            setAsSaving(false);
        }
    }
    async function deleteAboutStat(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this stat?');
        if (!ok) return;
        setAsError(null);
        try {
            const res = await fetch(`/api/admin/about-stats/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Delete failed');
            }
            await loadAboutStats();
        } catch (e) {
            setAsError(catchMessage(e, 'Delete failed'));
        }
    }
    // ==================== ABOUT TEAM STATE [SEARCH: ABOUT TEAM, CRUD] ====================
    const [aboutTeam, setAboutTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [atLoading, setAtLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [atError, setAtError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [atModalOpen, setAtModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [atSaving, setAtSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [atForm, setAtForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        emoji: '',
        name: '',
        role: '',
        bio: '',
        order: 0,
        isActive: true
    });
    async function loadAboutTeam() {
        setAtLoading(true);
        setAtError(null);
        try {
            const res = await fetch('/api/admin/about-team', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to load about team');
            }
            const data = await res.json();
            setAboutTeam(Array.isArray(data) ? data : []);
        } catch (e) {
            setAtError(catchMessage(e, 'Failed to load about team'));
        } finally{
            setAtLoading(false);
        }
    }
    function openCreateAboutTeam() {
        setAtForm({
            id: null,
            emoji: '',
            name: '',
            role: '',
            bio: '',
            order: 0,
            isActive: true
        });
        setAtModalOpen(true);
    }
    function openEditAboutTeam(member) {
        setAtForm({
            id: member.id,
            emoji: member.emoji || '',
            name: member.name || '',
            role: member.role || '',
            bio: member.bio || '',
            order: typeof member.order === 'number' ? member.order : 0,
            isActive: member.isActive !== false
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
                isActive: Boolean(atForm.isActive)
            };
            const isEdit = atForm.id != null;
            const url = isEdit ? `/api/admin/about-team/${atForm.id}` : '/api/admin/about-team';
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Save failed');
            }
            setAtModalOpen(false);
            await loadAboutTeam();
        } catch (e) {
            setAtError(catchMessage(e, 'Save failed'));
        } finally{
            setAtSaving(false);
        }
    }
    async function deleteAboutTeam(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this team member?');
        if (!ok) return;
        setAtError(null);
        try {
            const res = await fetch(`/api/admin/about-team/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Delete failed');
            }
            await loadAboutTeam();
        } catch (e) {
            setAtError(catchMessage(e, 'Delete failed'));
        }
    }
    // ==================== SERVICES STATE [SEARCH: SERVICES, CRUD] ====================
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [svLoading, setSvLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [svError, setSvError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [svModalOpen, setSvModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [svSaving, setSvSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [svForm, setSvForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        icon: '',
        title: '',
        description: '',
        featuresText: '',
        order: 0,
        isActive: true
    });
    function stringifyFeatures(features) {
        if (!features) return '';
        try {
            const parsed = JSON.parse(features);
            if (Array.isArray(parsed)) return parsed.map((x)=>String(x)).join('\n');
        } catch  {
        // ignore
        }
        return '';
    }
    async function loadServices() {
        setSvLoading(true);
        setSvError(null);
        try {
            const res = await fetch('/api/admin/services', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to load services');
            }
            const data = await res.json();
            setServices(Array.isArray(data) ? data : []);
        } catch (e) {
            setSvError(catchMessage(e, 'Failed to load services'));
        } finally{
            setSvLoading(false);
        }
    }
    function openCreateService() {
        setSvForm({
            id: null,
            icon: '',
            title: '',
            description: '',
            featuresText: '',
            order: 0,
            isActive: true
        });
        setSvModalOpen(true);
    }
    function openEditService(service) {
        setSvForm({
            id: service.id,
            icon: service.icon || '',
            title: service.title || '',
            description: service.description || '',
            featuresText: stringifyFeatures(service.features),
            order: typeof service.order === 'number' ? service.order : 0,
            isActive: service.isActive !== false
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
                features: svForm.featuresText
            };
            const isEdit = svForm.id != null;
            const url = isEdit ? `/api/admin/services/${svForm.id}` : '/api/admin/services';
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Save failed');
            }
            setSvModalOpen(false);
            await loadServices();
        } catch (e) {
            setSvError(catchMessage(e, 'Save failed'));
        } finally{
            setSvSaving(false);
        }
    }
    async function deleteService(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this service?');
        if (!ok) return;
        setSvError(null);
        try {
            const res = await fetch(`/api/admin/services/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Delete failed');
            }
            await loadServices();
        } catch (e) {
            setSvError(catchMessage(e, 'Delete failed'));
        }
    }
    async function loadHomeFeatures() {
        setHfLoading(true);
        setHfError(null);
        try {
            const res = await fetch('/api/admin/home-features', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to load home features');
            }
            const data = await res.json();
            setHomeFeatures(Array.isArray(data) ? data : []);
        } catch (e) {
            setHfError(catchMessage(e, 'Failed to load home features'));
        } finally{
            setHfLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab === 'homeFeatures') {
                loadHomeFeatures();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DashboardClient.useEffect"], [
        activeTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab === 'aboutStats') loadAboutStats();
            if (activeTab === 'aboutTeam') loadAboutTeam();
            if (activeTab === 'services') loadServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DashboardClient.useEffect"], [
        activeTab
    ]);
    function openCreateHomeFeature() {
        setHfForm({
            id: null,
            icon: '',
            title: '',
            description: '',
            order: 0,
            isActive: true
        });
        setHfModalOpen(true);
    }
    function openEditHomeFeature(feature) {
        setHfForm({
            id: feature.id,
            icon: feature.icon || '',
            title: feature.title || '',
            description: feature.description || '',
            order: typeof feature.order === 'number' ? feature.order : 0,
            isActive: feature.isActive !== false
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
                isActive: Boolean(hfForm.isActive)
            };
            const isEdit = hfForm.id != null;
            const url = isEdit ? `/api/admin/home-features/${hfForm.id}` : '/api/admin/home-features';
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Save failed');
            }
            setHfModalOpen(false);
            await loadHomeFeatures();
        } catch (e) {
            setHfError(catchMessage(e, 'Save failed'));
        } finally{
            setHfSaving(false);
        }
    }
    async function deleteHomeFeature(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this feature?');
        if (!ok) return;
        setHfError(null);
        try {
            const res = await fetch(`/api/admin/home-features/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Delete failed');
            }
            await loadHomeFeatures();
        } catch (e) {
            setHfError(catchMessage(e, 'Delete failed'));
        }
    }
    // Get active tab from URL using useMemo
    const activeTabMemo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[activeTabMemo]": ()=>{
            return searchParams.get('tab') || 'overview';
        }
    }["DashboardClient.useMemo[activeTabMemo]"], [
        searchParams
    ]);
    // Ensure sidebar active state uses same tab value (kept for parity with previous implementation)
    // (activeTabMemo isn't strictly required, but avoids behavior change)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab !== activeTabMemo) setActiveTab(activeTabMemo);
        }
    }["DashboardClient.useEffect"], [
        activeTabMemo,
        activeTab
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            ("TURBOPACK compile-time value", "object") !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthRedirect, {}, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                lineNumber: 733,
                columnNumber: 41
            }, this),
            activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
                children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-6 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/70 text-sm",
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 743,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-bold text-white mt-1",
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 744,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 742,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl",
                                    "aria-label": `${stat.label} icon`,
                                    children: stat.icon
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 746,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                            lineNumber: 741,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 739,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass p-8 rounded-2xl",
                children: [
                    activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white mb-6",
                                children: "Overview"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 760,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/70",
                                            children: "📈 Your content is performing well. 42 news articles and 24 active products."
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 763,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 762,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/70",
                                            children: "💡 Tip: Keep your content updated regularly for better engagement."
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 766,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 765,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 761,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 759,
                        columnNumber: 11
                    }, this),
                    activeTab === 'homeFeatures' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white",
                                                children: "Home Features"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 777,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage the features grid shown on the public home page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 778,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 776,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadHomeFeatures(),
                                                className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 781,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateHomeFeature,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Feature"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 784,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 780,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 775,
                                columnNumber: 13
                            }, this),
                            hfError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4",
                                children: hfError
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 791,
                                columnNumber: 15
                            }, this),
                            hfLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 795,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: homeFeatures.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No features yet. Click “Add Feature” to create the first one."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 799,
                                    columnNumber: 19
                                }, this) : homeFeatures.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl leading-none",
                                                        children: f.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 806,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white font-semibold",
                                                                        children: f.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 809,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !f.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 811,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70",
                                                                        children: [
                                                                            "Order: ",
                                                                            f.order
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 815,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 808,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: f.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 819,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 805,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 md:justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openEditHomeFeature(f),
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 823,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteHomeFeature(f.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 822,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, f.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 804,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 797,
                                columnNumber: 15
                            }, this),
                            hfModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/60",
                                        onClick: ()=>setHfModalOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 839,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-white",
                                                                children: hfForm.id ? 'Edit Feature' : 'Add Feature'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 843,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Icon can be emoji (e.g. ⚡) or short text."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 844,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setHfModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 846,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 841,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Icon"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 857,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: hfForm.icon,
                                                                onChange: (e)=>setHfForm((s)=>({
                                                                            ...s,
                                                                            icon: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "✨"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Order"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 866,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: hfForm.order,
                                                                onChange: (e)=>setHfForm((s)=>({
                                                                            ...s,
                                                                            order: Number(e.target.value)
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 867,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 865,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Title"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 875,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: hfForm.title,
                                                                onChange: (e)=>setHfForm((s)=>({
                                                                            ...s,
                                                                            title: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "Fast Performance"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 876,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Description"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 884,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: hfForm.description,
                                                                onChange: (e)=>setHfForm((s)=>({
                                                                            ...s,
                                                                            description: e.target.value
                                                                        })),
                                                                rows: 4,
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "Describe the feature..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 885,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 883,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 md:col-span-2 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: hfForm.isActive,
                                                                onChange: (e)=>setHfForm((s)=>({
                                                                            ...s,
                                                                            isActive: e.target.checked
                                                                        })),
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 894,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on home page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 900,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 855,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setHfModalOpen(false),
                                                        className: "bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20",
                                                        disabled: hfSaving,
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveHomeFeature,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: hfSaving,
                                                        children: hfSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 904,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 840,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 838,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 774,
                        columnNumber: 11
                    }, this),
                    activeTab === 'aboutStats' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white",
                                                children: "About Stats"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 927,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage the statistics cards on the About page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 928,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 926,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadAboutStats(),
                                                className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 931,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateAboutStat,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Stat"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 934,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 930,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 925,
                                columnNumber: 13
                            }, this),
                            asError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4",
                                children: asError
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 940,
                                columnNumber: 25
                            }, this),
                            asLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 943,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: aboutStats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No stats yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 947,
                                    columnNumber: 19
                                }, this) : aboutStats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-semibold",
                                                            children: s.number
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 954,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/80",
                                                            children: s.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 27
                                                        }, this),
                                                        !s.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                            children: "Inactive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 957,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70",
                                                            children: [
                                                                "Order: ",
                                                                s.order
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 961,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 952,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 951,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openEditAboutStat(s),
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteAboutStat(s.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 966,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 950,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 945,
                                columnNumber: 15
                            }, this),
                            asModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/60",
                                        onClick: ()=>setAsModalOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 982,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-white",
                                                                children: asForm.id ? 'Edit Stat' : 'Add Stat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 986,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Example: “150+” — “Projects Completed”."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 987,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 985,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAsModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 984,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: asForm.number,
                                                                onChange: (e)=>setAsForm((x)=>({
                                                                            ...x,
                                                                            number: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "150+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 999,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Order"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1009,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: asForm.order,
                                                                onChange: (e)=>setAsForm((x)=>({
                                                                            ...x,
                                                                            order: Number(e.target.value)
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Label"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1018,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: asForm.label,
                                                                onChange: (e)=>setAsForm((x)=>({
                                                                            ...x,
                                                                            label: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "Projects Completed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1019,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1017,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 md:col-span-2 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: asForm.isActive,
                                                                onChange: (e)=>setAsForm((x)=>({
                                                                            ...x,
                                                                            isActive: e.target.checked
                                                                        })),
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1027,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on About page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1033,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1026,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 998,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAsModalOpen(false),
                                                        className: "bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20",
                                                        disabled: asSaving,
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1038,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveAboutStat,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: asSaving,
                                                        children: asSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1041,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 983,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 981,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 924,
                        columnNumber: 11
                    }, this),
                    activeTab === 'aboutTeam' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white",
                                                children: "About Team"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage team members shown on the About page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1057,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadAboutTeam(),
                                                className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1060,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateAboutTeam,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Member"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1063,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1059,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1054,
                                columnNumber: 13
                            }, this),
                            atError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4",
                                children: atError
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1069,
                                columnNumber: 25
                            }, this),
                            atLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1072,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: aboutTeam.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No team members yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1076,
                                    columnNumber: 19
                                }, this) : aboutTeam.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl leading-none",
                                                        children: m.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 flex-wrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white font-semibold",
                                                                        children: m.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1084,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-purple-200 text-sm",
                                                                        children: m.role
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1085,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !m.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1087,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70",
                                                                        children: [
                                                                            "Order: ",
                                                                            m.order
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1091,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1083,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: m.bio
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1095,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1082,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1080,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 md:justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openEditAboutTeam(m),
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1099,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteAboutTeam(m.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1074,
                                columnNumber: 15
                            }, this),
                            atModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/60",
                                        onClick: ()=>setAtModalOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-white",
                                                                children: atForm.id ? 'Edit Team Member' : 'Add Team Member'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1118,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Emoji is the avatar icon."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1119,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1117,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAtModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Emoji"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1132,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: atForm.emoji,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            emoji: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "👨‍💻"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1133,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1131,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Order"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1141,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: atForm.order,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            order: Number(e.target.value)
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1142,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1140,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1150,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: atForm.name,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            name: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "John Anderson"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1151,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Role"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1159,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: atForm.role,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            role: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "CEO & Founder"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1160,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1158,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Bio"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1168,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: atForm.bio,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            bio: e.target.value
                                                                        })),
                                                                rows: 4,
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1169,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1167,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 md:col-span-2 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: atForm.isActive,
                                                                onChange: (e)=>setAtForm((x)=>({
                                                                            ...x,
                                                                            isActive: e.target.checked
                                                                        })),
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1177,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on About page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1183,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1176,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAtModalOpen(false),
                                                        className: "bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20",
                                                        disabled: atSaving,
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1188,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveAboutTeam,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: atSaving,
                                                        children: atSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1191,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1187,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1113,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1053,
                        columnNumber: 11
                    }, this),
                    activeTab === 'services' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white",
                                                children: "Services"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1206,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage service cards shown on the Services page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1207,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1205,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>loadServices(),
                                                className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateService,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Service"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1213,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1204,
                                columnNumber: 13
                            }, this),
                            svError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-lg mb-4",
                                children: svError
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1219,
                                columnNumber: 25
                            }, this),
                            svLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1222,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: services.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No services yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1226,
                                    columnNumber: 19
                                }, this) : services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-3xl leading-none",
                                                        children: s.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1231,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 flex-wrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white font-semibold",
                                                                        children: s.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1234,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !s.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1236,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70",
                                                                        children: [
                                                                            "Order: ",
                                                                            s.order
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1240,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1233,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: s.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1244,
                                                                columnNumber: 27
                                                            }, this),
                                                            stringifyFeatures(s.features).trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/50 text-sm mt-2 whitespace-pre-line",
                                                                children: stringifyFeatures(s.features)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1246,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1232,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1230,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 md:justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openEditService(s),
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1251,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteService(s.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1250,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1229,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1224,
                                columnNumber: 15
                            }, this),
                            svModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/60",
                                        onClick: ()=>setSvModalOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1266,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-2xl glass p-6 rounded-2xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-white",
                                                                children: svForm.id ? 'Edit Service' : 'Add Service'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1270,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Enter one feature per line."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1271,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1269,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSvModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1273,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1268,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Icon"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1284,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: svForm.icon,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            icon: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "🎨"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1285,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1283,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Order"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1293,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: svForm.order,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            order: Number(e.target.value)
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1294,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Title"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1302,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: svForm.title,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            title: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1303,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1301,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Description"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1310,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: svForm.description,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            description: e.target.value
                                                                        })),
                                                                rows: 3,
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1311,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Features"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1319,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: svForm.featuresText,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            featuresText: e.target.value
                                                                        })),
                                                                rows: 5,
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: 'Feature 1\nFeature 2\nFeature 3'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1320,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1318,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 md:col-span-2 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: svForm.isActive,
                                                                onChange: (e)=>setSvForm((x)=>({
                                                                            ...x,
                                                                            isActive: e.target.checked
                                                                        })),
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1329,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on Services page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1328,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSvModalOpen(false),
                                                        className: "bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20",
                                                        disabled: svSaving,
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveService,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: svSaving,
                                                        children: svSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1339,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1267,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1265,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1203,
                        columnNumber: 11
                    }, this),
                    activeTab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "User Management"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1357,
                                        columnNumber: 15
                                    }, this),
                                    can('users', 'create') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            (async ()=>{
                                                const email = window.prompt('New user email:');
                                                if (!email) return;
                                                const password = window.prompt('New user password:');
                                                if (!password) return;
                                                if (!roles.length) await loadRoles();
                                                const roleName = window.prompt(`Role name (${roles.map((r)=>r.name).join(', ')}):`) || '';
                                                const role = roles.find((r)=>r.name.toUpperCase() === roleName.toUpperCase());
                                                const roleId = role?.id;
                                                if (!roleId) {
                                                    alert('Invalid role.');
                                                    return;
                                                }
                                                const res = await fetch('/api/admin/users', {
                                                    method: 'POST',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        email,
                                                        password,
                                                        roleId
                                                    })
                                                });
                                                if (!res.ok) {
                                                    const data = await res.json().catch(()=>({}));
                                                    alert(data?.error || 'Failed to create user');
                                                    return;
                                                }
                                                await loadUsers();
                                            })();
                                        },
                                        className: "cta-button px-6 py-2",
                                        children: "+ Add User"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1359,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1356,
                                columnNumber: 13
                            }, this),
                            !permsLoading && can('users', 'read') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60 text-sm mb-4",
                                children: [
                                    "Role and active flag use ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "Users → Update"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1399,
                                        columnNumber: 42
                                    }, this),
                                    ". Password reset uses",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "User password → Update"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1400,
                                        columnNumber: 17
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1398,
                                columnNumber: 15
                            }, this),
                            usersLoading || rolesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1405,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: users.map((user)=>{
                                    const roleName = roles.find((r)=>r.id === user.roleId)?.name || String(user.roleId);
                                    const isSysadminRow = roleName.toUpperCase() === 'SYSADMIN';
                                    const inactiveRow = !user.isActive;
                                    const canEditUser = can('users', 'update');
                                    const canResetPassword = can('userPassword', 'update');
                                    const canDeleteUser = can('users', 'delete');
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/15 border border-white/20 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-3 shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-semibold text-base",
                                                        children: user.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1421,
                                                        columnNumber: 25
                                                    }, this),
                                                    user.displayName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/90 text-sm mt-0.5",
                                                        children: user.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1423,
                                                        columnNumber: 27
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/80 text-sm mt-1",
                                                        children: [
                                                            "Role: ",
                                                            roleName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1425,
                                                        columnNumber: 25
                                                    }, this),
                                                    inactiveRow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-amber-200/90 text-xs mt-1.5 font-medium",
                                                        children: "Sign-in disabled — account is inactive"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1427,
                                                        columnNumber: 27
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1420,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 items-center flex-wrap justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `inline-flex rounded-lg border border-white/30 overflow-hidden text-xs sm:text-sm font-medium shadow-sm ${!canEditUser ? 'opacity-50' : ''}`,
                                                        role: "group",
                                                        "aria-label": "Account status",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                disabled: !canEditUser,
                                                                onClick: async ()=>{
                                                                    if (user.isActive) return;
                                                                    const res = await fetch(`/api/admin/users/${user.id}`, {
                                                                        method: 'PUT',
                                                                        credentials: 'include',
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            isActive: true
                                                                        })
                                                                    });
                                                                    if (!res.ok) {
                                                                        const data = await res.json().catch(()=>({}));
                                                                        alert(data?.error || 'Update failed');
                                                                        return;
                                                                    }
                                                                    await loadUsers();
                                                                },
                                                                className: `px-3 py-2 min-w-18 transition-colors ${user.isActive ? 'bg-emerald-500/35 text-emerald-50 border-r border-white/20' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'}`,
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1442,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                disabled: !canEditUser || isSysadminRow,
                                                                title: isSysadminRow ? 'SYSADMIN account cannot be set inactive from here' : undefined,
                                                                onClick: async ()=>{
                                                                    if (!user.isActive) return;
                                                                    const res = await fetch(`/api/admin/users/${user.id}`, {
                                                                        method: 'PUT',
                                                                        credentials: 'include',
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            isActive: false
                                                                        })
                                                                    });
                                                                    if (!res.ok) {
                                                                        const data = await res.json().catch(()=>({}));
                                                                        alert(data?.error || 'Update failed');
                                                                        return;
                                                                    }
                                                                    await loadUsers();
                                                                },
                                                                className: `px-3 py-2 min-w-18 transition-colors ${!user.isActive ? 'bg-red-500/30 text-red-100' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'} disabled:opacity-50 disabled:cursor-not-allowed`,
                                                                children: "Inactive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1468,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1435,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: user.roleId,
                                                        disabled: !canEditUser || isSysadminRow || inactiveRow,
                                                        title: inactiveRow ? 'Activate the account before changing role' : isSysadminRow ? 'SYSADMIN role cannot be changed here' : undefined,
                                                        onChange: async (e)=>{
                                                            const roleId = Number(e.target.value);
                                                            const res = await fetch(`/api/admin/users/${user.id}`, {
                                                                method: 'PUT',
                                                                credentials: 'include',
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    roleId
                                                                })
                                                            });
                                                            if (!res.ok) {
                                                                const data = await res.json().catch(()=>({}));
                                                                alert(data?.error || 'Role update failed');
                                                                return;
                                                            }
                                                            await loadUsers();
                                                        },
                                                        className: "bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                                        "aria-label": "User role",
                                                        children: roles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: r.id,
                                                                className: "bg-gray-800 text-white",
                                                                children: r.name
                                                            }, r.id, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1527,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1498,
                                                        columnNumber: 25
                                                    }, this),
                                                    can('permissions', 'read') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: isSysadminRow || inactiveRow,
                                                        title: inactiveRow ? 'Activate the account before opening permissions' : isSysadminRow ? 'SYSADMIN permissions are fixed' : undefined,
                                                        onClick: ()=>{
                                                            if (isSysadminRow || inactiveRow) return;
                                                            window.location.href = `/admin/dashboard?tab=permissions&userId=${user.id}`;
                                                        },
                                                        className: `bg-white/25 border border-white/30 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-sm ${isSysadminRow || inactiveRow ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/35 hover:border-white/40'}`,
                                                        children: "Permissions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1535,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: !canResetPassword || inactiveRow,
                                                        title: inactiveRow ? 'Activate the account before resetting password' : undefined,
                                                        onClick: async ()=>{
                                                            const pw = window.prompt('New password for this user:');
                                                            if (!pw) return;
                                                            const res = await fetch(`/api/admin/users/${user.id}`, {
                                                                method: 'PUT',
                                                                credentials: 'include',
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    password: pw
                                                                })
                                                            });
                                                            if (!res.ok) {
                                                                const data = await res.json().catch(()=>({}));
                                                                alert(data?.error || 'Reset failed');
                                                                return;
                                                            }
                                                            alert('Password updated.');
                                                        },
                                                        className: `bg-amber-500/25 border border-amber-400/40 text-amber-50 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/35 transition-all ${!canResetPassword || inactiveRow ? 'opacity-50 cursor-not-allowed' : ''}`,
                                                        children: "Reset password"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1560,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: async ()=>{
                                                            const res = await fetch(`/api/admin/users/${user.id}`, {
                                                                method: 'DELETE',
                                                                credentials: 'include'
                                                            });
                                                            if (res.ok) await loadUsers();
                                                        },
                                                        disabled: user.isProtected || !canDeleteUser || isSysadminRow,
                                                        title: isSysadminRow ? 'SYSADMIN cannot be deleted' : undefined,
                                                        className: `px-4 py-2 rounded-lg font-medium transition-all ${user.isProtected || !canDeleteUser || isSysadminRow ? 'bg-gray-700/40 border border-gray-600/30 text-gray-300 cursor-not-allowed' : 'bg-red-500/30 border border-red-400/40 text-red-100 hover:bg-red-500/40 hover:border-red-400/50 shadow-sm'}`,
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1588,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1433,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, user.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1416,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1407,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1355,
                        columnNumber: 11
                    }, this),
                    activeTab === 'permissions' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "Permission Features"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1620,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/60 text-sm",
                                        children: can('permissions', 'update') ? 'Click a user row to edit CRUD per feature. Users = list/create/role/active; User password = reset password.' : 'View only — you need permissions.update to change checkboxes.'
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1621,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1619,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col lg:flex-row gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full lg:w-80",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: users.map((user)=>{
                                                const isSelected = user.id === selectedPermissionUserId;
                                                const roleName = roles.find((r)=>r.id === user.roleId)?.name || String(user.roleId);
                                                const permUserInactive = !user.isActive;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: permUserInactive,
                                                    title: permUserInactive ? 'Activate the user before editing permissions' : undefined,
                                                    onClick: ()=>{
                                                        if (permUserInactive) return;
                                                        setSelectedPermissionUserId(user.id);
                                                    },
                                                    className: `w-full text-left p-4 rounded-lg border transition-all shadow-sm ${permUserInactive ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10 text-white/50' : isSelected ? 'bg-white/20 border-white/30 text-white' : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/15'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold",
                                                                        children: user.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1655,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-white/70 mt-1",
                                                                        children: [
                                                                            "Role: ",
                                                                            roleName
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1656,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1654,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-end gap-1 shrink-0",
                                                                children: [
                                                                    permUserInactive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-100",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1660,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    user.isProtected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-1 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Protected"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1665,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1658,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1653,
                                                        columnNumber: 25
                                                    }, this)
                                                }, user.id, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1636,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1630,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1629,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: !selectedPermissionUserId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 border border-white/15 rounded-xl p-6 text-white/70",
                                            children: "Select a user to edit permissions."
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1679,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 border border-white/15 rounded-xl p-4",
                                            children: [
                                                permissionsError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 bg-red-500/20 border border-red-400/30 text-red-100 p-3 rounded-lg text-sm",
                                                    children: permissionsError
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1685,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-white font-semibold",
                                                                    children: [
                                                                        "Editing: ",
                                                                        selectedPermissionUser?.email || 'User'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1692,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-white/60 text-sm mt-1",
                                                                    children: "SYSADMIN cannot be changed (protected)."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1695,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1691,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        if (selectedPermissionUserId != null) loadPermissionMatrix(selectedPermissionUserId);
                                                                    },
                                                                    className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                                    disabled: permissionsLoading || permissionsSaving,
                                                                    children: "Refresh"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1701,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        if (selectedPermissionUserId != null) savePermissionMatrix(selectedPermissionUserId);
                                                                    },
                                                                    className: "cta-button px-6 py-2",
                                                                    disabled: permissionsLoading || permissionsSaving || selectedPermissionUser?.isProtected === true || !can('permissions', 'update'),
                                                                    children: permissionsSaving ? 'Saving...' : 'Save'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1710,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1700,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1690,
                                                    columnNumber: 21
                                                }, this),
                                                permissionsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-white/80",
                                                    children: "Loading permissions..."
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1728,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "overflow-x-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "w-full min-w-[720px] border-separate border-spacing-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "text-left",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Feature"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 1734,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Create"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 1735,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Read"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 1736,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Update"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 1737,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 1738,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1733,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1732,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                children: features.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        className: "hover:bg-white/5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "py-3 px-3 border-b border-white/10",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-3",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-xl shrink-0",
                                                                                            children: f.icon
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                            lineNumber: 1746,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-white font-medium",
                                                                                            children: f.label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                            lineNumber: 1747,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                    lineNumber: 1745,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1744,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            [
                                                                                'create',
                                                                                'read',
                                                                                'update',
                                                                                'delete'
                                                                            ].map((action)=>{
                                                                                const checked = Boolean(permissionMatrix?.[f.id]?.[action]);
                                                                                const disabled = selectedPermissionUser?.isProtected === true || !can('permissions', 'update');
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "py-3 px-3 border-b border-white/10",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: `inline-flex items-center gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`,
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "checkbox",
                                                                                                checked: checked,
                                                                                                disabled: disabled || permissionsSaving,
                                                                                                onChange: (e)=>{
                                                                                                    const value = e.target.checked;
                                                                                                    setPermissionMatrix((prev)=>({
                                                                                                            ...prev,
                                                                                                            [f.id]: {
                                                                                                                ...prev[f.id],
                                                                                                                [action]: value
                                                                                                            }
                                                                                                        }));
                                                                                                },
                                                                                                className: "w-4 h-4"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                                lineNumber: 1761,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-white/70 text-sm",
                                                                                                children: action.toUpperCase().slice(0, 1)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                                lineNumber: 1774,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                        lineNumber: 1756,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                }, action, false, {
                                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                    lineNumber: 1755,
                                                                                    columnNumber: 37
                                                                                }, this);
                                                                            })
                                                                        ]
                                                                    }, f.id, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1743,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1741,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1731,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1730,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1683,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1677,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1628,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1618,
                        columnNumber: 11
                    }, this),
                    activeTab === 'products' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "Product Management"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1796,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Add Product"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1797,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1795,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-medium",
                                                        children: [
                                                            "Product ",
                                                            i
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1803,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "Status: Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1804,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1802,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1807,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1808,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1806,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1801,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1799,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1794,
                        columnNumber: 11
                    }, this),
                    activeTab === 'news' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "News Management"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1819,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Add News"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1820,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1818,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-medium",
                                                        children: [
                                                            "News Article ",
                                                            i
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1826,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "Tags: Updates, News"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1827,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1825,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1830,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1831,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1829,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1824,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1822,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1817,
                        columnNumber: 11
                    }, this),
                    activeTab === 'media' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "Media Library"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1842,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Upload Media"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1843,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1841,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-4xl mb-2",
                                                children: "🖼️"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1848,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/70 text-sm",
                                                children: [
                                                    "image_",
                                                    i,
                                                    ".jpg"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1849,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1847,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1845,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1840,
                        columnNumber: 11
                    }, this),
                    activeTab === 'banners' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "Banner Sliders"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1859,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Create Banner"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1860,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1858,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-medium",
                                                        children: [
                                                            "Banner Slider ",
                                                            i
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1866,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "3 slides"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1867,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1865,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1870,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1871,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1869,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1864,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1862,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1857,
                        columnNumber: 11
                    }, this),
                    activeTab === 'contacts' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white mb-6",
                                children: "Contact Messages"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1881,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white font-medium",
                                                                children: [
                                                                    "User ",
                                                                    i
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1887,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/50 text-sm",
                                                                children: [
                                                                    "user",
                                                                    i,
                                                                    "@example.com"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1888,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1886,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm",
                                                        children: "New"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1890,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1885,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/70",
                                                children: "This is a contact message from the user..."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1892,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1884,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1882,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1880,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                lineNumber: 756,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(DashboardClient, "/hkADmBXunIRk+HlwnrXiQjjqaY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"]
    ];
});
_c1 = DashboardClient;
var _c, _c1;
__turbopack_context__.k.register(_c, "AuthRedirect");
__turbopack_context__.k.register(_c1, "DashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=WebPortal_vuleits-website_src_app_admin_dashboard_DashboardClient_tsx_47b94e8d._.js.map