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
"[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/postcss [external] (postcss, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("postcss", () => require("postcss"));

module.exports = mod;
}),
"[project]/backend/src/lib/publicHttpUrl.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitizePublicHttpUrl",
    ()=>sanitizePublicHttpUrl
]);
function sanitizePublicHttpUrl(raw) {
    const s = raw.trim();
    if (!s) return null;
    try {
        const u = new URL(s);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
        return u.href;
    } catch  {
        return null;
    }
}
}),
"[project]/backend/src/lib/news/sanitizeNewsContentHtml.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitizeNewsContentHtml",
    ()=>sanitizeNewsContentHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanitize-html/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/publicHttpUrl.ts [app-route] (ecmascript)");
;
;
function sanitizeImgSrc(raw) {
    const s = raw.trim();
    if (!s) return null;
    if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) return s;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePublicHttpUrl"])(s);
}
const OPTIONS = {
    allowedTags: [
        'h1',
        'h2',
        'h3',
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
        'ul',
        'ol',
        'li',
        'blockquote',
        'div',
        'span',
        'hr',
        'a',
        'img',
        'pre',
        'code'
    ],
    allowedAttributes: {
        a: [
            'href',
            'target',
            'rel'
        ],
        img: [
            'src',
            'alt',
            'loading',
            'decoding',
            'width',
            'height'
        ],
        pre: [
            'class'
        ],
        code: [
            'class'
        ]
    },
    allowedSchemes: [
        'http',
        'https',
        'mailto',
        'tel'
    ],
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
        },
        img: (tagName, attribs)=>{
            const safeSrc = sanitizeImgSrc(String(attribs.src ?? ''));
            if (!safeSrc) return {
                tagName: 'img',
                attribs: {}
            };
            return {
                tagName,
                attribs: {
                    ...attribs,
                    src: safeSrc,
                    loading: 'lazy',
                    decoding: 'async'
                }
            };
        }
    }
};
function sanitizeNewsContentHtml(raw) {
    const s = raw.trim();
    if (!s) return '';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(s, OPTIONS);
}
}),
"[project]/backend/app/api/news/[slug]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$news$2f$sanitizeNewsContentHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/news/sanitizeNewsContentHtml.ts [app-route] (ecmascript)");
;
;
;
async function GET(_req, { params }) {
    const { slug } = await params;
    const article = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].news.findUnique({
        where: {
            slug
        },
        include: {
            author: {
                select: {
                    displayName: true
                }
            },
            image: {
                select: {
                    url: true,
                    filename: true
                }
            }
        }
    });
    if (!article || article.status !== 'Active') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Not found'
    }, {
        status: 404
    });
    const effectiveDate = article.publishedAt ?? article.startDate ?? article.createdAt;
    const now = new Date();
    if (article.publishedAt && effectiveDate > now || !article.publishedAt && article.startDate && effectiveDate > now) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not found'
        }, {
            status: 404
        });
    }
    const relatedCandidates = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].news.findMany({
        where: {
            status: 'Active',
            category: article.category
        },
        orderBy: {
            publishedAt: 'desc'
        },
        take: 12,
        include: {
            author: {
                select: {
                    displayName: true
                }
            },
            image: {
                select: {
                    url: true,
                    filename: true
                }
            }
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        article: {
            id: article.id,
            title: article.title,
            slug: article.slug,
            description: article.description,
            category: article.category,
            publishedAt: effectiveDate.toISOString(),
            authorName: article.author?.displayName ?? '',
            thumbnailSrc: article.image?.url ?? null,
            thumbnailAlt: article.image?.filename ?? null,
            contentHtml: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$news$2f$sanitizeNewsContentHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeNewsContentHtml"])(article.content),
            seoTitle: article.seoTitle ?? null,
            seoDescription: article.seoDescription ?? null,
            seoKeywords: article.seoKeywords ?? null
        },
        related: relatedCandidates.filter((x)=>x.id !== article.id).slice(0, 4).map((x)=>({
                id: x.id,
                title: x.title,
                slug: x.slug,
                description: x.description,
                category: x.category,
                publishedAt: (x.publishedAt ?? x.startDate ?? x.createdAt).toISOString(),
                authorName: x.author?.displayName ?? '',
                thumbnailSrc: x.image?.url ?? null,
                thumbnailAlt: x.image?.filename ?? null
            })),
        breadcrumbs: {
            items: [
                {
                    label: 'Home',
                    href: '/'
                },
                {
                    label: 'News',
                    href: '/news'
                },
                {
                    label: article.category,
                    href: `/news?category=${encodeURIComponent(article.category)}`
                },
                {
                    label: article.title
                }
            ]
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5bfe7756._.js.map