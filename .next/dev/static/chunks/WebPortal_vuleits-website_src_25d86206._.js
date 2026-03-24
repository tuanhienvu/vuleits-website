(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebPortal/vuleits-website/src/components/BrandingLogo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandingLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function BrandingLogo({ src, alt, sizes, className, imgClassName, priority }) {
    const remote = /^https?:\/\//i.test(src);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className ? `${className} relative` : 'relative',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: alt,
            fill: true,
            sizes: sizes,
            className: imgClassName ?? 'object-contain rounded-full',
            priority: priority,
            unoptimized: remote
        }, void 0, false, {
            fileName: "[project]/WebPortal/vuleits-website/src/components/BrandingLogo.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/BrandingLogo.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = BrandingLogo;
var _c;
__turbopack_context__.k.register(_c, "BrandingLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/hooks/useCompanyBranding.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_BRAND_LOGO",
    ()=>DEFAULT_BRAND_LOGO,
    "FALLBACK_COMPANY_NAME",
    ()=>FALLBACK_COMPANY_NAME,
    "useCompanyBranding",
    ()=>useCompanyBranding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const DEFAULT_BRAND_LOGO = '/Logo.jpg';
const FALLBACK_COMPANY_NAME = 'VULE ITS';
function useCompanyBranding() {
    _s();
    const [payload, setPayload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCompanyBranding.useEffect": ()=>{
            let cancelled = false;
            ({
                "useCompanyBranding.useEffect": async ()=>{
                    try {
                        const res = await fetch('/api/company/branding');
                        if (!res.ok || cancelled) return;
                        const j = await res.json();
                        if (cancelled) return;
                        setPayload({
                            companyName: typeof j.companyName === 'string' ? j.companyName : '',
                            slogan: typeof j.slogan === 'string' ? j.slogan : '',
                            logoUrl: typeof j.logoUrl === 'string' ? j.logoUrl : ''
                        });
                    } catch  {
                        if (!cancelled) setPayload({
                            companyName: '',
                            slogan: '',
                            logoUrl: ''
                        });
                    }
                }
            })["useCompanyBranding.useEffect"]();
            return ({
                "useCompanyBranding.useEffect": ()=>{
                    cancelled = true;
                }
            })["useCompanyBranding.useEffect"];
        }
    }["useCompanyBranding.useEffect"], []);
    const logoSrc = (payload?.logoUrl || '').trim() || DEFAULT_BRAND_LOGO;
    const companyName = (payload?.companyName || '').trim() || FALLBACK_COMPANY_NAME;
    const slogan = (payload?.slogan || '').trim();
    return {
        logoSrc,
        companyName,
        slogan,
        loaded: payload !== null
    };
}
_s(useCompanyBranding, "ElvSi9GDSRA5bjYosaFe7y2BVn0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Client-safe permission model (no Prisma). Keep in sync with effectivePermissions server helpers. */ __turbopack_context__.s([
    "UI_FEATURES",
    ()=>UI_FEATURES,
    "makeEmptyAdminMatrix",
    ()=>makeEmptyAdminMatrix
]);
const UI_FEATURES = [
    'overview',
    'services',
    'products',
    'news',
    'media',
    'banners',
    'homeFeatures',
    'contacts',
    'aboutTeam',
    'aboutStats',
    'users',
    'userPassword',
    'permissions'
];
function makeEmptyAdminMatrix() {
    const out = {};
    for (const f of UI_FEATURES){
        out[f] = {
            create: false,
            read: false,
            update: false,
            delete: false
        };
    }
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminPermissionProvider",
    ()=>AdminPermissionProvider,
    "useAdminPermissions",
    ()=>useAdminPermissions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AdminPermissionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AdminPermissionProvider({ children }) {
    _s();
    const [matrix, setMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AdminPermissionProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])()
    }["AdminPermissionProvider.useState"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminPermissionProvider.useCallback[refresh]": async ()=>{
            try {
                const res = await fetch('/api/admin/me-permissions', {
                    credentials: 'include'
                });
                if (!res.ok) {
                    if (res.status === 401) window.location.href = '/admin/login';
                    return;
                }
                const data = await res.json();
                if (data?.features && typeof data.features === 'object') {
                    setMatrix(data.features);
                }
            } catch  {
            // keep matrix as empty
            } finally{
                setLoading(false);
            }
        }
    }["AdminPermissionProvider.useCallback[refresh]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPermissionProvider.useEffect": ()=>{
            void refresh();
        }
    }["AdminPermissionProvider.useEffect"], [
        refresh
    ]);
    const can = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminPermissionProvider.useCallback[can]": (feature, action)=>Boolean(matrix[feature]?.[action])
    }["AdminPermissionProvider.useCallback[can]"], [
        matrix
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminPermissionProvider.useMemo[value]": ()=>({
                matrix,
                loading,
                refresh,
                can
            })
    }["AdminPermissionProvider.useMemo[value]"], [
        matrix,
        loading,
        refresh,
        can
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminPermissionContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx",
        lineNumber: 64,
        columnNumber: 10
    }, this);
}
_s(AdminPermissionProvider, "rSzIUZa3/R55TxFFFZl+8SVkd4I=");
_c = AdminPermissionProvider;
function useAdminPermissions() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AdminPermissionContext);
    if (!ctx) {
        throw new Error('useAdminPermissions must be used inside AdminPermissionProvider');
    }
    return ctx;
}
_s1(useAdminPermissions, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AdminPermissionProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$BrandingLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/BrandingLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$hooks$2f$useCompanyBranding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/hooks/useCompanyBranding.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const { logoSrc, companyName, slogan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$hooks$2f$useCompanyBranding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyBranding"])();
    const brandSubtitle = slogan || t('admin.panel');
    const { can, loading: permsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"])();
    const allowTab = (id)=>permsLoading || can(id, 'read');
    const [showCompanyProfileNav, setShowCompanyProfileNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminSidebar.useMemo[activeTab]": ()=>searchParams.get('tab') || 'overview'
    }["AdminSidebar.useMemo[activeTab]"], [
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminSidebar.useEffect": ()=>{
            let cancelled = false;
            ({
                "AdminSidebar.useEffect": async ()=>{
                    try {
                        const res = await fetch('/api/admin/me', {
                            credentials: 'include'
                        });
                        if (!res.ok || cancelled) return;
                        const d = await res.json();
                        const n = (d.role?.name || '').toUpperCase();
                        if (!cancelled) setShowCompanyProfileNav(n === 'ADMIN' || n === 'SYSADMIN');
                    } catch  {
                        if (!cancelled) setShowCompanyProfileNav(false);
                    }
                }
            })["AdminSidebar.useEffect"]();
            return ({
                "AdminSidebar.useEffect": ()=>{
                    cancelled = true;
                }
            })["AdminSidebar.useEffect"];
        }
    }["AdminSidebar.useEffect"], []);
    const menuGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminSidebar.useMemo[menuGroups]": ()=>[
                {
                    id: 'overview',
                    label: t('admin.overview'),
                    items: [
                        {
                            kind: 'tab',
                            id: 'overview',
                            label: t('admin.overview'),
                            icon: '📊',
                            path: '/admin/dashboard?tab=overview'
                        }
                    ]
                },
                {
                    id: 'contents',
                    label: t('admin.contents'),
                    items: [
                        {
                            kind: 'tab',
                            id: 'news',
                            label: t('admin.news'),
                            icon: '📰',
                            path: '/admin/dashboard?tab=news'
                        },
                        {
                            kind: 'tab',
                            id: 'media',
                            label: t('admin.media'),
                            icon: '🖼️',
                            path: '/admin/dashboard?tab=media'
                        },
                        {
                            kind: 'tab',
                            id: 'banners',
                            label: t('admin.banners'),
                            icon: '🎬',
                            path: '/admin/dashboard?tab=banners'
                        }
                    ]
                },
                {
                    id: 'products',
                    label: t('admin.productGroup'),
                    items: [
                        {
                            kind: 'tab',
                            id: 'services',
                            label: t('admin.services'),
                            icon: '🧩',
                            path: '/admin/dashboard?tab=services'
                        },
                        {
                            kind: 'tab',
                            id: 'products',
                            label: t('admin.products'),
                            icon: '📦',
                            path: '/admin/dashboard?tab=products'
                        }
                    ]
                },
                {
                    id: 'authority',
                    label: t('admin.permissionGroup'),
                    items: [
                        {
                            kind: 'tab',
                            id: 'users',
                            label: t('admin.users'),
                            icon: '👥',
                            path: '/admin/dashboard?tab=users'
                        },
                        {
                            kind: 'tab',
                            id: 'permissions',
                            label: t('admin.permissions'),
                            icon: '🔐',
                            path: '/admin/dashboard?tab=permissions'
                        }
                    ]
                },
                {
                    id: 'settings',
                    label: t('admin.settings'),
                    items: [
                        {
                            kind: 'page',
                            id: 'companyProfile',
                            label: t('admin.companyProfile'),
                            icon: '🏢',
                            path: '/admin/company-profile'
                        },
                        {
                            kind: 'tab',
                            id: 'homeFeatures',
                            label: t('admin.homeFeatures'),
                            icon: '🏠',
                            path: '/admin/dashboard?tab=homeFeatures'
                        },
                        {
                            kind: 'tab',
                            id: 'contacts',
                            label: t('admin.contacts'),
                            icon: '💬',
                            path: '/admin/dashboard?tab=contacts'
                        },
                        {
                            kind: 'tab',
                            id: 'aboutTeam',
                            label: t('admin.aboutTeam'),
                            icon: '👤',
                            path: '/admin/dashboard?tab=aboutTeam'
                        },
                        {
                            kind: 'tab',
                            id: 'aboutStats',
                            label: t('admin.aboutStats'),
                            icon: '📈',
                            path: '/admin/dashboard?tab=aboutStats'
                        }
                    ]
                }
            ]
    }["AdminSidebar.useMemo[menuGroups]"], [
        t
    ]);
    const visibleGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminSidebar.useMemo[visibleGroups]": ()=>menuGroups.map({
                "AdminSidebar.useMemo[visibleGroups]": (group)=>({
                        ...group,
                        items: group.items.filter({
                            "AdminSidebar.useMemo[visibleGroups]": (item)=>{
                                if (item.kind === 'page' && item.id === 'companyProfile') return showCompanyProfileNav;
                                if (item.kind === 'tab') return allowTab(item.id);
                                return false;
                            }
                        }["AdminSidebar.useMemo[visibleGroups]"])
                    })
            }["AdminSidebar.useMemo[visibleGroups]"]).filter({
                "AdminSidebar.useMemo[visibleGroups]": (g)=>g.items.length > 0
            }["AdminSidebar.useMemo[visibleGroups]"])
    }["AdminSidebar.useMemo[visibleGroups]"], [
        menuGroups,
        showCompanyProfileNav,
        permsLoading,
        can
    ]);
    const activeGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminSidebar.useMemo[activeGroupId]": ()=>{
            for (const g of visibleGroups){
                for (const item of g.items){
                    const isActive = item.kind === 'page' ? pathname === item.path : activeTab === item.id;
                    if (isActive) return g.id;
                }
            }
            return null;
        }
    }["AdminSidebar.useMemo[activeGroupId]"], [
        visibleGroups,
        pathname,
        activeTab
    ]);
    const [expandedGroupId, setExpandedGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(activeGroupId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminSidebar.useEffect": ()=>{
            setExpandedGroupId(activeGroupId);
        }
    }["AdminSidebar.useEffect"], [
        activeGroupId
    ]);
    const toggleGroupHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminSidebar.useCallback[toggleGroupHeader]": (groupId)=>{
            setExpandedGroupId({
                "AdminSidebar.useCallback[toggleGroupHeader]": (cur)=>{
                    if (cur === groupId) {
                        return groupId === activeGroupId ? cur : null;
                    }
                    return groupId;
                }
            }["AdminSidebar.useCallback[toggleGroupHeader]"]);
        }
    }["AdminSidebar.useCallback[toggleGroupHeader]"], [
        activeGroupId
    ]);
    const handleNavigation = (path)=>{
        router.push(path);
        onMobileToggle();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-[width] duration-300 ease-out ${isOpen ? 'w-64' : 'w-24'} hidden lg:block`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `border-b border-white/10 ${isOpen ? 'p-4' : 'px-2 py-3'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                onClick: ()=>{
                                    if (mobileOpen) onMobileToggle();
                                },
                                className: `flex items-center rounded-lg outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30 ${isOpen ? 'gap-3 p-1 -m-1' : 'justify-center p-1 -m-1'}`,
                                "aria-label": t('nav.home'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$BrandingLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: logoSrc,
                                        alt: `${companyName} logo`,
                                        sizes: "40px",
                                        className: "w-10 h-10 shrink-0",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-bold text-lg font-zcool tracking-wide truncate",
                                                children: companyName
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-xs font-zcool tracking-wide truncate",
                                                children: brandSubtitle
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: `admin-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-2 ${isOpen ? 'p-4' : 'px-2 py-3'}`,
                            children: visibleGroups.map((group)=>{
                                const expanded = expandedGroupId === group.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: isOpen ? 'pt-3' : 'pt-0',
                                    children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                id: `admin-sidebar-group-${group.id}`,
                                                "aria-expanded": expanded,
                                                "aria-controls": `admin-sidebar-panel-${group.id}`,
                                                onClick: ()=>toggleGroupHeader(group.id),
                                                className: "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs uppercase tracking-wider text-white/50 font-medium hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: group.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: `w-3.5 h-3.5 shrink-0 text-white/45 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`,
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        "aria-hidden": true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M6 9l6 6 6-6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 202,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                id: `admin-sidebar-panel-${group.id}`,
                                                role: "region",
                                                "aria-labelledby": `admin-sidebar-group-${group.id}`,
                                                className: `grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-h-0 overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 pt-1",
                                                        children: group.items.map((item)=>{
                                                            const isActive = item.kind === 'page' ? pathname === item.path : activeTab === item.id;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleNavigation(item.path),
                                                                className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xl shrink-0",
                                                                        children: item.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                        lineNumber: 246,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium truncate",
                                                                        children: item.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, `${item.kind}-${item.id}`, true, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 33
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 224,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: group.items.map((item)=>{
                                            const isActive = item.kind === 'page' ? pathname === item.path : activeTab === item.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleNavigation(item.path),
                                                className: `w-full flex items-center justify-center px-1.5 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                                title: item.label,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl leading-none shrink-0",
                                                    children: item.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 29
                                                }, this)
                                            }, `${item.kind}-${item.id}`, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 261,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 256,
                                        columnNumber: 21
                                    }, this)
                                }, group.id, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `border-t border-white/10 shrink-0 ${isOpen ? 'p-3' : 'p-2'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onToggle,
                                "aria-expanded": isOpen,
                                "aria-label": isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar'),
                                title: isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar'),
                                className: `group w-full flex items-center rounded-xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/12 hover:text-white hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-colors min-h-11 ${isOpen ? 'justify-start gap-3 px-3 py-2.5' : 'flex-col justify-center gap-0.5 py-2 px-1'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 text-white/90",
                                        "aria-hidden": true,
                                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M15 18l-6-6 6-6"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 298,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 297,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M9 18l6-6-6-6"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 302,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 301,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium truncate text-left",
                                        children: t('admin.collapse')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 307,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-medium leading-snug text-center text-white/70 group-hover:text-white px-0.5 max-w-full wrap-break-word",
                                        children: t('admin.expand')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 309,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-transform duration-300 w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                onClick: ()=>{
                                    if (mobileOpen) onMobileToggle();
                                },
                                className: "flex items-center gap-3 rounded-lg p-1 -m-1 outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30",
                                "aria-label": t('nav.home'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$BrandingLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: logoSrc,
                                        alt: `${companyName} logo`,
                                        sizes: "40px",
                                        className: "w-10 h-10 shrink-0",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-bold text-lg font-zcool tracking-wide truncate",
                                                children: companyName
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-xs font-zcool tracking-wide truncate",
                                                children: brandSubtitle
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 344,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 342,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "admin-sidebar-scroll flex-1 overflow-y-auto p-4 space-y-2",
                            children: visibleGroups.map((group)=>{
                                const expanded = expandedGroupId === group.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            id: `admin-sidebar-mobile-group-${group.id}`,
                                            "aria-expanded": expanded,
                                            "aria-controls": `admin-sidebar-mobile-panel-${group.id}`,
                                            onClick: ()=>toggleGroupHeader(group.id),
                                            className: "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs uppercase tracking-wider text-white/50 font-medium hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: group.label
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: `w-3.5 h-3.5 shrink-0 text-white/45 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`,
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    "aria-hidden": true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 9l6 6 6-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 355,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            id: `admin-sidebar-mobile-panel-${group.id}`,
                                            role: "region",
                                            "aria-labelledby": `admin-sidebar-mobile-group-${group.id}`,
                                            className: `grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-h-0 overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 pt-1",
                                                    children: group.items.map((item)=>{
                                                        const isActive = item.kind === 'page' ? pathname === item.path : activeTab === item.id;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>handleNavigation(item.path),
                                                            className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xl shrink-0",
                                                                    children: item.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium",
                                                                    children: item.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, `${item.kind}-${item.id}`, true, {
                                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 383,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 377,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, group.id, true, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                    lineNumber: 354,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 350,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                    lineNumber: 324,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AdminSidebar, "K2QfHeA4EC/sawTiSQCMRXrm9Z8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$hooks$2f$useCompanyBranding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanyBranding"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"]
    ];
});
_c = AdminSidebar;
var _c;
__turbopack_context__.k.register(_c, "AdminSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocaleSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const FLAG = {
    'en-US': {
        src: '/flags/us.svg'
    },
    'vi-VN': {
        src: '/flags/vn.svg'
    }
};
function LocaleSwitcher({ className, alignWithProfileAvatar }) {
    _s();
    const { locale, setLocale, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const triggerClass = className ?? 'rounded-lg border border-white/30 bg-white/10 px-2 py-1.5 text-sm text-white hover:bg-white/15';
    const fullWidth = Boolean(className?.includes('w-full'));
    const flagWrapBase = alignWithProfileAvatar ? 'relative h-10 shrink-0 overflow-hidden rounded-lg ring-1 aspect-[3/2]' : 'relative h-5 w-7 shrink-0 overflow-hidden rounded-sm ring-1';
    const flagWrapTrigger = `${flagWrapBase} shadow-sm ring-black/20`;
    const imgW = alignWithProfileAvatar ? 60 : 28;
    const imgH = alignWithProfileAvatar ? 40 : 20;
    const nextLocale = locale === 'en-US' ? 'vi-VN' : 'en-US';
    function toggle() {
        setLocale(nextLocale);
    }
    const ariaLabel = locale === 'en-US' ? t('lang.toggleToVietnamese') : t('lang.toggleToEnglish');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: fullWidth ? 'relative block w-full' : 'relative inline-block',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: `flex items-center justify-center text-sm text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${fullWidth ? 'w-full' : ''} ${triggerClass}`,
            onClick: toggle,
            "aria-label": ariaLabel,
            title: ariaLabel,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: flagWrapTrigger,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: FLAG[locale].src,
                    alt: "",
                    width: imgW,
                    height: imgH,
                    className: "h-full w-full object-cover object-center"
                }, void 0, false, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(LocaleSwitcher, "2rsPTuiNUmOzv71ev3zyLp3uIeQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = LocaleSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LocaleSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function avatarInitials(displayName, email) {
    const d = (displayName ?? '').trim();
    if (d) {
        const parts = d.split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
        }
        return d.slice(0, 2).toUpperCase();
    }
    const local = email.split('@')[0] || email;
    return local.slice(0, 2).toUpperCase();
}
function AdminHeader({ onMenuClick }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [me, setMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordOpen, setPasswordOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPw, setCurrentPw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newPw, setNewPw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmPw, setConfirmPw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordSaving, setPasswordSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminHeader.useEffect": ()=>{
            const fetchUser = {
                "AdminHeader.useEffect.fetchUser": async ()=>{
                    try {
                        const res = await fetch('/api/admin/me', {
                            credentials: 'include'
                        });
                        if (res.ok) {
                            const data = await res.json();
                            if (data?.email) setMe(data);
                        }
                    } catch  {
                    // ignore
                    }
                }
            }["AdminHeader.useEffect.fetchUser"];
            void fetchUser();
        }
    }["AdminHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminHeader.useEffect": ()=>{
            const onDoc = {
                "AdminHeader.useEffect.onDoc": (e)=>{
                    if (menuRef.current && !menuRef.current.contains(e.target)) {
                        setMenuOpen(false);
                    }
                }
            }["AdminHeader.useEffect.onDoc"];
            if (menuOpen) document.addEventListener('mousedown', onDoc);
            return ({
                "AdminHeader.useEffect": ()=>document.removeEventListener('mousedown', onDoc)
            })["AdminHeader.useEffect"];
        }
    }["AdminHeader.useEffect"], [
        menuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminHeader.useEffect": ()=>{
            if (!passwordOpen) return;
            const onKey = {
                "AdminHeader.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') {
                        setPasswordOpen(false);
                    }
                }
            }["AdminHeader.useEffect.onKey"];
            document.addEventListener('keydown', onKey);
            return ({
                "AdminHeader.useEffect": ()=>document.removeEventListener('keydown', onKey)
            })["AdminHeader.useEffect"];
        }
    }["AdminHeader.useEffect"], [
        passwordOpen
    ]);
    const handleLogout = async ()=>{
        setMenuOpen(false);
        try {
            const res = await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                router.push('/admin/login');
            }
        } catch  {
            router.push('/admin/login');
        }
    };
    function openPasswordModal() {
        setMenuOpen(false);
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
        setPasswordOpen(true);
    }
    async function submitPasswordChange() {
        if (newPw !== confirmPw) {
            toast.error(t('admin.passwordMismatch'));
            return;
        }
        setPasswordSaving(true);
        try {
            const res = await fetch('/api/admin/me/password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword: currentPw,
                    newPassword: newPw
                })
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) {
                toast.error(data.error || t('admin.passwordChangeError'));
                return;
            }
            toast.success(t('admin.passwordChanged'));
            setCurrentPw('');
            setNewPw('');
            setConfirmPw('');
            setPasswordOpen(false);
        } catch  {
            toast.error(t('admin.passwordChangeError'));
        } finally{
            setPasswordSaving(false);
        }
    }
    const label = me ? avatarInitials(me.displayName, me.email) : '?';
    const subtitle = me?.displayName?.trim() || me?.email || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 lg:px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onMenuClick,
                                className: "lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0",
                                "aria-label": t('nav.toggleMenu'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl",
                                    children: "☰"
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl lg:text-2xl font-bold text-white truncate",
                                        children: t('admin.dashboardTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/60 text-sm hidden sm:block truncate",
                                        children: t('admin.dashboardWelcome')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 sm:gap-4 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: menuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMenuOpen((o)=>!o),
                                        className: "flex items-center gap-2 rounded-xl pl-3 pr-1 py-1 border border-white/20 bg-white/10 hover:bg-white/15 transition-colors",
                                        "aria-expanded": menuOpen,
                                        "aria-haspopup": "menu",
                                        "aria-label": t('admin.openUserMenu'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:flex flex-col items-end gap-0.5 max-w-40 lg:max-w-56 text-right min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white text-sm font-medium truncate max-w-full",
                                                        children: subtitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 17
                                                    }, this),
                                                    me?.role?.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/50 text-xs truncate max-w-full",
                                                        children: me.role.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 19
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#a0616a] to-[#4a3f55] text-sm font-bold text-white shadow-inner",
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/60 text-xs hidden sm:inline shrink-0 pr-1",
                                                children: menuOpen ? '▴' : '▾'
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-56 rounded-xl border border-white/15 bg-[#14141c]/95 backdrop-blur-lg shadow-xl py-1 z-50",
                                        role: "menu",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/admin/profile",
                                                role: "menuitem",
                                                className: "block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10",
                                                onClick: ()=>setMenuOpen(false),
                                                children: t('admin.userProfile')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "menuitem",
                                                className: "w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-white/10",
                                                onClick: openPasswordModal,
                                                children: t('admin.changePassword')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "my-1 border-t border-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "menuitem",
                                                className: "w-full text-left px-4 py-2.5 text-sm text-red-200 hover:bg-red-500/20",
                                                onClick: ()=>void handleLogout(),
                                                children: t('admin.logout')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                alignWithProfileAvatar: true,
                                className: "hidden sm:flex items-center bg-white/10 border border-white/30 text-white px-2 py-1 rounded-lg text-sm min-h-10"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            passwordOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-60 flex items-center justify-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/65",
                        "aria-hidden": true,
                        onClick: ()=>!passwordSaving && setPasswordOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-md rounded-2xl border border-white/15 bg-[#16161f] p-6 shadow-2xl",
                        role: "dialog",
                        "aria-labelledby": "pwd-dialog-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "pwd-dialog-title",
                                className: "text-lg font-bold text-white mb-4",
                                children: t('admin.changePasswordTitle')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/70 text-sm",
                                                children: t('admin.currentPassword')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                autoComplete: "current-password",
                                                value: currentPw,
                                                onChange: (e)=>setCurrentPw(e.target.value),
                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 239,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/70 text-sm",
                                                children: t('admin.newPassword')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 248,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                autoComplete: "new-password",
                                                value: newPw,
                                                onChange: (e)=>setNewPw(e.target.value),
                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 249,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/70 text-sm",
                                                children: t('admin.confirmPassword')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                autoComplete: "new-password",
                                                value: confirmPw,
                                                onChange: (e)=>setConfirmPw(e.target.value),
                                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-2 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20",
                                        disabled: passwordSaving,
                                        onClick: ()=>setPasswordOpen(false),
                                        children: t('admin.cancel')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "cta-button px-5 py-2",
                                        disabled: passwordSaving,
                                        onClick: ()=>void submitPasswordChange(),
                                        children: passwordSaving ? '…' : t('admin.updatePassword')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(AdminHeader, "ficvz+/hxEVYtvzZFhllr/Szjaw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = AdminHeader;
var _c;
__turbopack_context__.k.register(_c, "AdminHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AdminLayout({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isLoginPage = pathname === '/admin/login';
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Close mobile menu on window resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            const handleResize = {
                "AdminLayout.useEffect.handleResize": ()=>{
                    if (window.innerWidth >= 1080) {
                        setMobileMenuOpen(false);
                    }
                }
            }["AdminLayout.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "AdminLayout.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], []);
    // If login page, render without layout
    if (isLoginPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminPermissionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isOpen: sidebarOpen,
                        onToggle: ()=>setSidebarOpen(!sidebarOpen),
                        mobileOpen: mobileMenuOpen,
                        onMobileToggle: ()=>setMobileMenuOpen(!mobileMenuOpen)
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-24'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onMenuClick: ()=>setMobileMenuOpen(!mobileMenuOpen)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                            className: "p-4 lg:p-6",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
                    onClick: ()=>setMobileMenuOpen(false)
                }, void 0, false, {
                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(AdminLayout, "96YOMWkQ4OqvVNAzRcneVz+6Zik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=WebPortal_vuleits-website_src_25d86206._.js.map