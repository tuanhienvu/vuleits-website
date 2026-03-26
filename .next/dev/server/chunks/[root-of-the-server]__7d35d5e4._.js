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
"[project]/WebPortal/vuleits-website/src/lib/products/jsonArrays.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asStringArray",
    ()=>asStringArray
]);
function asStringArray(v) {
    if (!Array.isArray(v)) return [];
    return v.filter((x)=>typeof x === 'string');
}
}),
"[project]/WebPortal/vuleits-website/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/products/jsonArrays.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const q = String(searchParams.get('q') ?? '').trim();
    const categorySlug = String(searchParams.get('category') ?? '').trim();
    const techParam = String(searchParams.get('tech') ?? '').trim();
    const techIds = techParam.split(',').map((s)=>Number.parseInt(s.trim(), 10)).filter((n)=>Number.isFinite(n) && n > 0);
    const take = Math.min(Math.max(Number(searchParams.get('take') ?? 60) || 60, 1), 120);
    const where = {
        status: 'Active'
    };
    if (categorySlug) {
        where.category = {
            slug: categorySlug
        };
    }
    if (techIds.length) {
        where.technologies = {
            some: {
                technologyId: {
                    in: techIds
                }
            }
        };
    }
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        where,
        take,
        orderBy: [
            {
                isFeatured: 'desc'
            },
            {
                updatedAt: 'desc'
            }
        ],
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true
                }
            },
            technologies: {
                include: {
                    technology: {
                        select: {
                            id: true,
                            techName: true,
                            techLogo: true
                        }
                    }
                }
            }
        }
    });
    const filtered = q ? items.filter((p)=>{
        const qq = q.toLowerCase();
        return p.productName.toLowerCase().includes(qq) || p.shortDescription.toLowerCase().includes(qq) || p.slug.toLowerCase().includes(qq);
    }) : items;
    const popular = [
        ...filtered
    ].sort((a, b)=>b.viewsCount + b.demoClickCount * 2 - (a.viewsCount + a.demoClickCount * 2));
    const trendingHighlight = popular.filter((p)=>p.category.slug === 'trending').slice(0, 6);
    const trendingTop = trendingHighlight.length >= 3 ? trendingHighlight : popular.slice(0, Math.min(6, popular.length));
    const body = filtered.map((p)=>{
        const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asStringArray"])(p.imageUrls);
        return {
            id: p.id,
            productName: p.productName,
            slug: p.slug,
            shortDescription: p.shortDescription,
            mainImage: images[0] ?? null,
            category: p.category,
            isFeatured: p.isFeatured,
            viewsCount: p.viewsCount,
            demoClickCount: p.demoClickCount,
            technologies: p.technologies.map((t)=>({
                    id: t.technology.id,
                    name: t.technology.techName,
                    logo: t.technology.techLogo
                }))
        };
    });
    const mapTrending = (p)=>{
        const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asStringArray"])(p.imageUrls);
        return {
            id: p.id,
            productName: p.productName,
            slug: p.slug,
            shortDescription: p.shortDescription,
            mainImage: images[0] ?? null,
            category: p.category,
            isFeatured: p.isFeatured,
            viewsCount: p.viewsCount,
            demoClickCount: p.demoClickCount,
            technologies: p.technologies.map((t)=>({
                    id: t.technology.id,
                    name: t.technology.techName,
                    logo: t.technology.techLogo
                }))
        };
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items: body,
        trending: trendingTop.map(mapTrending),
        popular: popular.slice(0, 8).map(mapTrending),
        technologies: await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].technology.findMany({
            orderBy: {
                techName: 'asc'
            },
            select: {
                id: true,
                techName: true,
                techLogo: true
            }
        }),
        categories: await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].productCategory.findMany({
            orderBy: {
                sortOrder: 'asc'
            },
            select: {
                id: true,
                name: true,
                slug: true
            }
        })
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7d35d5e4._.js.map