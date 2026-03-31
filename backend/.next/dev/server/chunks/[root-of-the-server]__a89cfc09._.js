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
"[project]/backend/src/lib/adminPermissionModel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Client-safe permission model (no Prisma). Keep in sync with effectivePermissions server helpers. */ __turbopack_context__.s([
    "UI_FEATURES",
    ()=>UI_FEATURES,
    "makeEmptyAdminMatrix",
    ()=>makeEmptyAdminMatrix
]);
const UI_FEATURES = [
    'overview',
    'services',
    'products',
    'news',
    'media',
    'banners',
    'homeFeatures',
    'uiTexts',
    'contacts',
    'aboutTeam',
    'aboutStats',
    'users',
    'userPassword',
    'permissions'
];
function makeEmptyAdminMatrix() {
    const out = {};
    for (const f of UI_FEATURES){
        out[f] = {
            create: false,
            read: false,
            update: false,
            delete: false
        };
    }
    return out;
}
}),
"[project]/backend/src/lib/effectivePermissions.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PERMISSION_ACTIONS",
    ()=>PERMISSION_ACTIONS,
    "buildPermissionName",
    ()=>buildPermissionName,
    "featureToPermissionPrefix",
    ()=>featureToPermissionPrefix,
    "getEffectiveFeatureMatrix",
    ()=>getEffectiveFeatureMatrix,
    "getRoleFeatureMatrix",
    ()=>getRoleFeatureMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/adminPermissionModel.ts [app-route] (ecmascript)");
;
;
;
const featureToPermissionPrefix = {
    overview: 'site',
    services: 'services',
    products: 'products',
    news: 'news',
    media: 'media',
    banners: 'banners',
    homeFeatures: 'homeFeatures',
    uiTexts: 'uiTexts',
    contacts: 'contacts',
    aboutTeam: 'aboutTeam',
    aboutStats: 'aboutStats',
    users: 'users',
    userPassword: 'userPassword',
    permissions: 'permissions'
};
const PERMISSION_ACTIONS = [
    'create',
    'read',
    'update',
    'delete'
];
function buildPermissionName(prefix, action) {
    return `${prefix}.${action}`;
}
async function getEffectiveFeatureMatrix(userId) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            roleId: true
        }
    });
    if (!user) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    const permissionNames = [];
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = featureToPermissionPrefix[f];
        for (const a of PERMISSION_ACTIONS)permissionNames.push(buildPermissionName(prefix, a));
    }
    const permissions = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findMany({
        where: {
            name: {
                in: permissionNames
            }
        },
        select: {
            id: true,
            name: true
        }
    });
    const nameToId = new Map(permissions.map((p)=>[
            p.name,
            p.id
        ]));
    const ids = permissions.map((p)=>p.id);
    const userPerms = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findMany({
        where: {
            userId: user.id,
            permissionId: {
                in: ids
            }
        },
        select: {
            permissionId: true
        }
    });
    const rolePerms = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findMany({
        where: {
            roleId: user.roleId,
            permissionId: {
                in: ids
            }
        },
        select: {
            permissionId: true
        }
    });
    const userSet = new Set(userPerms.map((p)=>p.permissionId));
    const roleSet = new Set(rolePerms.map((p)=>p.permissionId));
    const matrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = featureToPermissionPrefix[f];
        matrix[f] = {
            create: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'create'));
                if (!id) return false;
                return userSet.has(id) || roleSet.has(id);
            })(),
            read: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'read'));
                if (!id) return false;
                return userSet.has(id) || roleSet.has(id);
            })(),
            update: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'update'));
                if (!id) return false;
                return userSet.has(id) || roleSet.has(id);
            })(),
            delete: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'delete'));
                if (!id) return false;
                return userSet.has(id) || roleSet.has(id);
            })()
        };
    }
    return matrix;
}
async function getRoleFeatureMatrix(roleId) {
    const role = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].role.findUnique({
        where: {
            id: roleId
        },
        select: {
            id: true
        }
    });
    if (!role) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    const permissionNames = [];
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = featureToPermissionPrefix[f];
        for (const a of PERMISSION_ACTIONS)permissionNames.push(buildPermissionName(prefix, a));
    }
    const permissions = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findMany({
        where: {
            name: {
                in: permissionNames
            }
        },
        select: {
            id: true,
            name: true
        }
    });
    const nameToId = new Map(permissions.map((p)=>[
            p.name,
            p.id
        ]));
    const ids = permissions.map((p)=>p.id);
    const rolePerms = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findMany({
        where: {
            roleId,
            permissionId: {
                in: ids
            }
        },
        select: {
            permissionId: true
        }
    });
    const roleSet = new Set(rolePerms.map((p)=>p.permissionId));
    const matrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = featureToPermissionPrefix[f];
        matrix[f] = {
            create: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'create'));
                if (!id) return false;
                return roleSet.has(id);
            })(),
            read: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'read'));
                if (!id) return false;
                return roleSet.has(id);
            })(),
            update: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'update'));
                if (!id) return false;
                return roleSet.has(id);
            })(),
            delete: (()=>{
                const id = nameToId.get(buildPermissionName(prefix, 'delete'));
                if (!id) return false;
                return roleSet.has(id);
            })()
        };
    }
    return matrix;
}
}),
"[project]/backend/src/lib/adminRoleRank.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROLE_ORDER",
    ()=>ROLE_ORDER,
    "getRoleRank",
    ()=>getRoleRank,
    "normalizeRoleName",
    ()=>normalizeRoleName
]);
const ROLE_ORDER = [
    'SYSADMIN',
    'ADMIN',
    'MANAGER',
    'EDITOR',
    'WRITER'
];
function normalizeRoleName(name) {
    return (name || '').toUpperCase();
}
function getRoleRank(roleName) {
    const n = normalizeRoleName(roleName);
    const idx = ROLE_ORDER.indexOf(n);
    return idx === -1 ? ROLE_ORDER.length : idx;
}
}),
"[project]/backend/src/lib/adminUsersModule.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canAccessUsersModule",
    ()=>canAccessUsersModule,
    "enforceUsersModuleAccess",
    ()=>enforceUsersModuleAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/adminRoleRank.ts [app-route] (ecmascript)");
;
;
;
;
/** Only these roles may access Users / Permissions admin APIs and UI. */ const USERS_MODULE_ROLES = new Set([
    'SYSADMIN',
    'ADMIN'
]);
function canAccessUsersModule(roleName) {
    return USERS_MODULE_ROLES.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(roleName));
}
async function enforceUsersModuleAccess(userId) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        include: {
            role: {
                select: {
                    name: true
                }
            }
        }
    });
    if (!user?.role) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        });
    }
    if (!canAccessUsersModule(user.role.name)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden: Users and Permissions are limited to SYSADMIN and ADMIN roles.'
        }, {
            status: 403
        });
    }
    return null;
}
}),
"[project]/backend/app/api/admin/me-permissions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/backend/src/lib/effectivePermissions.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminUsersModule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/backend/src/lib/adminUsersModule.ts [app-route] (ecmascript) <locals>");
;
;
;
;
;
async function GET(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorize"])(req);
    if (auth.error) return auth.error;
    const features = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEffectiveFeatureMatrix"])(auth.user.id);
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: auth.user.id
        },
        include: {
            role: {
                select: {
                    name: true
                }
            }
        }
    });
    if (user?.role && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$adminUsersModule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessUsersModule"])(user.role.name)) {
        const none = {
            create: false,
            read: false,
            update: false,
            delete: false
        };
        features.users = {
            ...none
        };
        features.userPassword = {
            ...none
        };
        features.permissions = {
            ...none
        };
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        features
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a89cfc09._.js.map