module.exports = [
"[project]/WebPortal/vuleits-website/src/lib/companyProfileTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPANY_PROFILE_SETTING_KEY",
    ()=>COMPANY_PROFILE_SETTING_KEY,
    "SOCIAL_PLATFORM_IDS",
    ()=>SOCIAL_PLATFORM_IDS,
    "defaultCompanyProfile",
    ()=>defaultCompanyProfile,
    "parseCompanyProfileJson",
    ()=>parseCompanyProfileJson
]);
const COMPANY_PROFILE_SETTING_KEY = 'company_profile';
const SOCIAL_PLATFORM_IDS = [
    'facebook',
    'youtube',
    'instagram',
    'tiktok',
    'twitter',
    'linkedin',
    'telegram',
    'github',
    'website',
    'other'
];
function defaultCompanyProfile() {
    return {
        companyName: '',
        fullNameVi: '',
        fullNameEn: '',
        slogan: '',
        address: '',
        logoUrl: '',
        logoMediaId: null,
        email: '',
        phone: '',
        hotline: '',
        mapEmbedUrl: '',
        socialLinks: []
    };
}
function isSocialPlatform(v) {
    return SOCIAL_PLATFORM_IDS.includes(v);
}
function parseCompanyProfileJson(raw) {
    const base = defaultCompanyProfile();
    if (!raw) return base;
    try {
        const o = JSON.parse(raw);
        const linksRaw = o.socialLinks;
        const socialLinks = Array.isArray(linksRaw) ? linksRaw.map((item)=>{
            if (!item || typeof item !== 'object') return null;
            const r = item;
            const url = typeof r.url === 'string' ? r.url.trim() : '';
            if (!url) return null;
            const t = typeof r.type === 'string' ? r.type : 'other';
            return {
                type: isSocialPlatform(t) ? t : 'other',
                url
            };
        }).filter((x)=>x != null).slice(0, 30) : [];
        return {
            companyName: typeof o.companyName === 'string' ? o.companyName.slice(0, 200) : base.companyName,
            fullNameVi: typeof o.fullNameVi === 'string' ? o.fullNameVi.slice(0, 500) : base.fullNameVi,
            fullNameEn: typeof o.fullNameEn === 'string' ? o.fullNameEn.slice(0, 500) : base.fullNameEn,
            slogan: typeof o.slogan === 'string' ? o.slogan.slice(0, 300) : base.slogan,
            address: typeof o.address === 'string' ? o.address.slice(0, 1000) : base.address,
            logoUrl: typeof o.logoUrl === 'string' ? o.logoUrl.slice(0, 2048) : base.logoUrl,
            logoMediaId: typeof o.logoMediaId === 'number' && Number.isFinite(o.logoMediaId) ? Math.floor(o.logoMediaId) : o.logoMediaId === null ? null : base.logoMediaId,
            email: typeof o.email === 'string' ? o.email.slice(0, 320) : base.email,
            phone: typeof o.phone === 'string' ? o.phone.slice(0, 64) : base.phone,
            hotline: typeof o.hotline === 'string' ? o.hotline.slice(0, 64) : base.hotline,
            mapEmbedUrl: typeof o.mapEmbedUrl === 'string' ? o.mapEmbedUrl.trim().slice(0, 2048) : base.mapEmbedUrl,
            socialLinks
        };
    } catch  {
        return base;
    }
}
}),
"[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompanyProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/companyProfileTypes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function socialIcon(type) {
    const m = {
        facebook: 'f',
        youtube: '▶',
        instagram: '📷',
        tiktok: '♪',
        twitter: '𝕏',
        linkedin: 'in',
        telegram: '✈',
        github: '⌘',
        website: '🔗',
        other: '·'
    };
    return m[type] || '·';
}
function CompanyProfilePage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCompanyProfile"])());
    const [logoDisplayUrl, setLogoDisplayUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [libraryOpen, setLibraryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [library, setLibrary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [libraryLoading, setLibraryLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        try {
            const res = await fetch('/api/admin/company-profile', {
                credentials: 'include'
            });
            if (res.status === 403 || res.status === 401) {
                router.replace('/admin/dashboard?tab=overview');
                return;
            }
            if (!res.ok) {
                const d = await res.json().catch(()=>({}));
                throw new Error(d.error || t('admin.companyLoadError'));
            }
            const data = await res.json();
            setProfile(data.profile);
            setLogoDisplayUrl(data.logoDisplayUrl || '');
        } catch (e) {
            toast.error(e instanceof Error ? e.message : t('admin.companyLoadError'));
        } finally{
            setLoading(false);
        }
    }, [
        router,
        t,
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void load();
    }, [
        load
    ]);
    const openLibrary = async ()=>{
        setLibraryOpen(true);
        setLibraryLoading(true);
        try {
            const res = await fetch('/api/admin/media?take=100', {
                credentials: 'include'
            });
            if (!res.ok) {
                setLibrary([]);
                return;
            }
            const list = await res.json();
            setLibrary(Array.isArray(list) ? list : []);
        } catch  {
            setLibrary([]);
        } finally{
            setLibraryLoading(false);
        }
    };
    async function save() {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/company-profile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
            const d = await res.json().catch(()=>({}));
            if (!res.ok) {
                throw new Error(d.error || t('admin.companySaveError'));
            }
            setProfile(d.profile);
            setLogoDisplayUrl(d.logoDisplayUrl || '');
            toast.success(t('admin.companySaved'));
        } catch (e) {
            toast.error(e instanceof Error ? e.message : t('admin.companySaveError'));
        } finally{
            setSaving(false);
        }
    }
    async function onUploadFile(f) {
        if (!f) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.set('file', f);
            const res = await fetch('/api/admin/company-profile/logo', {
                method: 'POST',
                credentials: 'include',
                body: fd
            });
            const d = await res.json().catch(()=>({}));
            if (!res.ok) {
                throw new Error(d.error || 'Upload failed');
            }
            const url = d.url;
            const mediaId = d.mediaId;
            if (url && mediaId != null) {
                setProfile((p)=>({
                        ...p,
                        logoUrl: '',
                        logoMediaId: mediaId
                    }));
                setLogoDisplayUrl(url);
                toast.success(t('admin.logoUploadSuccess'));
            }
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Upload failed');
        } finally{
            setUploading(false);
        }
    }
    function pickFromLibrary(row) {
        setProfile((p)=>({
                ...p,
                logoUrl: '',
                logoMediaId: row.id
            }));
        setLogoDisplayUrl(row.url);
        setLibraryOpen(false);
    }
    function addSocial() {
        setProfile((p)=>({
                ...p,
                socialLinks: [
                    ...p.socialLinks,
                    {
                        type: 'facebook',
                        url: ''
                    }
                ]
            }));
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white/80 py-8",
            children: t('admin.profileLoading')
        }, void 0, false, {
            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
            lineNumber: 156,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-white mb-1",
                children: t('admin.companyProfile')
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 text-sm mb-6",
                children: t('admin.companyProfileDesc')
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 bg-white/10 border border-white/15 rounded-xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.companyName')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: profile.companyName,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            companyName: e.target.value
                                        })),
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.companyFullNameVi')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: profile.fullNameVi,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            fullNameVi: e.target.value
                                        })),
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.companyFullNameEn')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: profile.fullNameEn,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            fullNameEn: e.target.value
                                        })),
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.companySlogan')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: profile.slogan,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            slogan: e.target.value
                                        })),
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.companyAddress')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: profile.address,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            address: e.target.value
                                        })),
                                rows: 3,
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium block mb-2",
                                children: t('admin.companyLogo')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-24 h-24 rounded-lg border border-white/20 bg-white/5 overflow-hidden shrink-0",
                                        children: logoDisplayUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: logoDisplayUrl,
                                            alt: "",
                                            fill: true,
                                            className: "object-contain",
                                            sizes: "96px",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full flex items-center justify-center text-white/40 text-xs",
                                            children: "—"
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-[12rem] space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/60 text-xs",
                                                        children: t('admin.logoUrlHint')
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: profile.logoUrl,
                                                        onChange: (e)=>{
                                                            const v = e.target.value;
                                                            setProfile((p)=>({
                                                                    ...p,
                                                                    logoUrl: v,
                                                                    logoMediaId: null
                                                                }));
                                                            setLogoDisplayUrl(v.trim());
                                                        },
                                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30",
                                                        placeholder: "https://…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void openLibrary(),
                                                        className: "bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25",
                                                        children: t('admin.logoFromLibrary')
                                                    }, void 0, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center gap-2 bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                accept: "image/jpeg,image/png,image/webp,image/gif",
                                                                className: "hidden",
                                                                disabled: uploading,
                                                                onChange: (e)=>void onUploadFile(e.target.files?.[0] ?? null)
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 19
                                                            }, this),
                                                            uploading ? t('admin.uploading') : t('admin.logoUploadFile')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block sm:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-sm font-medium",
                                        children: t('admin.contactEmail')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        value: profile.email,
                                        onChange: (e)=>setProfile((p)=>({
                                                    ...p,
                                                    email: e.target.value
                                                })),
                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block sm:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-sm font-medium",
                                        children: t('admin.contactPhone')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: profile.phone,
                                        onChange: (e)=>setProfile((p)=>({
                                                    ...p,
                                                    phone: e.target.value
                                                })),
                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block sm:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-sm font-medium",
                                        children: t('admin.contactHotline')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: profile.hotline,
                                        onChange: (e)=>setProfile((p)=>({
                                                    ...p,
                                                    hotline: e.target.value
                                                })),
                                        className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-sm font-medium",
                                children: t('admin.mapEmbedUrl')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-xs mt-0.5 mb-1",
                                children: t('admin.mapEmbedHint')
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: profile.mapEmbedUrl,
                                onChange: (e)=>setProfile((p)=>({
                                            ...p,
                                            mapEmbedUrl: e.target.value
                                        })),
                                rows: 2,
                                placeholder: "https://www.google.com/maps/embed?pb=…",
                                className: "mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 font-mono"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80 text-sm font-medium",
                                        children: t('admin.socialLinks')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: addSocial,
                                        className: "text-sm bg-white/15 text-white px-3 py-1.5 rounded-lg hover:bg-white/25",
                                        children: t('admin.socialAdd')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: profile.socialLinks.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white text-sm font-bold",
                                                title: row.type,
                                                children: socialIcon(row.type)
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: row.type,
                                                onChange: (e)=>{
                                                    const type = e.target.value;
                                                    setProfile((p)=>({
                                                            ...p,
                                                            socialLinks: p.socialLinks.map((s, j)=>j === i ? {
                                                                    ...s,
                                                                    type
                                                                } : s)
                                                        }));
                                                },
                                                className: "bg-white/15 border border-white/25 text-white text-sm rounded-lg px-2 py-2",
                                                "aria-label": t('admin.socialType'),
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SOCIAL_PLATFORM_IDS"].map((id)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: id,
                                                        className: "bg-gray-900 text-white",
                                                        children: id
                                                    }, id, false, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: row.url,
                                                onChange: (e)=>{
                                                    const url = e.target.value;
                                                    setProfile((p)=>({
                                                            ...p,
                                                            socialLinks: p.socialLinks.map((s, j)=>j === i ? {
                                                                    ...s,
                                                                    url
                                                                } : s)
                                                        }));
                                                },
                                                placeholder: "https://",
                                                className: "flex-1 min-w-[10rem] bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm",
                                                "aria-label": t('admin.socialUrl')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 336,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setProfile((p)=>({
                                                            ...p,
                                                            socialLinks: p.socialLinks.filter((_, j)=>j !== i)
                                                        })),
                                                className: "text-red-300 text-sm px-2 py-1 hover:bg-red-500/20 rounded",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void save(),
                        disabled: saving,
                        className: "cta-button px-6 py-2 disabled:opacity-50",
                        children: saving ? t('admin.saving') : t('admin.saveCompanyProfile')
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            libraryOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[70] flex items-center justify-center px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70",
                        "aria-hidden": true,
                        onClick: ()=>setLibraryOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/15 bg-[#12121a] shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-4 py-3 border-b border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold text-white",
                                        children: t('admin.pickLogoTitle')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setLibraryOpen(false),
                                        className: "text-white/70 hover:text-white px-2 py-1 rounded",
                                        children: t('admin.close')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-y-auto p-4",
                                children: libraryLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-sm",
                                    children: t('admin.profileLoading')
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 17
                                }, this) : library.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-sm",
                                    children: t('admin.noImagesInLibrary')
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 sm:grid-cols-4 gap-3",
                                    children: library.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>pickFromLibrary(m),
                                            className: "relative aspect-square rounded-lg border border-white/20 overflow-hidden hover:ring-2 hover:ring-white/40",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: m.url,
                                                alt: "",
                                                fill: true,
                                                className: "object-cover",
                                                sizes: "120px",
                                                unoptimized: true
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                                lineNumber: 404,
                                                columnNumber: 23
                                            }, this)
                                        }, m.id, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                    lineNumber: 396,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                                lineNumber: 390,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/company-profile/page.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=WebPortal_vuleits-website_src_f71ebca7._.js.map