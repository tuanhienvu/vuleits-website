module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
function ensureDatabaseUrlFromParts() {
    if (process.env.DATABASE_URL) return;
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) return;
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
ensureDatabaseUrlFromParts();
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/WebPortal/vuleits-website/src/lib/companyProfileTypes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/WebPortal/vuleits-website/src/lib/companyProfileBranding.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPublicCompanyBranding",
    ()=>getPublicCompanyBranding,
    "resolveCompanyLogoDisplayUrl",
    ()=>resolveCompanyLogoDisplayUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/companyProfileTypes.ts [app-route] (ecmascript)");
;
;
async function resolveCompanyLogoDisplayUrl(data) {
    if (data.logoMediaId != null) {
        const m = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].media.findUnique({
            where: {
                id: data.logoMediaId
            },
            select: {
                url: true,
                mimeType: true
            }
        });
        if (m?.url && m.mimeType.startsWith('image/')) return m.url;
    }
    const u = (data.logoUrl || '').trim();
    return u;
}
async function getPublicCompanyBranding() {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COMPANY_PROFILE_SETTING_KEY"]
        }
    });
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileTypes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCompanyProfileJson"])(row?.value ?? null);
    const logoUrl = await resolveCompanyLogoDisplayUrl(profile);
    return {
        companyName: profile.companyName.trim(),
        slogan: profile.slogan.trim(),
        logoUrl
    };
}
}),
"[project]/WebPortal/vuleits-website/src/app/api/company/branding/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileBranding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/companyProfileBranding.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const branding = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$companyProfileBranding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPublicCompanyBranding"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(branding, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7c34aa2c._.js.map