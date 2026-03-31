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
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/backend/src/lib/jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signJWT",
    ()=>signJWT,
    "verifyJWT",
    ()=>verifyJWT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
function getSecret() {
    const jwtSecret = process.env.JWT_SECRET?.trim();
    if (!jwtSecret) {
        throw new Error('Missing JWT_SECRET environment variable');
    }
    return jwtSecret;
}
function signJWT(payload, expiresIn = '24h') {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sign"])(payload, getSecret(), {
        expiresIn
    });
}
function verifyJWT(token) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"])(token, getSecret());
    } catch  {
        return null;
    }
}
}),
"[project]/backend/src/lib/adminEmail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeAdminEmail",
    ()=>normalizeAdminEmail
]);
function normalizeAdminEmail(email) {
    if (email == null) return '';
    return String(email).replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
}
}),
"[project]/backend/src/lib/adminAuth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorize",
    ()=>authorize,
    "authorizeAny",
    ()=>authorizeAny,
    "userHasPermission",
    ()=>userHasPermission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/jwt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/adminEmail.ts [app-route] (ecmascript)");
;
;
;
;
async function authorize(request, requiredPermission) {
    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/auth_token=([^;]+)/);
    const token = tokenMatch?.[1];
    if (!token) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            })
        };
    }
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyJWT"])(token);
    if (!payload) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid or expired token'
            }, {
                status: 401
            })
        };
    }
    let user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAdminEmail"])(payload.email);
        if (n) user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: n
            }
        });
    }
    if (!user) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User not found'
            }, {
                status: 403
            })
        };
    }
    if (!user.isActive) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Account inactive'
            }, {
                status: 403
            })
        };
    }
    if (!requiredPermission) return {
        user
    };
    const perm = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findUnique({
        where: {
            name: requiredPermission
        }
    });
    if (!perm) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Permission not found'
            }, {
                status: 403
            })
        };
    }
    const up = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findUnique({
        where: {
            userId_permissionId: {
                userId: user.id,
                permissionId: perm.id
            }
        }
    });
    if (up) return {
        user
    };
    const rp = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findUnique({
        where: {
            roleId_permissionId: {
                roleId: user.roleId,
                permissionId: perm.id
            }
        }
    });
    if (rp) return {
        user
    };
    return {
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        })
    };
}
async function authorizeAny(request, requiredPermissions) {
    const base = await authorize(request);
    if (base.error) return base;
    const user = base.user;
    for (const p of requiredPermissions){
        if (await userHasPermission(user.id, p)) return {
            user
        };
    }
    return {
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        })
    };
}
async function userHasPermission(userId, permissionName) {
    const perm = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findUnique({
        where: {
            name: permissionName
        }
    });
    if (!perm) return false;
    const up = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findUnique({
        where: {
            userId_permissionId: {
                userId,
                permissionId: perm.id
            }
        }
    });
    if (up) return true;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            roleId: true
        }
    });
    if (!user) return false;
    const rp = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findUnique({
        where: {
            roleId_permissionId: {
                roleId: user.roleId,
                permissionId: perm.id
            }
        }
    });
    return !!rp;
}
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
"[project]/backend/src/lib/aboutIntroSetting.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABOUT_INTRO_SETTING_KEY",
    ()=>ABOUT_INTRO_SETTING_KEY,
    "defaultAboutIntroPayload",
    ()=>defaultAboutIntroPayload,
    "parseAboutIntroJson",
    ()=>parseAboutIntroJson,
    "sanitizeHeroImageSrc",
    ()=>sanitizeHeroImageSrc,
    "serializeAboutIntroPayload",
    ()=>serializeAboutIntroPayload,
    "toPublicIntro",
    ()=>toPublicIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/publicHttpUrl.ts [app-route] (ecmascript)");
;
const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';
function sanitizeHeroImageSrc(raw) {
    const s = raw.trim();
    if (!s) return null;
    if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) {
        if (/["'<>\s]/.test(s)) return null;
        return s;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePublicHttpUrl"])(s);
}
const DEFAULT = {
    titleEn: 'About Our Vision',
    titleVi: 'Tam nhin cua chung toi',
    bodyEn: 'We build intuitive digital experiences.',
    bodyVi: 'Chung toi xay dung trai nghiem so truc quan.',
    heroImageUrl: '',
    heroImageAltEn: '',
    heroImageAltVi: ''
};
function defaultAboutIntroPayload() {
    return {
        ...DEFAULT
    };
}
function splitParagraphs(text) {
    return text.split(/\n\s*\n/g).map((p)=>p.trim()).filter(Boolean);
}
function introBodyLooksLikeHtml(raw) {
    const t = raw.trim();
    if (!t) return false;
    return /<[a-z][\s\S]*>/i.test(t);
}
function parseAboutIntroJson(raw) {
    const base = defaultAboutIntroPayload();
    if (!raw?.trim()) return base;
    try {
        const o = JSON.parse(raw);
        return {
            titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : base.titleEn,
            titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : base.titleVi,
            bodyEn: typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 20000) : base.bodyEn,
            bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000) : base.bodyVi,
            heroImageUrl: typeof o.heroImageUrl === 'string' ? o.heroImageUrl.slice(0, 2048) : base.heroImageUrl,
            heroImageAltEn: typeof o.heroImageAltEn === 'string' ? o.heroImageAltEn.slice(0, 200) : base.heroImageAltEn,
            heroImageAltVi: typeof o.heroImageAltVi === 'string' ? o.heroImageAltVi.slice(0, 200) : base.heroImageAltVi
        };
    } catch  {
        return base;
    }
}
function toPublicIntro(payload, locale) {
    const vi = locale === 'vi-VN';
    const title = (vi ? payload.titleVi : payload.titleEn).trim() || (vi ? DEFAULT.titleVi : DEFAULT.titleEn);
    const body = vi ? payload.bodyVi : payload.bodyEn;
    let bodyHtml = '';
    let paragraphs = [];
    if (introBodyLooksLikeHtml(body)) bodyHtml = body.trim();
    else {
        paragraphs = splitParagraphs(body);
        if (paragraphs.length === 0) paragraphs = splitParagraphs(vi ? DEFAULT.bodyVi : DEFAULT.bodyEn);
    }
    const heroImageUrl = sanitizeHeroImageSrc(payload.heroImageUrl);
    const altRaw = (vi ? payload.heroImageAltVi : payload.heroImageAltEn).trim().slice(0, 200);
    const heroImageAlt = heroImageUrl ? altRaw || (vi ? 'Hinh minh hoa' : 'Illustration') : '';
    return {
        title,
        bodyHtml,
        paragraphs,
        heroImageUrl,
        heroImageAlt
    };
}
function serializeAboutIntroPayload(p) {
    return JSON.stringify({
        titleEn: p.titleEn.trim(),
        titleVi: p.titleVi.trim(),
        bodyEn: p.bodyEn.trim(),
        bodyVi: p.bodyVi.trim(),
        heroImageUrl: p.heroImageUrl.trim(),
        heroImageAltEn: p.heroImageAltEn.trim(),
        heroImageAltVi: p.heroImageAltVi.trim()
    });
}
}),
"[externals]/postcss [external] (postcss, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("postcss", () => require("postcss"));

module.exports = mod;
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
"[project]/backend/app/api/admin/about-intro/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/aboutIntroSetting.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/sanitizeAboutIntroHtml.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorize"])(req, 'aboutTeam.read');
    if (auth.error) return auth.error;
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ABOUT_INTRO_SETTING_KEY"]
        }
    });
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAboutIntroJson"])(row?.value ?? null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(payload);
}
async function PUT(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorize"])(req, 'aboutTeam.update');
    if (auth.error) return auth.error;
    let body;
    try {
        body = await req.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid JSON'
        }, {
            status: 400
        });
    }
    const o = body;
    const bodyEnRaw = typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 20000).trim() : '';
    const bodyViRaw = typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000).trim() : '';
    const payload = {
        titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : '',
        titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : '',
        bodyEn: bodyEnRaw ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(bodyEnRaw) : '',
        bodyVi: bodyViRaw ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(bodyViRaw) : '',
        heroImageUrl: typeof o.heroImageUrl === 'string' ? o.heroImageUrl.slice(0, 2048) : '',
        heroImageAltEn: typeof o.heroImageAltEn === 'string' ? o.heroImageAltEn.slice(0, 200) : '',
        heroImageAltVi: typeof o.heroImageAltVi === 'string' ? o.heroImageAltVi.slice(0, 200) : ''
    };
    await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.upsert({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ABOUT_INTRO_SETTING_KEY"]
        },
        create: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ABOUT_INTRO_SETTING_KEY"],
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeAboutIntroPayload"])(payload)
        },
        update: {
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeAboutIntroPayload"])(payload)
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        ...payload
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bb3a8eac._.js.map