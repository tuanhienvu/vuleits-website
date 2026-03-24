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
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/WebPortal/vuleits-website/src/lib/aboutIntroSetting.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABOUT_INTRO_SETTING_KEY",
    ()=>ABOUT_INTRO_SETTING_KEY,
    "defaultAboutIntroPayload",
    ()=>defaultAboutIntroPayload,
    "parseAboutIntroJson",
    ()=>parseAboutIntroJson,
    "serializeAboutIntroPayload",
    ()=>serializeAboutIntroPayload,
    "toPublicIntro",
    ()=>toPublicIntro
]);
const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';
const DEFAULT = {
    titleEn: 'About Our Vision',
    titleVi: 'Tầm nhìn của chúng tôi',
    bodyEn: `We believe in creating digital experiences that feel natural and intuitive. Our glass morphism design philosophy combines transparency, depth, and subtle animations to create interfaces that users love to interact with.

Founded in 2024, our team of designers and developers are passionate about pushing the boundaries of web design while maintaining accessibility and performance standards.

Every project we undertake is crafted with attention to detail, ensuring that form follows function while never compromising on aesthetic beauty.`,
    bodyVi: `Chúng tôi tin vào việc tạo ra trải nghiệm số tự nhiên và trực quan. Triết lý thiết kế glass morphism kết hợp độ trong suốt, chiều sâu và chuyển động tinh tế để mang lại giao diện người dùng yêu thích.

Được thành lập năm 2024, đội ngũ thiết kế và lập trình của chúng tôi luôn nỗ lực mở rộng giới hạn của thiết kế web, đồng thời đảm bảo khả năng tiếp cận và hiệu năng.

Mỗi dự án đều được chăm chút từng chi tiết, đảm bảo hình thức đi đôi với chức năng mà không hy sinh vẻ đẹp thẩm mỹ.`
};
function defaultAboutIntroPayload() {
    return {
        ...DEFAULT
    };
}
function splitParagraphs(text) {
    return text.split(/\n\s*\n/g).map((p)=>p.trim()).filter(Boolean);
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
            bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000) : base.bodyVi
        };
    } catch  {
        return base;
    }
}
function toPublicIntro(payload, locale) {
    const vi = locale === 'vi-VN';
    const title = (vi ? payload.titleVi : payload.titleEn).trim() || (vi ? DEFAULT.titleVi : DEFAULT.titleEn);
    const body = vi ? payload.bodyVi : payload.bodyEn;
    let paragraphs = splitParagraphs(body);
    if (paragraphs.length === 0) {
        paragraphs = splitParagraphs(vi ? DEFAULT.bodyVi : DEFAULT.bodyEn);
    }
    return {
        title,
        paragraphs
    };
}
function serializeAboutIntroPayload(p) {
    return JSON.stringify({
        titleEn: p.titleEn.trim(),
        titleVi: p.titleVi.trim(),
        bodyEn: p.bodyEn.trim(),
        bodyVi: p.bodyVi.trim()
    });
}
}),
"[project]/WebPortal/vuleits-website/src/app/api/about/intro/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/aboutIntroSetting.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') === 'vi-VN' ? 'vi-VN' : 'en-US';
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ABOUT_INTRO_SETTING_KEY"]
        }
    });
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAboutIntroJson"])(row?.value ?? null);
    const publicIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPublicIntro"])(payload, locale);
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(publicIntro, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5e9a641a._.js.map