module.exports = [
"[externals]/next/dist/build/adapter/setup-node-env.external.js [external] (next/dist/build/adapter/setup-node-env.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/build/adapter/setup-node-env.external.js", () => require("next/dist/build/adapter/setup-node-env.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/memory-cache.external.js [external] (next/dist/server/lib/incremental-cache/memory-cache.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/memory-cache.external.js", () => require("next/dist/server/lib/incremental-cache/memory-cache.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js [external] (next/dist/server/lib/incremental-cache/shared-cache-controls.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js", () => require("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/backend/src/lib/logger.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Structured logging aligned with common operational standards:
 * - Timestamps: ISO 8601 (`@timestamp`)
 * - Severity: RFC 5424 syslog levels (0–7) in `log.syslog.severity.code`
 * - Format: JSON lines (default in production) for ELK / CloudWatch / Loki
 * - Fields: ECS-inspired (`log.level`, `service.name`, `trace.id`, `error.*`)
 *
 * Env: `LOG_LEVEL` = debug | info | warn | error (default: info in production, debug in dev)
 *      `LOG_FORMAT` = json | pretty (default: json in production, pretty in dev)
 */ __turbopack_context__.s([
    "createRequestLogger",
    ()=>createRequestLogger,
    "log",
    ()=>log
]);
/** RFC 5424 syslog severity codes (0 = emergency … 7 = debug). */ const SYSLOG_CODE = {
    error: 3,
    warn: 4,
    info: 6,
    debug: 7
};
const LEVEL_ORDER = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
const SERVICE_NAME = 'vuleits-backend';
const SERVICE_VERSION = process.env.SERVICE_VERSION?.trim() || process.env.npm_package_version || '0.1.0';
function envLogLevel() {
    const raw = process.env.LOG_LEVEL?.trim().toLowerCase();
    if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') return raw;
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'debug';
}
function envFormat() {
    const raw = process.env.LOG_FORMAT?.trim().toLowerCase();
    if (raw === 'json' || raw === 'pretty') return raw;
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'pretty';
}
function shouldEmit(level) {
    return LEVEL_ORDER[level] >= LEVEL_ORDER[envLogLevel()];
}
const REDACT_KEYS = /password|secret|token|authorization|cookie|set-cookie|jwt/i;
function redactDeep(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)){
        if (REDACT_KEYS.test(k)) {
            out[k] = '[REDACTED]';
        } else if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
            out[k] = redactDeep(v);
        } else {
            out[k] = v;
        }
    }
    return out;
}
function serializeError(err) {
    if (err instanceof Error) {
        return {
            type: err.name,
            message: err.message,
            stack: err.stack
        };
    }
    return {
        message: String(err)
    };
}
function emitRecord(level, message, fields) {
    if (!shouldEmit(level)) return;
    const safe = fields ? redactDeep(fields) : undefined;
    const record = {
        '@timestamp': new Date().toISOString(),
        message,
        log: {
            level,
            logger: SERVICE_NAME,
            syslog: {
                severity: {
                    code: SYSLOG_CODE[level]
                }
            }
        },
        service: {
            name: SERVICE_NAME,
            version: SERVICE_VERSION
        },
        ...safe && Object.keys(safe).length > 0 ? safe : {}
    };
    const fmt = envFormat();
    if (fmt === 'pretty') {
        const ts = record['@timestamp'];
        const line = `[${ts}] ${level.toUpperCase()} ${message}${safe ? ` ${JSON.stringify(safe)}` : ''}`;
        if (level === 'error') console.error(line);
        else if (level === 'warn') console.warn(line);
        else console.log(line);
        return;
    }
    const line = JSON.stringify(record);
    if (level === 'error') console.error(line);
    else console.log(line);
}
const log = {
    debug: (message, fields)=>emitRecord('debug', message, fields),
    info: (message, fields)=>emitRecord('info', message, fields),
    warn: (message, fields)=>emitRecord('warn', message, fields),
    error: (message, fields)=>emitRecord('error', message, fields),
    /** Log an Error with optional extra ECS-style `error.*` fields. */ exception: (message, err, fields)=>{
        const errObj = serializeError(err);
        emitRecord('error', message, {
            ...fields,
            error: {
                message: errObj.message,
                ...errObj.type ? {
                    type: errObj.type
                } : {},
                ...errObj.stack ? {
                    stack_trace: errObj.stack
                } : {}
            }
        });
    }
};
function createRequestLogger(request) {
    const traceId = request.headers.get('x-request-id')?.trim() || request.headers.get('x-correlation-id')?.trim() || undefined;
    const base = ()=>traceId ? {
            trace: {
                id: traceId
            },
            'http.request.id': traceId
        } : {};
    return {
        debug: (message, fields)=>log.debug(message, {
                ...base(),
                ...fields
            }),
        info: (message, fields)=>log.info(message, {
                ...base(),
                ...fields
            }),
        warn: (message, fields)=>log.warn(message, {
                ...base(),
                ...fields
            }),
        error: (message, fields)=>log.error(message, {
                ...base(),
                ...fields
            }),
        exception: (message, err, fields)=>log.exception(message, err, {
                ...base(),
                ...fields
            })
    };
}
}),
"[project]/backend/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/logger.ts [middleware] (ecmascript)");
;
;
function allowedOrigins() {
    return [
        'http://localhost:3001',
        'http://127.0.0.1:3001',
        'https://vuleits.com',
        'https://www.vuleits.com'
    ];
}
const ALLOWED_ORIGINS = new Set(allowedOrigins());
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
function proxy(request) {
    const requestId = request.headers.get('x-request-id')?.trim() || request.headers.get('x-correlation-id')?.trim() || globalThis.crypto.randomUUID();
    const origin = request.headers.get('origin')?.trim() ?? '';
    const isAllowedOrigin = !!origin && ALLOWED_ORIGINS.has(origin);
    if (request.method === 'OPTIONS') {
        if (origin && !isAllowedOrigin) {
            const denied = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"]('Origin not allowed', {
                status: 403
            });
            denied.headers.set('x-request-id', requestId);
            return denied;
        }
        const res = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 204
        });
        if (isAllowedOrigin) {
            const cors = corsHeadersFor(origin);
            for (const [k, v] of Object.entries(cors))res.headers.set(k, v);
        }
        const sec = securityHeaders();
        for (const [k, v] of Object.entries(sec))res.headers.set(k, v);
        res.headers.set('x-request-id', requestId);
        return res;
    }
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (isAllowedOrigin) {
        const cors = corsHeadersFor(origin);
        for (const [k, v] of Object.entries(cors))res.headers.set(k, v);
    }
    const sec = securityHeaders();
    for (const [k, v] of Object.entries(sec))res.headers.set(k, v);
    res.headers.set('x-request-id', requestId);
    if (process.env.LOG_HTTP_ACCESS === '1' || process.env.LOG_HTTP_ACCESS === 'true') {
        const u = new URL(request.url);
        __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["log"].info('http.request', {
            trace: {
                id: requestId
            },
            http: {
                request: {
                    method: request.method,
                    id: requestId
                }
            },
            url: {
                path: u.pathname,
                query: u.search || undefined
            },
            event: {
                category: 'web',
                action: 'request'
            }
        });
    }
    return res;
}
const config = {
    matcher: [
        '/api/:path*'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hslhf2._.js.map