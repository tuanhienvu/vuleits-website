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
"[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
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
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/backend/src/lib/sanitizeAboutIntroHtml.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitizeAboutIntroBodyHtml",
    ()=>sanitizeAboutIntroBodyHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanitize-html/index.js [app-route] (ecmascript)");
;
const OPTIONS = {
    allowedTags: [
        'p',
        'br',
        'strong',
        'b',
        'em',
        'i',
        'u',
        's',
        'strike',
        'sub',
        'sup',
        'a',
        'ul',
        'ol',
        'li',
        'h2',
        'h3',
        'h4',
        'blockquote',
        'div',
        'span',
        'hr'
    ],
    allowedAttributes: {
        a: [
            'href',
            'name',
            'target',
            'rel'
        ],
        img: [
            'src',
            'alt',
            'width',
            'height',
            'loading'
        ]
    },
    allowedStyles: {
        p: {
            'text-align': [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/
            ]
        },
        h2: {
            'text-align': [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/
            ]
        },
        h3: {
            'text-align': [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/
            ]
        },
        h4: {
            'text-align': [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/
            ]
        },
        div: {
            'text-align': [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/
            ]
        }
    },
    transformTags: {
        a: (tagName, attribs)=>{
            const href = attribs.href || '';
            const isExternal = /^https?:\/\//i.test(href);
            return {
                tagName,
                attribs: {
                    ...attribs,
                    rel: isExternal ? 'noopener noreferrer' : attribs.rel,
                    target: isExternal ? '_blank' : attribs.target
                }
            };
        }
    },
    allowedSchemes: [
        'http',
        'https',
        'mailto',
        'tel'
    ]
};
function sanitizeAboutIntroBodyHtml(raw) {
    const s = raw.trim();
    if (!s) return '';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(s, OPTIONS);
}
}),
"[project]/backend/src/lib/contentCategoryAssignments.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteCategoryAssignment",
    ()=>deleteCategoryAssignment,
    "getCategoryAssignments",
    ()=>getCategoryAssignments,
    "getManagedCategories",
    ()=>getManagedCategories,
    "setCategoryAssignment",
    ()=>setCategoryAssignment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
;
function categoryDefsKey(entity) {
    return `admin.categories.${entity}`;
}
function assignmentKey(entity) {
    return `admin.categoryAssignments.${entity}`;
}
async function getManagedCategories(entity) {
    const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: categoryDefsKey(entity)
        }
    });
    if (!setting?.value) return [];
    try {
        const parsed = JSON.parse(setting.value);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>item).filter((x)=>typeof x.name === 'string' && typeof x.slug === 'string').map((x, idx)=>({
                id: Number(x.id) || idx + 1,
                name: String(x.name),
                slug: String(x.slug),
                sortOrder: Number.isFinite(Number(x.sortOrder)) ? Number(x.sortOrder) : 0,
                isActive: x.isActive === undefined ? true : Boolean(x.isActive)
            })).sort((a, b)=>a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
    } catch  {
        return [];
    }
}
async function getCategoryAssignments(entity) {
    const setting = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: assignmentKey(entity)
        }
    });
    if (!setting?.value) return {};
    try {
        const parsed = JSON.parse(setting.value);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
        const out = {};
        for (const [k, v] of Object.entries(parsed)){
            if (typeof v !== 'string') continue;
            const id = Number(k);
            if (!Number.isFinite(id) || id <= 0) continue;
            out[String(id)] = v;
        }
        return out;
    } catch  {
        return {};
    }
}
async function writeCategoryAssignments(entity, map) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.upsert({
        where: {
            key: assignmentKey(entity)
        },
        update: {
            value: JSON.stringify(map),
            updatedAt: new Date()
        },
        create: {
            key: assignmentKey(entity),
            value: JSON.stringify(map)
        }
    });
}
async function setCategoryAssignment(entity, itemId, categorySlug) {
    const map = await getCategoryAssignments(entity);
    const key = String(itemId);
    if (categorySlug && categorySlug.trim()) map[key] = categorySlug.trim();
    else delete map[key];
    await writeCategoryAssignments(entity, map);
}
async function deleteCategoryAssignment(entity, itemId) {
    const map = await getCategoryAssignments(entity);
    delete map[String(itemId)];
    await writeCategoryAssignments(entity, map);
}
}),
"[project]/backend/src/lib/i18nContent.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Public + admin locale helpers for EN primary + optional VI overrides. */ __turbopack_context__.s([
    "parseLocaleQuery",
    ()=>parseLocaleQuery,
    "pickLocalized",
    ()=>pickLocalized
]);
const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE === 'vi-VN' ? 'vi-VN' : 'en-US';
function parseLocaleQuery(searchParams) {
    const raw = String(searchParams.get('locale') ?? '').trim();
    if (raw === 'en-US' || raw === 'vi-VN') return raw;
    return DEFAULT_LOCALE;
}
function pickLocalized(en, vi, locale) {
    const e = (en ?? '').trim();
    const v = (vi ?? '').trim();
    if (locale === 'vi-VN') {
        if (v) return v;
        return e || v;
    }
    return e || v;
}
}),
"[project]/backend/app/api/home/features/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/sanitizeAboutIntroHtml.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$contentCategoryAssignments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/contentCategoryAssignments.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$i18nContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/i18nContent.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = String(searchParams.get('category') ?? '').trim().toLowerCase();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$i18nContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLocaleQuery"])(searchParams);
    const list = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].homeFeature.findMany({
        where: {
            isActive: true
        },
        orderBy: [
            {
                order: 'asc'
            },
            {
                id: 'asc'
            }
        ],
        select: {
            id: true,
            icon: true,
            title: true,
            titleVi: true,
            description: true,
            descriptionVi: true
        }
    });
    const [categories, assignments] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$contentCategoryAssignments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getManagedCategories"])('banners'),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$contentCategoryAssignments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCategoryAssignments"])('banners')
    ]);
    const mapped = (Array.isArray(list) ? list : []).map((item)=>{
        const categorySlug = assignments[String(item.id)] ?? null;
        const categoryName = categorySlug ? categories.find((c)=>c.slug === categorySlug)?.name ?? null : null;
        const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$i18nContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickLocalized"])(item.title, item.titleVi, locale);
        const rawDesc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$i18nContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickLocalized"])(item.description, item.descriptionVi, locale);
        return {
            id: item.id,
            icon: item.icon,
            title,
            description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(rawDesc ?? ''),
            categorySlug,
            categoryName
        };
    });
    const filtered = category ? mapped.filter((item)=>(item.categorySlug ?? '').toLowerCase() === category) : mapped;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items: filtered,
        categories: categories.filter((c)=>c.isActive).map((c)=>({
                slug: c.slug,
                name: c.name
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0xu5sq7._.js.map