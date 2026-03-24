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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/WebPortal/vuleits-website/src/lib/jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signJWT",
    ()=>signJWT,
    "verifyJWT",
    ()=>verifyJWT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
function signJWT(payload, expiresIn = '24h') {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sign"])(payload, secret, {
        expiresIn
    });
}
function verifyJWT(token) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"])(token, secret);
    } catch  {
        return null;
    }
}
}),
"[project]/WebPortal/vuleits-website/src/lib/adminEmail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Normalize admin user email for storage and lookup (avoids login failures from spacing/case). */ __turbopack_context__.s([
    "normalizeAdminEmail",
    ()=>normalizeAdminEmail
]);
function normalizeAdminEmail(email) {
    if (email == null) return '';
    return String(email).replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
}
}),
"[project]/WebPortal/vuleits-website/src/lib/adminAuth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorize",
    ()=>authorize,
    "userHasPermission",
    ()=>userHasPermission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/jwt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminEmail.ts [app-route] (ecmascript)");
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
            error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            })
        };
    }
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyJWT"])(token);
    if (!payload) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid or expired token'
            }, {
                status: 401
            })
        };
    }
    let user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAdminEmail"])(payload.email);
        if (n) user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: n
            }
        });
    }
    if (!user) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User not found'
            }, {
                status: 403
            })
        };
    }
    if (!user.isActive) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Account inactive'
            }, {
                status: 403
            })
        };
    }
    if (!requiredPermission) return {
        user
    };
    const perm = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findUnique({
        where: {
            name: requiredPermission
        }
    });
    if (!perm) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Permission not found'
            }, {
                status: 403
            })
        };
    }
    // Check user-specific permission
    const up = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findUnique({
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
    // Check role permissions
    const rp = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findUnique({
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
        error: __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        })
    };
}
async function userHasPermission(userId, permissionName) {
    const perm = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findUnique({
        where: {
            name: permissionName
        }
    });
    if (!perm) return false;
    const up = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findUnique({
        where: {
            userId_permissionId: {
                userId,
                permissionId: perm.id
            }
        }
    });
    if (up) return true;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            roleId: true
        }
    });
    if (!user) return false;
    const rp = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findUnique({
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
"[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shared role ordering (client + server). Lower index = higher privilege. */ __turbopack_context__.s([
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
"[project]/WebPortal/vuleits-website/src/lib/adminUsersModule.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canAccessUsersModule",
    ()=>canAccessUsersModule,
    "enforceUsersModuleAccess",
    ()=>enforceUsersModuleAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-route] (ecmascript)");
;
;
;
;
/** Only these roles may access Users / Permissions admin APIs and UI. */ const USERS_MODULE_ROLES = new Set([
    'SYSADMIN',
    'ADMIN'
]);
function canAccessUsersModule(roleName) {
    return USERS_MODULE_ROLES.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(roleName));
}
async function enforceUsersModuleAccess(userId) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        });
    }
    if (!canAccessUsersModule(user.role.name)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden: Users and Permissions are limited to SYSADMIN and ADMIN roles.'
        }, {
            status: 403
        });
    }
    return null;
}
}),
"[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/WebPortal/vuleits-website/src/lib/effectivePermissions.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PERMISSION_ACTIONS",
    ()=>PERMISSION_ACTIONS,
    "buildPermissionName",
    ()=>buildPermissionName,
    "featureToPermissionPrefix",
    ()=>featureToPermissionPrefix,
    "getEffectiveFeatureMatrix",
    ()=>getEffectiveFeatureMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-route] (ecmascript)");
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
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            roleId: true
        }
    });
    if (!user) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    const permissionNames = [];
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = featureToPermissionPrefix[f];
        for (const a of PERMISSION_ACTIONS)permissionNames.push(buildPermissionName(prefix, a));
    }
    const permissions = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findMany({
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
    const userPerms = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.findMany({
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
    const rolePerms = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].rolePermission.findMany({
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
    const matrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
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
}),
"[project]/WebPortal/vuleits-website/src/lib/roleDefaultUserPermissions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Default UserPermission rows per role — must match prisma/seed.js roleCrudDefaults.
 * New users need these rows because non-SYSADMIN roles have no RolePermission in DB.
 */ __turbopack_context__.s([
    "applyRoleDefaultUserPermissions",
    ()=>applyRoleDefaultUserPermissions,
    "getRoleDefaultMatrix",
    ()=>getRoleDefaultMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminPermissionModel.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/effectivePermissions.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-route] (ecmascript)");
;
;
;
;
const ON = {
    create: true,
    read: true,
    update: true,
    delete: true
};
const OFF = {
    create: false,
    read: false,
    update: false,
    delete: false
};
const CRU_ = {
    create: true,
    read: true,
    update: true,
    delete: false
};
const R___ = {
    create: false,
    read: true,
    update: false,
    delete: false
};
const R_C_ = {
    create: true,
    read: true,
    update: false,
    delete: false
};
function getRoleDefaultMatrix(roleName) {
    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])();
    const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(roleName);
    if (R === 'SYSADMIN' || R === 'ADMIN') {
        for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"])m[f] = {
            ...ON
        };
        return m;
    }
    if (R === 'MANAGER') {
        for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"])m[f] = {
            ...OFF
        };
        const mgr = [
            'overview',
            'services',
            'products',
            'news',
            'media',
            'banners',
            'homeFeatures',
            'contacts',
            'aboutTeam',
            'aboutStats'
        ];
        for (const f of mgr)m[f] = {
            ...CRU_
        };
        m.users = {
            ...OFF
        };
        m.userPassword = {
            ...OFF
        };
        m.permissions = {
            ...OFF
        };
        return m;
    }
    if (R === 'EDITOR') {
        for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"])m[f] = {
            ...OFF
        };
        const ed = [
            'overview',
            'news',
            'media',
            'banners',
            'homeFeatures',
            'contacts',
            'aboutTeam',
            'aboutStats'
        ];
        for (const f of ed)m[f] = {
            ...CRU_
        };
        m.services = {
            ...R___
        };
        m.products = {
            ...R___
        };
        m.users = {
            ...OFF
        };
        m.userPassword = {
            ...OFF
        };
        m.permissions = {
            ...OFF
        };
        return m;
    }
    if (R === 'WRITER') {
        for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"])m[f] = {
            ...OFF
        };
        m.overview = {
            ...R___
        };
        m.news = {
            ...R_C_
        };
        m.media = {
            ...R_C_
        };
        m.banners = {
            ...R___
        };
        m.services = {
            ...R___
        };
        m.products = {
            ...R___
        };
        m.homeFeatures = {
            ...R___
        };
        m.contacts = {
            ...R___
        };
        m.aboutTeam = {
            ...R___
        };
        m.aboutStats = {
            ...R___
        };
        m.users = {
            ...OFF
        };
        m.userPassword = {
            ...OFF
        };
        m.permissions = {
            ...OFF
        };
        return m;
    }
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"])m[f] = {
        ...ON
    };
    return m;
}
async function applyRoleDefaultUserPermissions(userId, roleName) {
    const matrix = getRoleDefaultMatrix(roleName);
    await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.deleteMany({
        where: {
            userId
        }
    });
    const permissionNames = [];
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["featureToPermissionPrefix"][f];
        for (const a of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PERMISSION_ACTIONS"]){
            permissionNames.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildPermissionName"])(prefix, a));
        }
    }
    const permissions = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].permission.findMany({
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
    const rows = [];
    for (const f of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UI_FEATURES"]){
        const prefix = __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["featureToPermissionPrefix"][f];
        const cell = matrix[f];
        for (const a of __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PERMISSION_ACTIONS"]){
            if (!cell[a]) continue;
            const permissionId = nameToId.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$effectivePermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildPermissionName"])(prefix, a));
            if (permissionId != null) rows.push({
                userId,
                permissionId
            });
        }
    }
    if (rows.length > 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPermission.createMany({
            data: rows
        });
    }
}
}),
"[project]/WebPortal/vuleits-website/src/app/api/admin/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminAuth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminUsersModule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminUsersModule.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminRoleRank.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/adminEmail.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$roleDefaultUserPermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/lib/roleDefaultUserPermissions.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function GET(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorize"])(req, 'users.read');
    if (auth.error) return auth.error;
    const gate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminUsersModule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["enforceUsersModuleAccess"])(auth.user.id);
    if (gate) return gate;
    const list = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
        select: {
            id: true,
            email: true,
            displayName: true,
            roleId: true,
            isActive: true,
            isProtected: true
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(list);
}
async function POST(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorize"])(req, 'users.create');
    if (auth.error) return auth.error;
    const gate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminUsersModule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["enforceUsersModuleAccess"])(auth.user.id);
    if (gate) return gate;
    const operator = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
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
    if (!operator?.role) return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Forbidden'
    }, {
        status: 403
    });
    const body = await req.json();
    const { email: rawEmail, password, roleId: bodyRoleId, displayName: bodyDisplayName, isActive: bodyIsActive } = body;
    const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAdminEmail"])(rawEmail);
    const passwordStr = password == null ? '' : String(password);
    if (!email || !passwordStr) return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Missing fields'
    }, {
        status: 400
    });
    const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email
        }
    });
    if (exists) return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'User exists'
    }, {
        status: 409
    });
    const defaultAdmin = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].role.findUnique({
        where: {
            name: 'ADMIN'
        },
        select: {
            id: true
        }
    });
    if (!defaultAdmin) return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Server misconfiguration'
    }, {
        status: 500
    });
    let roleId = defaultAdmin.id;
    if (bodyRoleId != null && bodyRoleId !== '') {
        const n = typeof bodyRoleId === 'number' ? bodyRoleId : Number(bodyRoleId);
        if (Number.isFinite(n)) roleId = n;
    }
    const newRole = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].role.findUnique({
        where: {
            id: roleId
        },
        select: {
            name: true
        }
    });
    if (!newRole) return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Invalid role'
    }, {
        status: 400
    });
    const opRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoleRank"])(operator.role.name);
    const newRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoleRank"])(newRole.name);
    if (newRank < opRank) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden: cannot assign a role above your own'
        }, {
            status: 403
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(newRole.name) === 'SYSADMIN' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$adminRoleRank$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(operator.role.name) !== 'SYSADMIN') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden: only SYSADMIN may assign SYSADMIN role'
        }, {
            status: 403
        });
    }
    const displayName = bodyDisplayName == null || bodyDisplayName === '' ? null : String(bodyDisplayName).trim().slice(0, 150) || null;
    const isActive = typeof bodyIsActive === 'boolean' ? bodyIsActive : true;
    const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(passwordStr, 10);
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.create({
        data: {
            email,
            displayName,
            password: hash,
            roleId,
            isActive
        }
    });
    // UserPermission rows for the chosen role (see getRoleDefaultMatrix / seed roleCrudDefaults).
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$lib$2f$roleDefaultUserPermissions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyRoleDefaultUserPermissions"])(user.id, newRole.name);
    return __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        user: {
            id: user.id,
            email: user.email
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7ebf0d04._.js.map