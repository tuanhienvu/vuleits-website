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
"[project]/backend/src/lib/products/jsonArrays.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/postcss [external] (postcss, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("postcss", () => require("postcss"));

module.exports = mod;
}),
"[project]/backend/src/lib/products/sanitizeProductHtml.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitizeProductBodyHtml",
    ()=>sanitizeProductBodyHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanitize-html/index.js [app-route] (ecmascript)");
;
const allowedTags = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].defaults.allowedTags,
    'h1',
    'h2',
    'h3',
    'h4',
    'img',
    'pre',
    'code',
    'span',
    'iframe'
];
const allowedAttributes = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].defaults.allowedAttributes,
    a: [
        'href',
        'name',
        'target',
        'rel'
    ],
    img: [
        'src',
        'alt',
        'title',
        'width',
        'height',
        'loading'
    ],
    iframe: [
        'src',
        'title',
        'width',
        'height',
        'allow',
        'allowfullscreen',
        'loading'
    ],
    code: [
        'class'
    ],
    span: [
        'class'
    ]
};
function sanitizeProductBodyHtml(html) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanitize$2d$html$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(html, {
        allowedTags,
        allowedAttributes,
        allowedIframeHostnames: [
            'www.youtube.com',
            'youtube.com',
            'player.vimeo.com',
            'codesandbox.io',
            'stackblitz.com'
        ]
    });
}
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
"[project]/backend/src/lib/products/publicProductDetail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPublicProductBySlug",
    ()=>getPublicProductBySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/products/jsonArrays.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$sanitizeProductHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/products/sanitizeProductHtml.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/sanitizeAboutIntroHtml.ts [app-route] (ecmascript)");
;
;
;
;
async function getPublicProductBySlug(slug) {
    const clean = decodeURIComponent(String(slug ?? '').trim());
    if (!clean) return null;
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findFirst({
        where: {
            slug: clean,
            status: 'Active'
        },
        include: {
            category: true,
            technologies: {
                include: {
                    technology: true
                }
            },
            author: {
                select: {
                    displayName: true
                }
            }
        }
    });
    if (!product) return null;
    const techIds = product.technologies.map((t)=>t.technologyId);
    const relatedRows = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        where: {
            status: 'Active',
            id: {
                not: product.id
            },
            OR: [
                {
                    categoryId: product.categoryId
                },
                ...techIds.length ? [
                    {
                        technologies: {
                            some: {
                                technologyId: {
                                    in: techIds
                                }
                            }
                        }
                    }
                ] : []
            ]
        },
        take: 8,
        include: {
            category: {
                select: {
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
    const scored = relatedRows.map((p)=>({
            p,
            score: p.technologies.filter((t)=>techIds.includes(t.technologyId)).length * 10 + (p.categoryId === product.categoryId ? 5 : 0)
        })).sort((a, b)=>b.score - a.score).slice(0, 4).map((x)=>x.p);
    return {
        id: product.id,
        productName: product.productName,
        slug: product.slug,
        shortDescription: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(product.shortDescription ?? ''),
        fullDescriptionHtml: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$sanitizeProductHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeProductBodyHtml"])(product.fullDescription),
        imageUrls: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asStringArray"])(product.imageUrls),
        videoUrls: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asStringArray"])(product.videoUrls),
        demoLink: product.demoLink,
        landingPageLink: product.landingPageLink,
        embedDemoUrl: product.embedDemoUrl,
        category: product.category,
        viewsCount: product.viewsCount,
        demoClickCount: product.demoClickCount,
        isFeatured: product.isFeatured,
        authorName: product.author.displayName ?? '',
        technologies: product.technologies.map((t)=>({
                id: t.technology.id,
                name: t.technology.techName,
                logo: t.technology.techLogo,
                description: t.technology.description
            })),
        seoTitle: product.seoTitle,
        seoDescription: product.seoDescription,
        related: scored.map((p)=>({
                id: p.id,
                productName: p.productName,
                slug: p.slug,
                shortDescription: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(p.shortDescription ?? ''),
                mainImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$jsonArrays$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asStringArray"])(p.imageUrls)[0] ?? null,
                category: p.category
            }))
    };
}
}),
"[project]/backend/app/api/products/[slug]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$publicProductDetail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/products/publicProductDetail.ts [app-route] (ecmascript)");
;
;
async function GET(_req, ctx) {
    const { slug: raw } = await ctx.params;
    const slug = decodeURIComponent(String(raw ?? '').trim());
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$products$2f$publicProductDetail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPublicProductBySlug"])(slug);
    if (!payload) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Not found'
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(payload);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d5c2b34._.js.map