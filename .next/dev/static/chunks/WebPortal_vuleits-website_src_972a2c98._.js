(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shared role ordering (client + server). Lower index = higher privilege. */ __turbopack_context__.s([
    "ROLE_ORDER",
    ()=>ROLE_ORDER,
    "getRoleRank",
    ()=>getRoleRank,
    "normalizeRoleName",
    ()=>normalizeRoleName
]);
const ROLE_ORDER = [
    'SYSADMIN',
    'ADMIN',
    'MANAGER',
    'EDITOR',
    'WRITER'
];
function normalizeRoleName(name) {
    return (name || '').toUpperCase();
}
function getRoleRank(roleName) {
    const n = normalizeRoleName(roleName);
    const idx = ROLE_ORDER.indexOf(n);
    return idx === -1 ? ROLE_ORDER.length : idx;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
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
                fetch('/api/admin/me', {
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
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    // ==================== STATE MANAGEMENT [SEARCH: STATE, TAB] ====================
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [mediaList, setMediaList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mediaLoading, setMediaLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mediaUploading, setMediaUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mediaFolder, setMediaFolder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('library');
    const mediaFileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeTab !== 'media' || permsLoading || !can('media', 'read')) return;
            let cancelled = false;
            setMediaLoading(true);
            fetch('/api/admin/media?take=100&imagesOnly=0', {
                credentials: 'include'
            }).then({
                "DashboardClient.useEffect": async (res)=>{
                    const data = await res.json().catch({
                        "DashboardClient.useEffect": ()=>null
                    }["DashboardClient.useEffect"]);
                    if (!res.ok || cancelled) return;
                    if (Array.isArray(data)) setMediaList(data);
                }
            }["DashboardClient.useEffect"]).catch({
                "DashboardClient.useEffect": ()=>{
                    if (!cancelled) toast.error('Failed to load media');
                }
            }["DashboardClient.useEffect"]).finally({
                "DashboardClient.useEffect": ()=>{
                    if (!cancelled) setMediaLoading(false);
                }
            }["DashboardClient.useEffect"]);
            return ({
                "DashboardClient.useEffect": ()=>{
                    cancelled = true;
                }
            })["DashboardClient.useEffect"];
        }
    }["DashboardClient.useEffect"], [
        activeTab,
        permsLoading,
        can,
        toast
    ]);
    const uploadMediaFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[uploadMediaFile]": async (file)=>{
            if (!file || !can('media', 'create')) return;
            setMediaUploading(true);
            try {
                const fd = new FormData();
                fd.set('file', file);
                fd.set('folder', mediaFolder.trim() || 'library');
                const res = await fetch('/api/admin/media', {
                    method: 'POST',
                    credentials: 'include',
                    body: fd
                });
                const data = await res.json().catch({
                    "DashboardClient.useCallback[uploadMediaFile]": ()=>({})
                }["DashboardClient.useCallback[uploadMediaFile]"]);
                if (!res.ok) throw new Error(data.error || 'Upload failed');
                if (data.media) {
                    setMediaList({
                        "DashboardClient.useCallback[uploadMediaFile]": (prev)=>[
                                data.media,
                                ...prev
                            ]
                    }["DashboardClient.useCallback[uploadMediaFile]"]);
                    toast.success('Upload complete');
                }
            } catch (e) {
                toast.error(catchMessage(e, 'Upload failed'));
            } finally{
                setMediaUploading(false);
                if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
            }
        }
    }["DashboardClient.useCallback[uploadMediaFile]"], [
        can,
        mediaFolder,
        toast
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
    const [addUserModalOpen, setAddUserModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addUserForm, setAddUserForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: '',
        displayName: '',
        roleId: '',
        isActive: true
    });
    const [addUserSaving, setAddUserSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /** User Management: empty string = all roles; otherwise numeric role id as string (select value). */ const [userManagementRoleFilter, setUserManagementRoleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
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
    const fullCrud = ()=>({
            create: true,
            read: true,
            update: true,
            delete: true
        });
    const makeEmptyMatrix = ()=>Object.fromEntries(features.map((f)=>[
                f.id,
                emptyCrud()
            ]));
    const makeFullMatrix = ()=>Object.fromEntries(features.map((f)=>[
                f.id,
                fullCrud()
            ]));
    const [selectedPermissionUserId, setSelectedPermissionUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [permissionMatrix, setPermissionMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(makeEmptyMatrix);
    const [permissionsLoading, setPermissionsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionsSaving, setPermissionsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionsResetting, setPermissionsResetting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /** Permissions tab: filter chooser list by role; empty = all roles. */ const [permissionsTabRoleFilter, setPermissionsTabRoleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    /** Permissions tab: empty = all users (within role filter); else one user id string. */ const [permissionsTabUserFilter, setPermissionsTabUserFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const selectedPermissionUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[selectedPermissionUser]": ()=>selectedPermissionUserId != null ? users.find({
                "DashboardClient.useMemo[selectedPermissionUser]": (u)=>u.id === selectedPermissionUserId
            }["DashboardClient.useMemo[selectedPermissionUser]"]) || null : null
    }["DashboardClient.useMemo[selectedPermissionUser]"], [
        selectedPermissionUserId,
        users
    ]);
    /** User Management tab: ascending by role name, then display name / email. */ const usersSortedForManagement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[usersSortedForManagement]": ()=>{
            const roleLabel = {
                "DashboardClient.useMemo[usersSortedForManagement].roleLabel": (roleId)=>roles.find({
                        "DashboardClient.useMemo[usersSortedForManagement].roleLabel": (r)=>r.id === roleId
                    }["DashboardClient.useMemo[usersSortedForManagement].roleLabel"])?.name ?? `\uFFFF#${roleId}`
            }["DashboardClient.useMemo[usersSortedForManagement].roleLabel"];
            const personLabel = {
                "DashboardClient.useMemo[usersSortedForManagement].personLabel": (u)=>{
                    const d = (u.displayName ?? '').trim();
                    return (d || u.email).toLocaleLowerCase();
                }
            }["DashboardClient.useMemo[usersSortedForManagement].personLabel"];
            return [
                ...users
            ].sort({
                "DashboardClient.useMemo[usersSortedForManagement]": (a, b)=>{
                    const byRole = roleLabel(a.roleId).localeCompare(roleLabel(b.roleId), undefined, {
                        sensitivity: 'base'
                    });
                    if (byRole !== 0) return byRole;
                    return personLabel(a).localeCompare(personLabel(b), undefined, {
                        sensitivity: 'base'
                    });
                }
            }["DashboardClient.useMemo[usersSortedForManagement]"]);
        }
    }["DashboardClient.useMemo[usersSortedForManagement]"], [
        users,
        roles
    ]);
    const rolesSortedByName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[rolesSortedByName]": ()=>[
                ...roles
            ].sort({
                "DashboardClient.useMemo[rolesSortedByName]": (a, b)=>a.name.localeCompare(b.name, undefined, {
                        sensitivity: 'base'
                    })
            }["DashboardClient.useMemo[rolesSortedByName]"])
    }["DashboardClient.useMemo[rolesSortedByName]"], [
        roles
    ]);
    const usersFilteredForManagement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[usersFilteredForManagement]": ()=>{
            if (userManagementRoleFilter === '') return usersSortedForManagement;
            const id = Number(userManagementRoleFilter);
            if (!Number.isFinite(id)) return usersSortedForManagement;
            return usersSortedForManagement.filter({
                "DashboardClient.useMemo[usersFilteredForManagement]": (u)=>u.roleId === id
            }["DashboardClient.useMemo[usersFilteredForManagement]"]);
        }
    }["DashboardClient.useMemo[usersFilteredForManagement]"], [
        usersSortedForManagement,
        userManagementRoleFilter
    ]);
    const usersMatchingPermissionsRoleFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[usersMatchingPermissionsRoleFilter]": ()=>{
            if (permissionsTabRoleFilter === '') return usersSortedForManagement;
            const rid = Number(permissionsTabRoleFilter);
            if (!Number.isFinite(rid)) return usersSortedForManagement;
            return usersSortedForManagement.filter({
                "DashboardClient.useMemo[usersMatchingPermissionsRoleFilter]": (u)=>u.roleId === rid
            }["DashboardClient.useMemo[usersMatchingPermissionsRoleFilter]"]);
        }
    }["DashboardClient.useMemo[usersMatchingPermissionsRoleFilter]"], [
        usersSortedForManagement,
        permissionsTabRoleFilter
    ]);
    const permissionsTabUserFilterValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[permissionsTabUserFilterValid]": ()=>{
            if (permissionsTabUserFilter === '') return true;
            const id = Number(permissionsTabUserFilter);
            if (!Number.isFinite(id)) return false;
            return usersMatchingPermissionsRoleFilter.some({
                "DashboardClient.useMemo[permissionsTabUserFilterValid]": (u)=>u.id === id
            }["DashboardClient.useMemo[permissionsTabUserFilterValid]"]);
        }
    }["DashboardClient.useMemo[permissionsTabUserFilterValid]"], [
        permissionsTabUserFilter,
        usersMatchingPermissionsRoleFilter
    ]);
    const usersForPermissionsChooserList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[usersForPermissionsChooserList]": ()=>{
            if (permissionsTabUserFilter === '' || !permissionsTabUserFilterValid) {
                return usersMatchingPermissionsRoleFilter;
            }
            const id = Number(permissionsTabUserFilter);
            return usersMatchingPermissionsRoleFilter.filter({
                "DashboardClient.useMemo[usersForPermissionsChooserList]": (u)=>u.id === id
            }["DashboardClient.useMemo[usersForPermissionsChooserList]"]);
        }
    }["DashboardClient.useMemo[usersForPermissionsChooserList]"], [
        usersMatchingPermissionsRoleFilter,
        permissionsTabUserFilter,
        permissionsTabUserFilterValid
    ]);
    function permissionChooserUserLabel(u) {
        const d = (u.displayName ?? '').trim();
        if (d) return d;
        return u.email;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (!permissionsTabUserFilterValid && permissionsTabUserFilter !== '') {
                setPermissionsTabUserFilter('');
            }
        }
    }["DashboardClient.useEffect"], [
        permissionsTabUserFilterValid,
        permissionsTabUserFilter
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (permissionsTabRoleFilter === '') return;
            const rid = Number(permissionsTabRoleFilter);
            if (!Number.isFinite(rid)) return;
            if (selectedPermissionUserId == null) return;
            const u = users.find({
                "DashboardClient.useEffect.u": (x)=>x.id === selectedPermissionUserId
            }["DashboardClient.useEffect.u"]);
            if (u && u.roleId !== rid) setSelectedPermissionUserId(null);
        }
    }["DashboardClient.useEffect"], [
        permissionsTabRoleFilter,
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
                return undefined;
            }
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            setRoles(list);
            return list;
        } catch  {
            return undefined;
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
    async function openAddUserModal() {
        const list = await loadRoles() ?? roles;
        const admin = list.find((r)=>r.name.toUpperCase() === 'ADMIN');
        setAddUserForm({
            email: '',
            password: '',
            displayName: '',
            roleId: admin?.id ?? list[0]?.id ?? '',
            isActive: true
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
            const body = {
                email,
                password: addUserForm.password,
                roleId: addUserForm.roleId,
                isActive: addUserForm.isActive
            };
            const dn = addUserForm.displayName.trim();
            if (dn) body.displayName = dn;
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) {
                toast.error(data.error || 'Failed to create user');
                return;
            }
            setAddUserModalOpen(false);
            await loadUsers();
            toast.success('User created');
        } catch  {
            toast.error('Network error');
        } finally{
            setAddUserSaving(false);
        }
    }
    const loadPermissionMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[loadPermissionMatrix]": async (userId)=>{
            setPermissionsLoading(true);
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
                toast.error(catchMessage(e, 'Failed to load permissions'));
            } finally{
                setPermissionsLoading(false);
            }
        }
    }["DashboardClient.useCallback[loadPermissionMatrix]"], [
        toast
    ]);
    async function savePermissionMatrix(userId) {
        setPermissionsSaving(true);
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
            toast.success('Permissions saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Failed to save permissions'));
        } finally{
            setPermissionsSaving(false);
        }
    }
    const allPermissionCheckboxesSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[allPermissionCheckboxesSelected]": ()=>{
            const actions = [
                'create',
                'read',
                'update',
                'delete'
            ];
            const ids = Object.keys(permissionMatrix);
            return ids.length > 0 && ids.every({
                "DashboardClient.useMemo[allPermissionCheckboxesSelected]": (fid)=>actions.every({
                        "DashboardClient.useMemo[allPermissionCheckboxesSelected]": (a)=>Boolean(permissionMatrix[fid]?.[a])
                    }["DashboardClient.useMemo[allPermissionCheckboxesSelected]"])
            }["DashboardClient.useMemo[allPermissionCheckboxesSelected]"]);
        }
    }["DashboardClient.useMemo[allPermissionCheckboxesSelected]"], [
        permissionMatrix
    ]);
    function toggleSelectAllPermissions() {
        setPermissionMatrix(allPermissionCheckboxesSelected ? makeEmptyMatrix() : makeFullMatrix());
    }
    async function resetPermissionMatrixToDefaults(userId) {
        if (!window.confirm("Reset this user's permissions to the built-in defaults for their current role? Any custom permission changes will be removed.")) {
            return;
        }
        setPermissionsResetting(true);
        try {
            const res = await fetch(`/api/admin/permissions/${userId}`, {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) {
                throw new Error(data.error || 'Failed to reset permissions');
            }
            if (data?.features) setPermissionMatrix(data.features);
            else await loadPermissionMatrix(userId);
            toast.success('Permissions reset to role defaults');
        } catch (e) {
            toast.error(catchMessage(e, 'Failed to reset permissions'));
        } finally{
            setPermissionsResetting(false);
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
            toast.error(catchMessage(e, 'Failed to load about stats'));
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
            toast.success('Saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Save failed'));
        } finally{
            setAsSaving(false);
        }
    }
    async function deleteAboutStat(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this stat?');
        if (!ok) return;
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
            toast.success('Deleted');
        } catch (e) {
            toast.error(catchMessage(e, 'Delete failed'));
        }
    }
    // ==================== ABOUT TEAM STATE [SEARCH: ABOUT TEAM, CRUD] ====================
    const [aboutTeam, setAboutTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [atLoading, setAtLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    const [aboutPageIntro, setAboutPageIntro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        titleEn: '',
        titleVi: '',
        bodyEn: '',
        bodyVi: '',
        heroImageUrl: '',
        heroImageAltEn: '',
        heroImageAltVi: ''
    });
    const [aiIntroLoading, setAiIntroLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aiIntroSaving, setAiIntroSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heroIntroImageLibraryOpen, setHeroIntroImageLibraryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heroIntroImageLibraryLoading, setHeroIntroImageLibraryLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heroIntroImageLibraryList, setHeroIntroImageLibraryList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [heroIntroImageUploading, setHeroIntroImageUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const heroIntroImageFileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    async function loadAboutIntro() {
        setAiIntroLoading(true);
        try {
            const res = await fetch('/api/admin/about-intro', {
                credentials: 'include'
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Failed to load about intro');
            }
            const data = await res.json();
            setAboutPageIntro({
                titleEn: data.titleEn ?? '',
                titleVi: data.titleVi ?? '',
                bodyEn: data.bodyEn ?? '',
                bodyVi: data.bodyVi ?? '',
                heroImageUrl: data.heroImageUrl ?? '',
                heroImageAltEn: data.heroImageAltEn ?? '',
                heroImageAltVi: data.heroImageAltVi ?? ''
            });
        } catch (e) {
            toast.error(catchMessage(e, 'Failed to load about intro'));
        } finally{
            setAiIntroLoading(false);
        }
    }
    async function saveAboutIntro() {
        setAiIntroSaving(true);
        try {
            const res = await fetch('/api/admin/about-intro', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aboutPageIntro)
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
                const data = await res.json().catch(()=>({}));
                throw new Error(data?.error || 'Save failed');
            }
            toast.success('About introduction saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Save failed'));
        } finally{
            setAiIntroSaving(false);
        }
    }
    const openHeroIntroImageLibrary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[openHeroIntroImageLibrary]": async ()=>{
            if (!can('aboutTeam', 'update')) return;
            if (!can('media', 'read')) {
                toast.error('Media read permission is required to browse uploaded images.');
                return;
            }
            setHeroIntroImageLibraryOpen(true);
            setHeroIntroImageLibraryLoading(true);
            try {
                const res = await fetch('/api/admin/media?take=100', {
                    credentials: 'include'
                });
                if (!res.ok) {
                    setHeroIntroImageLibraryList([]);
                    return;
                }
                const list = await res.json();
                setHeroIntroImageLibraryList(Array.isArray(list) ? list : []);
            } catch  {
                setHeroIntroImageLibraryList([]);
            } finally{
                setHeroIntroImageLibraryLoading(false);
            }
        }
    }["DashboardClient.useCallback[openHeroIntroImageLibrary]"], [
        can,
        toast
    ]);
    const uploadHeroIntroImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[uploadHeroIntroImage]": async (file)=>{
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
                const res = await fetch('/api/admin/media', {
                    method: 'POST',
                    credentials: 'include',
                    body: fd
                });
                const data = await res.json().catch({
                    "DashboardClient.useCallback[uploadHeroIntroImage]": ()=>({})
                }["DashboardClient.useCallback[uploadHeroIntroImage]"]);
                if (!res.ok) throw new Error(data.error || 'Upload failed');
                if (data.media?.url) {
                    setAboutPageIntro({
                        "DashboardClient.useCallback[uploadHeroIntroImage]": (x)=>({
                                ...x,
                                heroImageUrl: data.media.url
                            })
                    }["DashboardClient.useCallback[uploadHeroIntroImage]"]);
                    toast.success('Image uploaded. Save introduction to publish.');
                }
            } catch (e) {
                toast.error(catchMessage(e, 'Upload failed'));
            } finally{
                setHeroIntroImageUploading(false);
                if (heroIntroImageFileRef.current) heroIntroImageFileRef.current.value = '';
            }
        }
    }["DashboardClient.useCallback[uploadHeroIntroImage]"], [
        can,
        toast
    ]);
    function pickHeroIntroImageFromLibrary(row) {
        setAboutPageIntro((x)=>({
                ...x,
                heroImageUrl: row.url
            }));
        setHeroIntroImageLibraryOpen(false);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (!heroIntroImageLibraryOpen) return;
            const onKeyDown = {
                "DashboardClient.useEffect.onKeyDown": (e)=>{
                    if (e.key === 'Escape') setHeroIntroImageLibraryOpen(false);
                }
            }["DashboardClient.useEffect.onKeyDown"];
            document.addEventListener('keydown', onKeyDown);
            return ({
                "DashboardClient.useEffect": ()=>document.removeEventListener('keydown', onKeyDown)
            })["DashboardClient.useEffect"];
        }
    }["DashboardClient.useEffect"], [
        heroIntroImageLibraryOpen
    ]);
    async function loadAboutTeam() {
        setAtLoading(true);
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
            toast.error(catchMessage(e, 'Failed to load about team'));
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
            toast.success('Saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Save failed'));
        } finally{
            setAtSaving(false);
        }
    }
    async function deleteAboutTeam(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this team member?');
        if (!ok) return;
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
            toast.success('Deleted');
        } catch (e) {
            toast.error(catchMessage(e, 'Delete failed'));
        }
    }
    // ==================== SERVICES STATE [SEARCH: SERVICES, CRUD] ====================
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [svLoading, setSvLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
            toast.error(catchMessage(e, 'Failed to load services'));
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
            toast.success('Saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Save failed'));
        } finally{
            setSvSaving(false);
        }
    }
    async function deleteService(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this service?');
        if (!ok) return;
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
            toast.success('Deleted');
        } catch (e) {
            toast.error(catchMessage(e, 'Delete failed'));
        }
    }
    async function loadHomeFeatures() {
        setHfLoading(true);
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
            toast.error(catchMessage(e, 'Failed to load home features'));
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
            if (activeTab === 'aboutTeam') {
                void loadAboutTeam();
                void loadAboutIntro();
            }
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
            toast.success('Saved');
        } catch (e) {
            toast.error(catchMessage(e, 'Save failed'));
        } finally{
            setHfSaving(false);
        }
    }
    async function deleteHomeFeature(id) {
        const ok = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.confirm('Delete this feature?');
        if (!ok) return;
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
            toast.success('Deleted');
        } catch (e) {
            toast.error(catchMessage(e, 'Delete failed'));
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
                lineNumber: 1116,
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
                                            lineNumber: 1126,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-bold text-white mt-1",
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1125,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl",
                                    "aria-label": `${stat.label} icon`,
                                    children: stat.icon
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1129,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                            lineNumber: 1124,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1122,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                lineNumber: 1120,
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
                                lineNumber: 1143,
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
                                            lineNumber: 1146,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1145,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-4 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/70",
                                            children: "💡 Tip: Keep your content updated regularly for better engagement."
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1149,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1144,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1142,
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
                                                lineNumber: 1160,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage the features grid shown on the public home page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1161,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1159,
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
                                                lineNumber: 1164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateHomeFeature,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Feature"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1163,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1158,
                                columnNumber: 13
                            }, this),
                            hfLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1175,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: homeFeatures.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No features yet. Click “Add Feature” to create the first one."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1179,
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
                                                        lineNumber: 1186,
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
                                                                        lineNumber: 1189,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !f.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1191,
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
                                                                        lineNumber: 1195,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1188,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: f.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1199,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1187,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1185,
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
                                                        lineNumber: 1203,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteHomeFeature(f.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1206,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1202,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, f.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1184,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1177,
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
                                        lineNumber: 1219,
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
                                                                lineNumber: 1223,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Icon can be emoji (e.g. ⚡) or short text."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1224,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1222,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setHfModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1226,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1221,
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
                                                                lineNumber: 1237,
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
                                                                lineNumber: 1238,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1236,
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
                                                                lineNumber: 1246,
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
                                                                lineNumber: 1247,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1245,
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
                                                                lineNumber: 1255,
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
                                                                lineNumber: 1256,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1254,
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
                                                                lineNumber: 1264,
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
                                                                lineNumber: 1265,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1263,
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
                                                                lineNumber: 1274,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on home page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1280,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1273,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1235,
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
                                                        lineNumber: 1285,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveHomeFeature,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: hfSaving,
                                                        children: hfSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1284,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1220,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1218,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1157,
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
                                                lineNumber: 1307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage the statistics cards on the About page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1308,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1306,
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
                                                lineNumber: 1311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateAboutStat,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Stat"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1310,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1305,
                                columnNumber: 13
                            }, this),
                            asLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1322,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: aboutStats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No stats yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1326,
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
                                                            lineNumber: 1332,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1333,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/80",
                                                            children: s.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 27
                                                        }, this),
                                                        !s.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                            children: "Inactive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1336,
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
                                                            lineNumber: 1340,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1331,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1330,
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
                                                        lineNumber: 1346,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteAboutStat(s.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1349,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1345,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1329,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1324,
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
                                        lineNumber: 1361,
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
                                                                lineNumber: 1365,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Example: “150+” — “Projects Completed”."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1366,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1364,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAsModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1368,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1363,
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
                                                                lineNumber: 1379,
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
                                                                lineNumber: 1380,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1378,
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
                                                                lineNumber: 1388,
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
                                                                lineNumber: 1389,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1387,
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
                                                                lineNumber: 1397,
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
                                                                lineNumber: 1398,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1396,
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
                                                                lineNumber: 1406,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on About page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1412,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1405,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1377,
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
                                                        lineNumber: 1417,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveAboutStat,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: asSaving,
                                                        children: asSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1420,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1416,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1362,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1360,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1304,
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
                                                lineNumber: 1435,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Edit the About page introduction and team members (public site)."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1436,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1434,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    void loadAboutTeam();
                                                    void loadAboutIntro();
                                                },
                                                className: "bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1439,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateAboutTeam,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Member"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1448,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1438,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1433,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8 glass p-6 rounded-2xl border border-white/10 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-white",
                                                children: "About page — introduction"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1456,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void saveAboutIntro(),
                                                className: "cta-button px-5 py-2 text-sm shrink-0 disabled:opacity-50",
                                                disabled: aiIntroSaving || aiIntroLoading || !can('aboutTeam', 'update'),
                                                children: aiIntroSaving ? 'Saving…' : 'Save introduction'
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1457,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1455,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/60 text-sm",
                                        children: "Shown in the top content block on the public About page (above statistics). Use a blank line between paragraphs. The hero image also appears on the Home page (right column of the hero)."
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1466,
                                        columnNumber: 15
                                    }, this),
                                    aiIntroLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/70 text-sm",
                                        children: "Loading introduction…"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1470,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-white/10 bg-white/5 p-4 space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/80 text-sm font-medium",
                                                        children: "Home & About — hero image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1474,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-xs",
                                                        children: [
                                                            "Use an external URL, upload a new image, or pick from the media library (saved under ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                className: "text-white/60",
                                                                children: "/uploads/library/"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1476,
                                                                columnNumber: 106
                                                            }, this),
                                                            "). Leave empty for the default emoji on Home."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1475,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-start gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative w-28 h-20 rounded-lg border border-white/20 bg-white/5 overflow-hidden shrink-0",
                                                                children: aboutPageIntro.heroImageUrl.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: aboutPageIntro.heroImageUrl.trim(),
                                                                    alt: "",
                                                                    fill: true,
                                                                    className: "object-cover",
                                                                    sizes: "112px",
                                                                    unoptimized: /^https?:\/\//i.test(aboutPageIntro.heroImageUrl.trim())
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1481,
                                                                    columnNumber: 25
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full h-full flex items-center justify-center text-white/35 text-2xl",
                                                                    children: "🎨"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1490,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1479,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-[12rem] space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/70 text-xs",
                                                                                children: "Image URL"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1495,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                value: aboutPageIntro.heroImageUrl,
                                                                                onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                            ...x,
                                                                                            heroImageUrl: e.target.value
                                                                                        })),
                                                                                readOnly: !can('aboutTeam', 'update'),
                                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70",
                                                                                placeholder: "https://… or /uploads/library/…"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1496,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1494,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-wrap gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>void openHeroIntroImageLibrary(),
                                                                                disabled: !can('aboutTeam', 'update') || !can('media', 'read'),
                                                                                className: "bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 disabled:opacity-40 disabled:pointer-events-none",
                                                                                children: "Select from uploaded"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1505,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: `inline-flex items-center gap-2 bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 cursor-pointer ${!can('aboutTeam', 'update') || !can('media', 'create') || heroIntroImageUploading ? 'opacity-40 pointer-events-none' : ''}`,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        ref: heroIntroImageFileRef,
                                                                                        type: "file",
                                                                                        accept: "image/jpeg,image/png,image/webp,image/gif",
                                                                                        className: "hidden",
                                                                                        disabled: heroIntroImageUploading || !can('aboutTeam', 'update') || !can('media', 'create'),
                                                                                        onChange: (e)=>void uploadHeroIntroImage(e.target.files?.[0] ?? null)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                        lineNumber: 1520,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    heroIntroImageUploading ? 'Uploading…' : 'Upload file'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1513,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1504,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    (!can('media', 'read') || !can('media', 'create')) && can('aboutTeam', 'update') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-amber-200/80 text-xs",
                                                                        children: [
                                                                            "Upload and library need ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/90",
                                                                                children: "Media"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 1535,
                                                                                columnNumber: 51
                                                                            }, this),
                                                                            " permissions (read / create) in your role."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1534,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1493,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Alt text (English)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1542,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: aboutPageIntro.heroImageAltEn,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    heroImageAltEn: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1543,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1541,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Alt text (Tiếng Việt)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1551,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: aboutPageIntro.heroImageAltVi,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    heroImageAltVi: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1552,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1550,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1540,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/80 text-sm font-medium",
                                                                children: "English"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1563,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Section title"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1565,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: aboutPageIntro.titleEn,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    titleEn: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1566,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1564,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Body (paragraphs separated by a blank line)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1574,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        value: aboutPageIntro.bodyEn,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    bodyEn: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        rows: 10,
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-mono text-sm read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1575,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1573,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1562,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/80 text-sm font-medium",
                                                                children: "Tiếng Việt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1585,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Tiêu đề mục"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1587,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: aboutPageIntro.titleVi,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    titleVi: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1588,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1586,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/70 text-xs",
                                                                        children: "Nội dung (đoạn cách nhau bằng một dòng trống)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1596,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        value: aboutPageIntro.bodyVi,
                                                                        onChange: (e)=>setAboutPageIntro((x)=>({
                                                                                    ...x,
                                                                                    bodyVi: e.target.value
                                                                                })),
                                                                        readOnly: !can('aboutTeam', 'update'),
                                                                        rows: 10,
                                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-mono text-sm read-only:opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1597,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1595,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1584,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1561,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1472,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1454,
                                columnNumber: 13
                            }, this),
                            atLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1612,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: aboutTeam.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No team members yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1616,
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
                                                        lineNumber: 1621,
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
                                                                        lineNumber: 1624,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-purple-200 text-sm",
                                                                        children: m.role
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1625,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !m.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1627,
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
                                                                        lineNumber: 1631,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1623,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: m.bio
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1635,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1622,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1620,
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
                                                        lineNumber: 1639,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteAboutTeam(m.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1642,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1638,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1619,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1614,
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
                                        lineNumber: 1654,
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
                                                                lineNumber: 1658,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Emoji is the avatar icon."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1659,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1657,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setAtModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1661,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1656,
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
                                                                lineNumber: 1672,
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
                                                                lineNumber: 1673,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1671,
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
                                                                lineNumber: 1681,
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
                                                                lineNumber: 1682,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1680,
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
                                                                lineNumber: 1690,
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
                                                                lineNumber: 1691,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1689,
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
                                                                lineNumber: 1699,
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
                                                                lineNumber: 1700,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1698,
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
                                                                lineNumber: 1708,
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
                                                                lineNumber: 1709,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1707,
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
                                                                lineNumber: 1717,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on About page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1723,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1716,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1670,
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
                                                        lineNumber: 1728,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveAboutTeam,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: atSaving,
                                                        children: atSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1731,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1727,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1655,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1653,
                                columnNumber: 15
                            }, this),
                            heroIntroImageLibraryOpen && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-[100] flex min-h-dvh w-full items-center justify-center p-4 sm:p-6",
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-labelledby": "hero-intro-picker-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/70",
                                        "aria-hidden": true,
                                        onClick: ()=>setHeroIntroImageLibraryOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1748,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 mx-auto w-full max-w-2xl max-h-[min(85vh,100dvh-2rem)] shrink-0 flex flex-col rounded-2xl border border-white/15 bg-[#12121a] shadow-2xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        id: "hero-intro-picker-title",
                                                        className: "text-lg font-semibold text-white",
                                                        children: "Pick hero image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1755,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setHeroIntroImageLibraryOpen(false),
                                                        className: "text-white/70 hover:text-white px-2 py-1 rounded",
                                                        children: "Close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1758,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1754,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-h-0 flex-1 overflow-y-auto p-4",
                                                children: heroIntroImageLibraryLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/60 text-sm",
                                                    children: "Loading…"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1768,
                                                    columnNumber: 25
                                                }, this) : heroIntroImageLibraryList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/60 text-sm",
                                                    children: "No images in the library yet. Upload files in the Media tab first."
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1770,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-3 sm:grid-cols-4 gap-3",
                                                    children: heroIntroImageLibraryList.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>pickHeroIntroImageFromLibrary(m),
                                                            className: "relative aspect-square rounded-lg border border-white/20 overflow-hidden hover:ring-2 hover:ring-white/40",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: m.url,
                                                                alt: "",
                                                                fill: true,
                                                                className: "object-cover",
                                                                sizes: "120px",
                                                                unoptimized: /^https?:\/\//i.test(m.url)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1782,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, m.id, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1776,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1774,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1766,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1753,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1742,
                                columnNumber: 17
                            }, this), document.body)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1432,
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
                                                lineNumber: 1807,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-sm mt-1",
                                                children: "Manage service cards shown on the Services page."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1808,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1806,
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
                                                lineNumber: 1811,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateService,
                                                className: "cta-button px-6 py-2",
                                                children: "+ Add Service"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1814,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1810,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1805,
                                columnNumber: 13
                            }, this),
                            svLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1822,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: services.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-4 rounded-lg text-white/70",
                                    children: "No services yet."
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1826,
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
                                                        lineNumber: 1831,
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
                                                                        lineNumber: 1834,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !s.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs px-2 py-0.5 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1836,
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
                                                                        lineNumber: 1840,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1833,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-sm mt-1",
                                                                children: s.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1844,
                                                                columnNumber: 27
                                                            }, this),
                                                            stringifyFeatures(s.features).trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/50 text-sm mt-2 whitespace-pre-line",
                                                                children: stringifyFeatures(s.features)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1846,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1832,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1830,
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
                                                        lineNumber: 1851,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteService(s.id),
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1854,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1850,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1829,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1824,
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
                                        lineNumber: 1866,
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
                                                                lineNumber: 1870,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Enter one feature per line."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1871,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1869,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSvModalOpen(false),
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1873,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1868,
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
                                                                lineNumber: 1884,
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
                                                                lineNumber: 1885,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1883,
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
                                                                lineNumber: 1893,
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
                                                                lineNumber: 1894,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1892,
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
                                                                lineNumber: 1902,
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
                                                                lineNumber: 1903,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1901,
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
                                                                lineNumber: 1910,
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
                                                                lineNumber: 1911,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1909,
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
                                                                lineNumber: 1919,
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
                                                                lineNumber: 1920,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1918,
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
                                                                lineNumber: 1929,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Active (show on Services page)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 1935,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1928,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1882,
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
                                                        lineNumber: 1940,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: saveService,
                                                        className: "cta-button px-6 py-2",
                                                        disabled: svSaving,
                                                        children: svSaving ? 'Saving...' : 'Save'
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 1943,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 1939,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1867,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1865,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1804,
                        columnNumber: 11
                    }, this),
                    activeTab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4 mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-white shrink-0",
                                            children: "User Management"
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1958,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full lg:w-auto lg:justify-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex flex-col gap-1.5 min-w-0 sm:min-w-48",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/70 text-xs font-medium uppercase tracking-wide",
                                                            children: "Role filter"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1961,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: userManagementRoleFilter,
                                                            onChange: (e)=>setUserManagementRoleFilter(e.target.value),
                                                            disabled: rolesLoading || !roles.length,
                                                            className: "bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                                            "aria-label": "Filter users by role",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    className: "bg-gray-800 text-white",
                                                                    children: "All roles"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 1969,
                                                                    columnNumber: 23
                                                                }, this),
                                                                rolesSortedByName.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: String(r.id),
                                                                        className: "bg-gray-800 text-white",
                                                                        children: r.name
                                                                    }, r.id, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 1973,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 1962,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1960,
                                                    columnNumber: 19
                                                }, this),
                                                can('users', 'create') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void openAddUserModal(),
                                                    className: "cta-button px-6 py-2 shrink-0",
                                                    children: "+ Add User"
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 1980,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 1959,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                    lineNumber: 1957,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1956,
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
                                        lineNumber: 1990,
                                        columnNumber: 42
                                    }, this),
                                    ". Password reset uses",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "User password → Update"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 1991,
                                        columnNumber: 17
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1989,
                                columnNumber: 15
                            }, this),
                            usersLoading || rolesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/80",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1996,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    usersFilteredForManagement.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/60 text-sm py-6",
                                        children: userManagementRoleFilter === '' ? 'No users yet.' : 'No users with this role. Choose another filter or All roles.'
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2000,
                                        columnNumber: 19
                                    }, this) : null,
                                    usersFilteredForManagement.map((user)=>{
                                        const roleName = roles.find((r)=>r.id === user.roleId)?.name || String(user.roleId);
                                        const isSysadminRow = roleName.toUpperCase() === 'SYSADMIN';
                                        const inactiveRow = !user.isActive;
                                        const opRoleName = sessionMe?.role?.name ?? '';
                                        const opIsSysadminOperator = opRoleName.toUpperCase() === 'SYSADMIN';
                                        const sameRoleLevelAsOperator = sessionMe != null && (user.id === sessionMe.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleRank"])(opRoleName) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleRank"])(roleName));
                                        const cannotChangeActiveStatus = !opIsSysadminOperator && sameRoleLevelAsOperator;
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
                                                            lineNumber: 2025,
                                                            columnNumber: 25
                                                        }, this),
                                                        user.displayName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/90 text-sm mt-0.5",
                                                            children: user.displayName
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2027,
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
                                                            lineNumber: 2029,
                                                            columnNumber: 25
                                                        }, this),
                                                        inactiveRow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-amber-200/90 text-xs mt-1.5 font-medium",
                                                            children: "Sign-in disabled — account is inactive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2031,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2024,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 items-center flex-wrap justify-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `inline-flex rounded-lg border border-white/30 overflow-hidden text-xs sm:text-sm font-medium shadow-sm ${!canEditUser || cannotChangeActiveStatus ? 'opacity-50' : ''}`,
                                                            role: "group",
                                                            "aria-label": "Account status",
                                                            title: cannotChangeActiveStatus ? 'Only SYSADMIN can change active status for you or users at your role level' : undefined,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    disabled: !canEditUser || cannotChangeActiveStatus,
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
                                                                            toast.error(data?.error || 'Update failed');
                                                                            return;
                                                                        }
                                                                        await loadUsers();
                                                                    },
                                                                    className: `px-3 py-2 min-w-18 transition-colors ${user.isActive ? 'bg-emerald-500/35 text-emerald-50 border-r border-white/20' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'}`,
                                                                    children: "Active"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2051,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    disabled: !canEditUser || isSysadminRow || cannotChangeActiveStatus,
                                                                    title: cannotChangeActiveStatus ? 'Only SYSADMIN can change active status for you or users at your role level' : isSysadminRow ? 'SYSADMIN account cannot be set inactive from here' : undefined,
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
                                                                            toast.error(data?.error || 'Update failed');
                                                                            return;
                                                                        }
                                                                        await loadUsers();
                                                                    },
                                                                    className: `px-3 py-2 min-w-18 transition-colors ${!user.isActive ? 'bg-red-500/30 text-red-100' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'} disabled:opacity-50 disabled:cursor-not-allowed`,
                                                                    children: "Inactive"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2077,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2039,
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
                                                                    toast.error(data?.error || 'Role update failed');
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
                                                                    lineNumber: 2142,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2113,
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
                                                            lineNumber: 2150,
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
                                                                    toast.error(data?.error || 'Reset failed');
                                                                    return;
                                                                }
                                                                toast.success('Password updated.');
                                                            },
                                                            className: `bg-amber-500/25 border border-amber-400/40 text-amber-50 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/35 transition-all ${!canResetPassword || inactiveRow ? 'opacity-50 cursor-not-allowed' : ''}`,
                                                            children: "Reset password"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2175,
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
                                                            lineNumber: 2203,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2037,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, user.id, true, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 2020,
                                            columnNumber: 21
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 1998,
                                columnNumber: 15
                            }, this),
                            addUserModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/60",
                                        onClick: closeAddUserModal,
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full max-w-md glass p-6 rounded-2xl border border-white/10",
                                        role: "dialog",
                                        "aria-labelledby": "add-user-title",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                id: "add-user-title",
                                                                className: "text-xl font-bold text-white",
                                                                children: "Add new user"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2239,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/60 text-sm mt-1",
                                                                children: "Creates an account that can sign in to the admin area. Feature permissions default to the template for the role you select below."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2242,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2238,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: closeAddUserModal,
                                                        disabled: addUserSaving,
                                                        className: "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded disabled:opacity-50",
                                                        "aria-label": "Close",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2247,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2237,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                className: "space-y-4",
                                                onSubmit: (e)=>{
                                                    e.preventDefault();
                                                    void submitAddUser();
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2266,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                autoComplete: "off",
                                                                value: addUserForm.email,
                                                                onChange: (e)=>setAddUserForm((f)=>({
                                                                            ...f,
                                                                            email: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "user@example.com"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2267,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2265,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2277,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "password",
                                                                autoComplete: "new-password",
                                                                value: addUserForm.password,
                                                                onChange: (e)=>setAddUserForm((f)=>({
                                                                            ...f,
                                                                            password: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "Initial password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2278,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2276,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Display name (optional)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2288,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: addUserForm.displayName,
                                                                onChange: (e)=>setAddUserForm((f)=>({
                                                                            ...f,
                                                                            displayName: e.target.value
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30",
                                                                placeholder: "Shown in the admin UI"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2289,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2287,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Role"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2298,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/45 text-xs mt-0.5 mb-1",
                                                                children: "Default feature permissions for this role are applied when the user is created."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2299,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: addUserForm.roleId === '' ? '' : String(addUserForm.roleId),
                                                                onChange: (e)=>setAddUserForm((f)=>({
                                                                            ...f,
                                                                            roleId: e.target.value === '' ? '' : Number(e.target.value)
                                                                        })),
                                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer",
                                                                "aria-label": "Role for new user",
                                                                children: roles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    className: "bg-gray-800 text-white",
                                                                    children: "No roles loaded"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2314,
                                                                    columnNumber: 27
                                                                }, this) : roles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: r.id,
                                                                        className: "bg-gray-800 text-white",
                                                                        children: r.name
                                                                    }, r.id, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2319,
                                                                        columnNumber: 29
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2302,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2297,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-sm",
                                                                children: "Account status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2328,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 inline-flex w-full max-w-sm rounded-lg border border-white/30 overflow-hidden text-sm font-medium shadow-sm",
                                                                role: "group",
                                                                "aria-label": "Account status for new user",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setAddUserForm((f)=>({
                                                                                    ...f,
                                                                                    isActive: true
                                                                                })),
                                                                        className: `flex-1 px-3 py-2 transition-colors ${addUserForm.isActive ? 'bg-emerald-500/35 text-emerald-50 border-r border-white/20' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'}`,
                                                                        children: "Active"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2334,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setAddUserForm((f)=>({
                                                                                    ...f,
                                                                                    isActive: false
                                                                                })),
                                                                        className: `flex-1 px-3 py-2 transition-colors ${!addUserForm.isActive ? 'bg-red-500/30 text-red-100' : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'}`,
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2345,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2329,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/50 text-xs mt-1.5",
                                                                children: "Inactive accounts cannot sign in until someone sets them to Active."
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2357,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2327,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end gap-2 pt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: closeAddUserModal,
                                                                className: "bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20",
                                                                disabled: addUserSaving,
                                                                children: "Cancel"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2364,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "submit",
                                                                className: "cta-button px-6 py-2",
                                                                disabled: addUserSaving || roles.length === 0,
                                                                children: addUserSaving ? 'Creating…' : 'Create user'
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2372,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2363,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2258,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2232,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2230,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 1955,
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
                                        lineNumber: 2387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/60 text-sm",
                                        children: can('permissions', 'update') ? 'Click a user row to edit CRUD per feature. Users = list/create/role/active; User password = reset password.' : 'View only — you need permissions.update to change checkboxes.'
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col lg:flex-row gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full lg:w-80 flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex flex-col gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/70 text-xs font-medium uppercase tracking-wide",
                                                                children: "Filter by role"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2399,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: permissionsTabRoleFilter,
                                                                onChange: (e)=>setPermissionsTabRoleFilter(e.target.value),
                                                                disabled: usersLoading || rolesLoading || !roles.length,
                                                                className: "w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                                                "aria-label": "Filter permission users by role",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        className: "bg-gray-800 text-white",
                                                                        children: "All roles"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2407,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    rolesSortedByName.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: String(r.id),
                                                                            className: "bg-gray-800 text-white",
                                                                            children: r.name
                                                                        }, r.id, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2411,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2400,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex flex-col gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/70 text-xs font-medium uppercase tracking-wide",
                                                                children: "Filter by user"
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2418,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: permissionsTabUserFilterValid ? permissionsTabUserFilter : '',
                                                                onChange: (e)=>{
                                                                    const v = e.target.value;
                                                                    setPermissionsTabUserFilter(v);
                                                                    if (v === '') return;
                                                                    const id = Number(v);
                                                                    if (!Number.isFinite(id)) return;
                                                                    setSelectedPermissionUserId(id);
                                                                },
                                                                disabled: usersLoading || rolesLoading || usersMatchingPermissionsRoleFilter.length === 0,
                                                                className: "w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                                                "aria-label": "Filter permission users by name",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        className: "bg-gray-800 text-white",
                                                                        children: "All users"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2433,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    usersMatchingPermissionsRoleFilter.map((u)=>{
                                                                        const d = (u.displayName ?? '').trim();
                                                                        const line = d && d.toLowerCase() !== u.email.toLowerCase() ? `${d} (${u.email})` : u.email;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: String(u.id),
                                                                            className: "bg-gray-800 text-white",
                                                                            children: !u.isActive ? `${line} — Inactive` : line
                                                                        }, u.id, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2443,
                                                                            columnNumber: 27
                                                                        }, this);
                                                                    })
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2419,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2417,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    usersForPermissionsChooserList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/55 text-sm py-2",
                                                        children: "No users match these filters."
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2454,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    usersForPermissionsChooserList.map((user)=>{
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
                                                                                children: permissionChooserUserLabel(user)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 2480,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm text-white/70 mt-0.5",
                                                                                children: user.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 2481,
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
                                                                                lineNumber: 2482,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2479,
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
                                                                                lineNumber: 2486,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            user.isProtected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs px-2 py-1 rounded-full bg-gray-700/40 border border-gray-600/30 text-gray-200",
                                                                                children: "Protected"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 2491,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2484,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2478,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, user.id, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2461,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2452,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: !selectedPermissionUserId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 border border-white/15 rounded-xl p-6 text-white/70",
                                            children: "Select a user to edit permissions."
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 2505,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 border border-white/15 rounded-xl p-4",
                                            children: [
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
                                                                    lineNumber: 2512,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-white/60 text-sm mt-1",
                                                                    children: "SYSADMIN cannot be changed (protected)."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2515,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2511,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: toggleSelectAllPermissions,
                                                                    className: "bg-white/20 text-white px-4 py-2 rounded-lg font-medium border border-white/25 hover:bg-white/30",
                                                                    disabled: permissionsLoading || permissionsSaving || permissionsResetting || selectedPermissionUser?.isProtected === true || !can('permissions', 'update'),
                                                                    title: allPermissionCheckboxesSelected ? 'Clear every permission checkbox (save to apply)' : 'Select every permission checkbox (save to apply)',
                                                                    children: allPermissionCheckboxesSelected ? 'Deselect all' : 'Select all'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2521,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        if (selectedPermissionUserId != null) {
                                                                            void resetPermissionMatrixToDefaults(selectedPermissionUserId);
                                                                        }
                                                                    },
                                                                    className: "bg-amber-500/25 border border-amber-400/35 text-amber-50 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/35",
                                                                    disabled: permissionsLoading || permissionsSaving || permissionsResetting || selectedPermissionUser?.isProtected === true || !can('permissions', 'update'),
                                                                    title: "Replace custom User permissions with the template for this user’s current role",
                                                                    children: permissionsResetting ? 'Resetting...' : 'Default permissions'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2540,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        if (selectedPermissionUserId != null) savePermissionMatrix(selectedPermissionUserId);
                                                                    },
                                                                    className: "cta-button px-6 py-2",
                                                                    disabled: permissionsLoading || permissionsSaving || permissionsResetting || selectedPermissionUser?.isProtected === true || !can('permissions', 'update'),
                                                                    children: permissionsSaving ? 'Saving...' : 'Save'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2559,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                            lineNumber: 2520,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2510,
                                                    columnNumber: 21
                                                }, this),
                                                permissionsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-white/80",
                                                    children: "Loading permissions..."
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2579,
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
                                                                            lineNumber: 2585,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Create"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2586,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Read"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2587,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Update"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2588,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "py-3 px-3 text-white/70 text-sm font-semibold border-b border-white/15",
                                                                            children: "Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                            lineNumber: 2589,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                    lineNumber: 2584,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2583,
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
                                                                                            lineNumber: 2597,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-white font-medium",
                                                                                            children: f.label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                            lineNumber: 2598,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                    lineNumber: 2596,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                lineNumber: 2595,
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
                                                                                                disabled: disabled || permissionsSaving || permissionsResetting,
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
                                                                                                lineNumber: 2612,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-white/70 text-sm",
                                                                                                children: action.toUpperCase().slice(0, 1)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                                lineNumber: 2625,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                        lineNumber: 2607,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                }, action, false, {
                                                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                                    lineNumber: 2606,
                                                                                    columnNumber: 37
                                                                                }, this);
                                                                            })
                                                                        ]
                                                                    }, f.id, true, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                        lineNumber: 2594,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                                lineNumber: 2592,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2582,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2581,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                            lineNumber: 2509,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2503,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2395,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2385,
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
                                        lineNumber: 2647,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Add Product"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2648,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2646,
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
                                                        lineNumber: 2654,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "Status: Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2655,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2653,
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
                                                        lineNumber: 2658,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2659,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2657,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2652,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2650,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2645,
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
                                        lineNumber: 2670,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Add News"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2669,
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
                                                        lineNumber: 2677,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "Tags: Updates, News"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2678,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2676,
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
                                                        lineNumber: 2681,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2682,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2680,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2675,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2673,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2668,
                        columnNumber: 11
                    }, this),
                    activeTab === 'media' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: "Media Library"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2693,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-white/70 text-sm whitespace-nowrap",
                                                children: [
                                                    "Subfolder",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: mediaFolder,
                                                        onChange: (e)=>setMediaFolder(e.target.value),
                                                        placeholder: "library",
                                                        className: "ml-2 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm w-36",
                                                        disabled: !can('media', 'create')
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2697,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2695,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: mediaFileInputRef,
                                                type: "file",
                                                className: "hidden",
                                                accept: "image/jpeg,image/png,image/webp,image/gif,application/pdf,video/mp4,video/webm",
                                                onChange: (e)=>void uploadMediaFile(e.target.files?.[0] ?? null)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2706,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "cta-button px-6 py-2 disabled:opacity-50",
                                                disabled: !can('media', 'create') || mediaUploading,
                                                onClick: ()=>mediaFileInputRef.current?.click(),
                                                children: mediaUploading ? 'Uploading…' : '+ Upload Media'
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2713,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2694,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2692,
                                columnNumber: 13
                            }, this),
                            mediaLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60",
                                children: "Loading…"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2724,
                                columnNumber: 15
                            }, this) : mediaList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50",
                                children: [
                                    "No files yet. Uploads are stored under ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-white/70",
                                        children: "public/uploads/<subfolder>/"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2726,
                                        columnNumber: 83
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2726,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: mediaList.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 p-3 rounded-lg text-center overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `aspect-square relative mb-2 bg-black/20 rounded overflow-hidden ${m.mimeType.startsWith('image/') ? '' : 'flex items-center justify-center'}`,
                                                children: m.mimeType.startsWith('image/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: m.url,
                                                    alt: "",
                                                    fill: true,
                                                    className: "object-contain",
                                                    sizes: "(max-width: 768px) 50vw, 25vw",
                                                    unoptimized: true
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2737,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-4xl",
                                                    children: m.mimeType.includes('pdf') ? '📄' : m.mimeType.startsWith('video/') ? '🎬' : '📎'
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                    lineNumber: 2746,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2731,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/80 text-xs truncate",
                                                title: m.filename,
                                                children: m.filename
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2755,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/40 text-[10px] truncate",
                                                children: m.folder
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2758,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2730,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2728,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2691,
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
                                        lineNumber: 2769,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "cta-button px-6 py-2",
                                        children: "+ Create Banner"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2770,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2768,
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
                                                        lineNumber: 2776,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-sm",
                                                        children: "3 slides"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2777,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2775,
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
                                                        lineNumber: 2780,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2781,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2779,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2774,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2772,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2767,
                        columnNumber: 11
                    }, this),
                    activeTab === 'contacts' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white mb-6",
                                children: "Contact Messages"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2791,
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
                                                                lineNumber: 2797,
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
                                                                lineNumber: 2798,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2796,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm",
                                                        children: "New"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                        lineNumber: 2800,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2795,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/70",
                                                children: "This is a contact message from the user..."
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                                lineNumber: 2802,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                        lineNumber: 2794,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                                lineNumber: 2792,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                        lineNumber: 2790,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/dashboard/DashboardClient.tsx",
                lineNumber: 1139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(DashboardClient, "WqhHpFCqg7/hvP+IvDgjfc+K/ls=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
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

//# sourceMappingURL=WebPortal_vuleits-website_src_972a2c98._.js.map