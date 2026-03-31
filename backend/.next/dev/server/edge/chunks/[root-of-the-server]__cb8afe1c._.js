(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__cb8afe1c._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/backend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function allowedOrigins() {
    const raw = process.env.CORS_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    return raw.split(',').map((x)=>x.trim()).filter(Boolean);
}
function corsHeadersFor(origin) {
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        Vary: 'Origin'
    };
}
function securityHeaders() {
    return {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };
}
function middleware(request) {
    const origin = request.headers.get('origin')?.trim() ?? '';
    const allowlist = allowedOrigins();
    const isAllowedOrigin = !!origin && allowlist.includes(origin);
    if (request.method === 'OPTIONS') {
        if (origin && !isAllowedOrigin) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Origin not allowed', {
                status: 403
            });
        }
        const res = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 204
        });
        if (isAllowedOrigin) {
            const cors = corsHeadersFor(origin);
            for (const [k, v] of Object.entries(cors))res.headers.set(k, v);
        }
        const sec = securityHeaders();
        for (const [k, v] of Object.entries(sec))res.headers.set(k, v);
        return res;
    }
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (isAllowedOrigin) {
        const cors = corsHeadersFor(origin);
        for (const [k, v] of Object.entries(cors))res.headers.set(k, v);
    }
    const sec = securityHeaders();
    for (const [k, v] of Object.entries(sec))res.headers.set(k, v);
    return res;
}
const config = {
    matcher: [
        '/api/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__cb8afe1c._.js.map