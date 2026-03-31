(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/lib/companyProfileTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        email2: '',
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
            email2: typeof o.email2 === 'string' ? o.email2.slice(0, 320) : base.email2,
            phone: typeof o.phone === 'string' ? o.phone.slice(0, 64) : base.phone,
            hotline: typeof o.hotline === 'string' ? o.hotline.slice(0, 64) : base.hotline,
            mapEmbedUrl: typeof o.mapEmbedUrl === 'string' ? o.mapEmbedUrl.trim().slice(0, 2048) : base.mapEmbedUrl,
            socialLinks
        };
    } catch  {
        return base;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/googleMapsEmbed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Client-side map preview (aligned with backend `resolvePublicMapEmbedSrc`). */ __turbopack_context__.s([
    "isAllowedGoogleMapsEmbedUrl",
    ()=>isAllowedGoogleMapsEmbedUrl,
    "resolveMapPreviewSrc",
    ()=>resolveMapPreviewSrc
]);
function isAllowedGoogleMapsEmbedUrl(url) {
    const trimmed = url.trim();
    if (!trimmed) return false;
    try {
        const u = new URL(trimmed);
        if (u.protocol !== 'https:') return false;
        const host = u.hostname.toLowerCase();
        if (host === 'google.com' || host === 'www.google.com') {
            return u.pathname.startsWith('/maps/embed') || u.pathname.startsWith('/maps') && u.search.includes('output=embed');
        }
        if (host === 'maps.google.com') return u.pathname.startsWith('/maps');
        return false;
    } catch  {
        return false;
    }
}
function resolveMapPreviewSrc(mapEmbedUrl, address) {
    const custom = mapEmbedUrl.trim();
    if (custom && isAllowedGoogleMapsEmbedUrl(custom)) return custom;
    const addr = address.trim();
    if (!addr) return null;
    return `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&hl=en&z=15&output=embed`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/useEscapeToClose.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEscapeToClose",
    ()=>useEscapeToClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useEscapeToClose(active, onClose) {
    _s();
    const onCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onClose);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEscapeToClose.useEffect": ()=>{
            onCloseRef.current = onClose;
        }
    }["useEscapeToClose.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEscapeToClose.useEffect": ()=>{
            if (!active) return;
            const handler = {
                "useEscapeToClose.useEffect.handler": (e)=>{
                    if (e.key !== 'Escape') return;
                    e.preventDefault();
                    void Promise.resolve(onCloseRef.current());
                }
            }["useEscapeToClose.useEffect.handler"];
            document.addEventListener('keydown', handler);
            return ({
                "useEscapeToClose.useEffect": ()=>document.removeEventListener('keydown', handler)
            })["useEscapeToClose.useEffect"];
        }
    }["useEscapeToClose.useEffect"], [
        active
    ]);
}
_s(useEscapeToClose, "8TVmRo+xhWVhVscE3xY3oIrc6nM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/ContactsAdminPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactsAdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/companyProfileTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$googleMapsEmbed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/googleMapsEmbed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/useEscapeToClose.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function logoModeFromProfile(p) {
    if (p.logoUrl.trim()) return 'url';
    if (p.logoMediaId != null) return 'library';
    return 'upload';
}
function ContactsAdminPanel() {
    _s();
    const { can } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const canUpdate = can('contacts', 'update');
    const canMediaRead = can('media', 'read');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [forbidden, setForbidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoDisplayUrl, setLogoDisplayUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ContactsAdminPanel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultCompanyProfile"])()
    }["ContactsAdminPanel.useState"]);
    const [baseline, setBaseline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoUploading, setLogoUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mediaPickerOpen, setMediaPickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mediaList, setMediaList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mediaLoading, setMediaLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoMode, setLogoMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('upload');
    const logoFileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscapeToClose"])(mediaPickerOpen, {
        "ContactsAdminPanel.useEscapeToClose": ()=>setMediaPickerOpen(false)
    }["ContactsAdminPanel.useEscapeToClose"]);
    const logoPreviewSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContactsAdminPanel.useMemo[logoPreviewSrc]": ()=>{
            const u = form.logoUrl.trim();
            if (u) return u;
            if (logoDisplayUrl) return logoDisplayUrl;
            return null;
        }
    }["ContactsAdminPanel.useMemo[logoPreviewSrc]"], [
        form.logoUrl,
        logoDisplayUrl
    ]);
    const mapPreviewSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContactsAdminPanel.useMemo[mapPreviewSrc]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$googleMapsEmbed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMapPreviewSrc"])(form.mapEmbedUrl, form.address)
    }["ContactsAdminPanel.useMemo[mapPreviewSrc]"], [
        form.mapEmbedUrl,
        form.address
    ]);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ContactsAdminPanel.useCallback[load]": async ()=>{
            setLoading(true);
            setForbidden(false);
            try {
                const res = await fetch('/api/admin/company-profile', {
                    credentials: 'include'
                });
                if (res.status === 403) {
                    setForbidden(true);
                    return;
                }
                if (!res.ok) {
                    if (res.status === 401) window.location.href = '/admin/login';
                    throw new Error('Load failed');
                }
                const data = await res.json();
                // API returns { profile, logoDisplayUrl }; merge so all fields show even if partial.
                const profile = data.profile && typeof data.profile === 'object' ? data.profile : null;
                const merged = {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultCompanyProfile"])(),
                    ...profile ?? {}
                };
                setForm(merged);
                setBaseline(JSON.stringify(merged));
                setLogoDisplayUrl(data.logoDisplayUrl ?? null);
                setLogoMode(logoModeFromProfile(merged));
            } catch  {
                toast.error('Failed to load company profile');
            } finally{
                setLoading(false);
            }
        }
    }["ContactsAdminPanel.useCallback[load]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactsAdminPanel.useEffect": ()=>{
            if (!can('contacts', 'read')) return;
            void load();
        }
    }["ContactsAdminPanel.useEffect"], [
        can,
        load
    ]);
    const save = async ()=>{
        if (!can('contacts', 'update')) return;
        setSaving(true);
        try {
            const res = await fetch('/api/admin/company-profile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const j = await res.json().catch(()=>({}));
                throw new Error(j.error || 'Save failed');
            }
            const data = await res.json();
            toast.success('Saved');
            if (data.profile) {
                const merged = {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultCompanyProfile"])(),
                    ...data.profile
                };
                setForm(merged);
                setBaseline(JSON.stringify(merged));
                setLogoMode(logoModeFromProfile(merged));
            }
            setLogoDisplayUrl(data.logoDisplayUrl ?? null);
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Save failed');
        } finally{
            setSaving(false);
        }
    };
    const setSocial = (index, patch)=>{
        setForm((f)=>{
            const socialLinks = [
                ...f.socialLinks
            ];
            const cur = socialLinks[index] ?? {
                type: 'other',
                url: ''
            };
            socialLinks[index] = {
                ...cur,
                ...patch
            };
            return {
                ...f,
                socialLinks
            };
        });
    };
    const addSocial = ()=>{
        setForm((f)=>({
                ...f,
                socialLinks: [
                    ...f.socialLinks,
                    {
                        type: 'other',
                        url: ''
                    }
                ]
            }));
    };
    const removeSocial = (index)=>{
        setForm((f)=>({
                ...f,
                socialLinks: f.socialLinks.filter((_, i)=>i !== index)
            }));
    };
    const uploadCompanyLogo = async (e)=>{
        const file = e.target.files?.[0];
        if (!file || !canUpdate) return;
        setLogoUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/admin/company-profile/logo', {
                method: 'POST',
                credentials: 'include',
                body: fd
            });
            if (!res.ok) {
                const j = await res.json().catch(()=>({}));
                throw new Error(j.error || 'Upload failed');
            }
            const j = await res.json();
            if (j.mediaId != null && j.url) {
                setForm((f)=>({
                        ...f,
                        logoMediaId: j.mediaId,
                        logoUrl: ''
                    }));
                setLogoDisplayUrl(j.url);
                setLogoMode('library');
                toast.success('Logo uploaded. Save changes to persist.');
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Upload failed');
        } finally{
            setLogoUploading(false);
            e.target.value = '';
        }
    };
    const openMediaPicker = async ()=>{
        if (!canMediaRead) {
            toast.error('You need Media → View permission to pick from the library.');
            return;
        }
        setMediaPickerOpen(true);
        setMediaLoading(true);
        try {
            const res = await fetch('/api/admin/media?take=200&imagesOnly=1', {
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed');
            const list = await res.json();
            setMediaList(Array.isArray(list) ? list : []);
        } catch  {
            toast.error('Failed to load media library');
            setMediaList([]);
        } finally{
            setMediaLoading(false);
        }
    };
    const selectMediaLogo = (row)=>{
        setForm((f)=>({
                ...f,
                logoMediaId: row.id,
                logoUrl: ''
            }));
        setLogoDisplayUrl(row.url);
        setLogoMode('library');
        setMediaPickerOpen(false);
        toast.success('Logo selected from library. Save changes to persist.');
    };
    const clearLogo = ()=>{
        setForm((f)=>({
                ...f,
                logoUrl: '',
                logoMediaId: null
            }));
        setLogoDisplayUrl(null);
        setLogoMode('upload');
    };
    const hasChanges = baseline !== '' && baseline !== JSON.stringify(form);
    if (!can('contacts', 'read')) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white/70",
            children: "No permission."
        }, void 0, false, {
            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
            lineNumber: 201,
            columnNumber: 12
        }, this);
    }
    if (forbidden) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-white",
                    children: "Contacts & company profile"
                }, void 0, false, {
                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/75 max-w-xl",
                    children: "Company profile is restricted to Administrator accounts. Sign in as an ADMIN or SYSADMIN user to edit contact details and branding."
                }, void 0, false, {
                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
            lineNumber: 206,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-2xl p-4 border border-white/10 sticky top-3 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-white",
                                    children: "Company Profile Manager"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/65 text-sm mt-1",
                                    children: "Manage branding, company information, contact channels, and social links."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                hasChanges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-200 text-xs px-2 py-1 rounded-md bg-amber-500/10 border border-amber-400/30",
                                    children: "Unsaved changes"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 225,
                                    columnNumber: 27
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "btn-admin-secondary",
                                    disabled: loading || saving,
                                    onClick: ()=>void load(),
                                    children: "Reload"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                canUpdate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "btn-admin-primary",
                                    disabled: saving || loading || !hasChanges,
                                    onClick: ()=>void save(),
                                    children: saving ? 'Saving…' : 'Save changes'
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/70",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                lineNumber: 242,
                columnNumber: 18
            }, this) : null,
            !loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid xl:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "xl:col-span-2 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "glass rounded-2xl p-5 border border-white/10 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white text-lg font-semibold",
                                        children: "Identity"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Company name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "VULEITS",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.companyName,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    companyName: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 250,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Slogan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "Innovation …",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.slogan,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    slogan: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Full name (VI)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "Công ty …",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.fullNameVi,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    fullNameVi: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Full name (EN)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "… Joint Stock Company",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.fullNameEn,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    fullNameEn: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        placeholder: "contact@company.com",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.email,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    email: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Email (secondary)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        placeholder: "support@company.com",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.email2,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    email2: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 301,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Phone"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "+84 …",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.phone,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    phone: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Hotline"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        placeholder: "1900 …",
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                        value: form.hotline,
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    hotline: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/70 text-sm",
                                                        children: "Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-h-[72px] placeholder:text-white/35",
                                                        value: form.address,
                                                        placeholder: "Office address...",
                                                        onChange: (e)=>setForm((f)=>({
                                                                    ...f,
                                                                    address: e.target.value
                                                                })),
                                                        disabled: !canUpdate
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 249,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "glass rounded-2xl p-5 border border-white/10 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white text-lg font-semibold",
                                        children: "Map"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/70 text-sm",
                                                children: "Map embed URL"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs placeholder:text-white/35",
                                                value: form.mapEmbedUrl,
                                                placeholder: "https://www.google.com/maps/embed?...",
                                                onChange: (e)=>setForm((f)=>({
                                                            ...f,
                                                            mapEmbedUrl: e.target.value
                                                        })),
                                                disabled: !canUpdate
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/45 text-xs mt-1",
                                                children: 'Use Google Maps "Share" → "Embed a map" (HTTPS). If empty, preview uses Address above.'
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/70 text-sm mb-2",
                                                children: "Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl overflow-hidden border border-white/15 bg-black/30 aspect-video min-h-[200px]",
                                                children: mapPreviewSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                                    title: "Map preview",
                                                    src: mapPreviewSrc,
                                                    className: "w-full h-full min-h-[200px]",
                                                    loading: "lazy",
                                                    allowFullScreen: true,
                                                    referrerPolicy: "no-referrer-when-downgrade"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full min-h-[200px] flex items-center justify-center p-4 text-white/45 text-sm text-center",
                                                    children: "Add a valid embed URL or fill Address to preview the map."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "glass rounded-2xl p-5 border border-white/10 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white text-lg font-semibold",
                                        children: "Logo & branding"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4 max-w-2xl mx-auto w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "size-[4.55rem] rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden shrink-0",
                                                    children: logoPreviewSrc ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: logoPreviewSrc,
                                                        alt: "Logo preview",
                                                        className: "max-w-full max-h-full object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/35 text-[10px] text-center px-1 leading-tight",
                                                        children: "No logo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: logoFileInputRef,
                                                type: "file",
                                                accept: "image/*",
                                                className: "hidden",
                                                onChange: uploadCompanyLogo,
                                                disabled: !canUpdate || logoUploading
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 399,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 w-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            id: "logo-source-select",
                                                            className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35 disabled:opacity-50",
                                                            value: logoMode,
                                                            onChange: (e)=>setLogoMode(e.target.value),
                                                            disabled: !canUpdate,
                                                            "aria-label": "How to set the company logo",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "upload",
                                                                    className: "bg-slate-900 text-white",
                                                                    children: "Upload new image"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "library",
                                                                    className: "bg-slate-900 text-white",
                                                                    children: "Choose from library"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                    lineNumber: 421,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "url",
                                                                    className: "bg-slate-900 text-white",
                                                                    children: "External image URL"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 w-full min-w-0",
                                                        children: [
                                                            logoMode === 'upload' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>logoFileInputRef.current?.click(),
                                                                disabled: !canUpdate || logoUploading,
                                                                className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50",
                                                                children: logoUploading ? 'Uploading…' : 'Choose file…'
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 23
                                                            }, this) : null,
                                                            logoMode === 'library' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>void openMediaPicker(),
                                                                disabled: !canUpdate || logoUploading,
                                                                className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50",
                                                                children: "Browse library…"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 23
                                                            }, this) : null,
                                                            logoMode === 'url' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35",
                                                                value: form.logoUrl,
                                                                placeholder: "https://…",
                                                                onChange: (e)=>{
                                                                    const v = e.target.value;
                                                                    setForm((f)=>({
                                                                            ...f,
                                                                            logoUrl: v,
                                                                            logoMediaId: v.trim() ? null : f.logoMediaId
                                                                        }));
                                                                    if (v.trim()) setLogoMode('url');
                                                                },
                                                                disabled: !canUpdate,
                                                                "aria-label": "External image URL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 23
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    logoMode === 'upload' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/45 text-xs mt-1",
                                                        children: "JPEG, PNG, WebP, or GIF · up to 5 MB"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    logoMode === 'library' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/45 text-xs mt-1",
                                                        children: !canMediaRead ? 'Requires Media → View permission.' : 'Select an existing image from your uploads.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 21
                                                    }, this) : null,
                                                    logoMode === 'url' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/45 text-xs mt-1",
                                                        children: "Saved as the logo URL. Overrides library media when not empty."
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 21
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 408,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/45 text-xs",
                                                children: "Save changes at the top to publish your logo."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, this),
                                            (form.logoMediaId != null || form.logoUrl.trim() || logoDisplayUrl) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center sm:justify-start",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: clearLogo,
                                                    disabled: !canUpdate,
                                                    className: "p-0 bg-transparent border-0 text-sm text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline",
                                                    children: "Remove logo"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 493,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "glass rounded-2xl p-5 border border-white/10 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-white",
                                                children: "Social links"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 510,
                                                columnNumber: 17
                                            }, this),
                                            canUpdate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn-admin-secondary text-sm py-1 px-2",
                                                onClick: addSocial,
                                                children: "Add link"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 509,
                                        columnNumber: 15
                                    }, this),
                                    form.socialLinks.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 rounded-lg border border-white/10 p-3 bg-white/5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2 items-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex-1 min-w-[120px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/60 text-xs",
                                                                    children: "Platform"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                    lineNumber: 521,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "mt-1 w-full px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm",
                                                                    value: link.type,
                                                                    onChange: (e)=>setSocial(i, {
                                                                            type: e.target.value
                                                                        }),
                                                                    disabled: !canUpdate,
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIAL_PLATFORM_IDS"].map((id)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: id,
                                                                            children: id
                                                                        }, id, false, {
                                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                            lineNumber: 529,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                                    lineNumber: 522,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-admin-icon-danger text-sm",
                                                            onClick: ()=>removeSocial(i),
                                                            disabled: !canUpdate,
                                                            title: "Remove",
                                                            children: "✕"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/60 text-xs",
                                                            children: "URL"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "mt-1 w-full px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/35",
                                                            value: link.url,
                                                            onChange: (e)=>setSocial(i, {
                                                                    url: e.target.value
                                                                }),
                                                            disabled: !canUpdate,
                                                            placeholder: "https://..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                            lineNumber: 518,
                                            columnNumber: 17
                                        }, this)),
                                    form.socialLinks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-dashed border-white/20 p-4 text-white/45 text-sm",
                                        children: "No social links. Add one to start."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 558,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 508,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this) : null,
            mediaPickerOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "media-picker-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-2xl border border-white/15 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 p-4 border-b border-white/10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    id: "media-picker-title",
                                    className: "text-lg font-semibold text-white",
                                    children: "Choose logo from library"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 575,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10",
                                    onClick: ()=>setMediaPickerOpen(false),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                    lineNumber: 578,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                            lineNumber: 574,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-y-auto p-4 min-h-[120px]",
                            children: mediaLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60 text-sm",
                                children: "Loading…"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 588,
                                columnNumber: 17
                            }, this) : mediaList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-sm",
                                children: "No images in the library yet."
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 590,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                                children: mediaList.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>selectMediaLogo(row),
                                        className: "rounded-xl border border-white/15 overflow-hidden bg-white/5 hover:border-cyan-400/50 hover:bg-white/10 transition text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: row.url,
                                                alt: "",
                                                className: "w-full aspect-square object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 601,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block px-2 py-1.5 text-white/80 text-xs truncate",
                                                title: row.filename,
                                                children: row.filename
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                                lineNumber: 602,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, row.id, true, {
                                        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                        lineNumber: 594,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                                lineNumber: 592,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                    lineNumber: 573,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
                lineNumber: 567,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/admin/ContactsAdminPanel.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
_s(ContactsAdminPanel, "nkrkTf/Ffjlh0nJ9xrJoCgg2pkc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscapeToClose"]
    ];
});
_c = ContactsAdminPanel;
var _c;
__turbopack_context__.k.register(_c, "ContactsAdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/ContactsAdminPanel.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/admin/ContactsAdminPanel.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_97d08478._.js.map