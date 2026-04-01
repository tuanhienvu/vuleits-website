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
"[project]/backend/src/lib/marketingConfig.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MARKETING_CONFIG_SETTING_KEY",
    ()=>MARKETING_CONFIG_SETTING_KEY,
    "parseMarketingConfigJson",
    ()=>parseMarketingConfigJson
]);
const MARKETING_CONFIG_SETTING_KEY = 'marketing_config';
const emptyConfig = {
    enabled: false,
    google: {
        enabled: false,
        gtagId: '',
        ga4Id: '',
        leadConversionLabel: '',
        purchaseConversionLabel: ''
    },
    meta: {
        enabled: false,
        pixelId: ''
    },
    tiktok: {
        enabled: false,
        pixelId: ''
    },
    zalo: {
        enabled: false,
        pixelId: '',
        scriptUrl: ''
    }
};
function readBool(v, fallback) {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') {
        const x = v.trim().toLowerCase();
        if (x === 'true' || x === '1' || x === 'yes' || x === 'on') return true;
        if (x === 'false' || x === '0' || x === 'no' || x === 'off') return false;
    }
    return fallback;
}
function readStr(v, max = 400) {
    return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function parseMarketingConfigJson(raw) {
    if (!raw) return {
        ...emptyConfig
    };
    try {
        const data = JSON.parse(raw);
        const google = data.google ?? {};
        const meta = data.meta ?? {};
        const tiktok = data.tiktok ?? {};
        const zalo = data.zalo ?? {};
        return {
            enabled: readBool(data.enabled, false),
            google: {
                enabled: readBool(google.enabled, false),
                gtagId: readStr(google.gtagId, 120),
                ga4Id: readStr(google.ga4Id, 120),
                leadConversionLabel: readStr(google.leadConversionLabel, 180),
                purchaseConversionLabel: readStr(google.purchaseConversionLabel, 180)
            },
            meta: {
                enabled: readBool(meta.enabled, false),
                pixelId: readStr(meta.pixelId, 180)
            },
            tiktok: {
                enabled: readBool(tiktok.enabled, false),
                pixelId: readStr(tiktok.pixelId, 180)
            },
            zalo: {
                enabled: readBool(zalo.enabled, false),
                pixelId: readStr(zalo.pixelId, 180),
                scriptUrl: readStr(zalo.scriptUrl, 2048)
            }
        };
    } catch  {
        return {
            ...emptyConfig
        };
    }
}
}),
"[project]/backend/app/api/marketing-config/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$marketingConfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/marketingConfig.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function GET() {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].siteSetting.findUnique({
        where: {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$marketingConfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MARKETING_CONFIG_SETTING_KEY"]
        }
    });
    const cfg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$marketingConfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMarketingConfigJson"])(row?.value ?? null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cfg, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c1849944._.js.map