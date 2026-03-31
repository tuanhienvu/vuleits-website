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
"[project]/backend/src/lib/legalPageSetting.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRIVACY_POLICY_SETTING_KEY",
    ()=>PRIVACY_POLICY_SETTING_KEY,
    "TERMS_OF_SERVICE_SETTING_KEY",
    ()=>TERMS_OF_SERVICE_SETTING_KEY,
    "defaultPrivacyPolicyPayload",
    ()=>defaultPrivacyPolicyPayload,
    "defaultTermsOfServicePayload",
    ()=>defaultTermsOfServicePayload,
    "parseLegalPageJson",
    ()=>parseLegalPageJson,
    "serializeLegalPagePayload",
    ()=>serializeLegalPagePayload,
    "toPublicLegalPage",
    ()=>toPublicLegalPage
]);
const PRIVACY_POLICY_SETTING_KEY = 'legal_privacy_policy_page';
const TERMS_OF_SERVICE_SETTING_KEY = 'legal_terms_of_service_page';
function buildDefaultPayload(kind) {
    if (kind === 'privacy') {
        return {
            titleEn: 'Privacy',
            titleVi: 'Chinh sach bao mat',
            bodyEn: '<h2>1. Introduction</h2><p>Welcome to VULE ITS Website. We are committed to protecting your privacy and ensuring a safe experience on our website.</p><h2>2. Information We Collect</h2><p>We may collect contact information, usage data, and technical data required to provide and improve our services.</p><h2>3. How We Use Information</h2><p>We use collected information to operate services, provide support, and improve product quality.</p><h2>4. Contact</h2><p>For privacy-related requests, please contact us through the Contact section.</p>',
            bodyVi: '<h2>1. Gioi thieu</h2><p>VULE ITS cam ket bao ve quyen rieng tu va mang den trai nghiem an toan cho nguoi dung.</p><h2>2. Du lieu thu thap</h2><p>Chung toi co the thu thap thong tin lien he, du lieu su dung va thong tin ky thuat can thiet de van hanh dich vu.</p><h2>3. Muc dich su dung</h2><p>Du lieu duoc su dung de cung cap dich vu, ho tro khach hang va nang cao chat luong san pham.</p><h2>4. Lien he</h2><p>Vui long lien he qua muc Lien he neu ban co yeu cau lien quan den bao mat.</p>',
            updatedAtLabelEn: 'Last updated: December 13, 2025',
            updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025'
        };
    }
    return {
        titleEn: 'Terms',
        titleVi: 'Dieu khoan su dung',
        bodyEn: '<h2>1. Agreement to Terms</h2><p>By accessing this website, you agree to these terms and applicable laws.</p><h2>2. Use License</h2><p>Website materials are provided for lawful use only. You may not misuse, reverse engineer, or redistribute protected content without permission.</p><h2>3. Disclaimer</h2><p>Materials are provided "as is" without warranties to the fullest extent permitted by law.</p><h2>4. Contact</h2><p>For legal questions, please contact us via the Contact section.</p>',
        bodyVi: '<h2>1. Dong y dieu khoan</h2><p>Khi truy cap website, ban dong y voi cac dieu khoan va quy dinh phap luat lien quan.</p><h2>2. Quyen su dung</h2><p>Noi dung tren website chi duoc su dung dung muc dich hop phap. Khong duoc sao chep, dao nguoc hoac phan phoi trai phep.</p><h2>3. Tuyen bo mien tru</h2><p>Noi dung duoc cung cap theo hien trang va khong bao gom cac bao hanh ngoai quy dinh phap luat.</p><h2>4. Lien he</h2><p>Vui long lien he qua muc Lien he neu ban co cau hoi phap ly.</p>',
        updatedAtLabelEn: 'Last updated: December 13, 2025',
        updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025'
    };
}
function defaultPrivacyPolicyPayload() {
    return buildDefaultPayload('privacy');
}
function defaultTermsOfServicePayload() {
    return buildDefaultPayload('terms');
}
function parseLegalPageJson(raw, kind) {
    const base = buildDefaultPayload(kind);
    if (!raw?.trim()) return base;
    try {
        const o = JSON.parse(raw);
        return {
            titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : base.titleEn,
            titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : base.titleVi,
            bodyEn: typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 40000) : base.bodyEn,
            bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 40000) : base.bodyVi,
            updatedAtLabelEn: typeof o.updatedAtLabelEn === 'string' ? o.updatedAtLabelEn.slice(0, 200) : base.updatedAtLabelEn,
            updatedAtLabelVi: typeof o.updatedAtLabelVi === 'string' ? o.updatedAtLabelVi.slice(0, 200) : base.updatedAtLabelVi
        };
    } catch  {
        return base;
    }
}
function serializeLegalPagePayload(p) {
    return JSON.stringify({
        titleEn: p.titleEn.trim(),
        titleVi: p.titleVi.trim(),
        bodyEn: p.bodyEn.trim(),
        bodyVi: p.bodyVi.trim(),
        updatedAtLabelEn: p.updatedAtLabelEn.trim(),
        updatedAtLabelVi: p.updatedAtLabelVi.trim()
    });
}
function toPublicLegalPage(payload, locale) {
    const vi = locale === 'vi-VN';
    return {
        title: (vi ? payload.titleVi : payload.titleEn).trim(),
        bodyHtml: (vi ? payload.bodyVi : payload.bodyEn).trim(),
        updatedAtLabel: (vi ? payload.updatedAtLabelVi : payload.updatedAtLabelEn).trim()
    };
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
"[project]/backend/app/api/privacy-policy/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/legalPageSetting.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/sanitizeAboutIntroHtml.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') === 'vi-VN' ? 'vi-VN' : 'en-US';
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PRIVACY_POLICY_SETTING_KEY"]
        }
    });
    const payload = row?.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLegalPageJson"])(row.value, 'privacy') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultPrivacyPolicyPayload"])();
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPublicLegalPage"])(payload, locale);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ...raw,
        bodyHtml: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$sanitizeAboutIntroHtml$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAboutIntroBodyHtml"])(raw.bodyHtml)
    }, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed4fe3ef._.js.map