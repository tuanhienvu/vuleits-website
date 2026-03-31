(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/components/admin/useEscapeToClose.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEscapeToClose",
    ()=>useEscapeToClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useEscapeToClose(active, onClose) {
    _s();
    const onCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onClose);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEscapeToClose.useEffect": ()=>{
            onCloseRef.current = onClose;
        }
    }["useEscapeToClose.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEscapeToClose.useEffect": ()=>{
            if (!active) return;
            const handler = {
                "useEscapeToClose.useEffect.handler": (e)=>{
                    if (e.key !== 'Escape') return;
                    e.preventDefault();
                    void Promise.resolve(onCloseRef.current());
                }
            }["useEscapeToClose.useEffect.handler"];
            document.addEventListener('keydown', handler);
            return ({
                "useEscapeToClose.useEffect": ()=>document.removeEventListener('keydown', handler)
            })["useEscapeToClose.useEffect"];
        }
    }["useEscapeToClose.useEffect"], [
        active
    ]);
}
_s(useEscapeToClose, "8TVmRo+xhWVhVscE3xY3oIrc6nM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/AdminConfirmDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminConfirmDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/useEscapeToClose.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AdminConfirmDialog({ open, title, message, confirmText = 'Delete', cancelText = 'Cancel', confirming = false, origin = null, onCancel, onConfirm }) {
    _s();
    const ANIM_MS = 600;
    const [closing, setClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cancelWithAnim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminConfirmDialog.useCallback[cancelWithAnim]": ()=>{
            if (confirming || closing) return;
            setClosing(true);
            window.setTimeout({
                "AdminConfirmDialog.useCallback[cancelWithAnim]": ()=>{
                    onCancel();
                    setClosing(false);
                }
            }["AdminConfirmDialog.useCallback[cancelWithAnim]"], ANIM_MS);
        }
    }["AdminConfirmDialog.useCallback[cancelWithAnim]"], [
        confirming,
        closing,
        onCancel
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscapeToClose"])(Boolean(open && !confirming && !closing), cancelWithAnim);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-70 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/60",
                onClick: cancelWithAnim
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative glass w-full max-w-md rounded-2xl border border-white/15 p-5 space-y-4 shadow-xl",
                style: {
                    transformOrigin: origin ? `${origin.x}px ${origin.y}px` : undefined,
                    animation: closing ? `modal-zoom-out ${ANIM_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards` : `modal-zoom-in ${ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/75 leading-relaxed",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-2 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-admin-secondary",
                                onClick: cancelWithAnim,
                                disabled: confirming || closing,
                                children: cancelText
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-admin-danger",
                                onClick: onConfirm,
                                disabled: confirming,
                                children: confirming ? 'Deleting…' : confirmText
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/admin/AdminConfirmDialog.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(AdminConfirmDialog, "vJWXg6YtE91SXresPKF5EoyvmG0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useEscapeToClose$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscapeToClose"]
    ];
});
_c = AdminConfirmDialog;
var _c;
__turbopack_context__.k.register(_c, "AdminConfirmDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/useAnimatedOriginModal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getModalOriginFromElement",
    ()=>getModalOriginFromElement,
    "useAnimatedOriginModal",
    ()=>useAnimatedOriginModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function getModalOriginFromElement(el) {
    if (!el) {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
    }
    const r = el.getBoundingClientRect();
    return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2
    };
}
function useAnimatedOriginModal(durationMs = 600, onAfterClose) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [closing, setClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const openFromElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimatedOriginModal.useCallback[openFromElement]": (el)=>{
            setClosing(false);
            setOrigin(getModalOriginFromElement(el));
            setOpen(true);
        }
    }["useAnimatedOriginModal.useCallback[openFromElement]"], []);
    const openCentered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimatedOriginModal.useCallback[openCentered]": ()=>{
            openFromElement(null);
        }
    }["useAnimatedOriginModal.useCallback[openCentered]"], [
        openFromElement
    ]);
    const closeAnimated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimatedOriginModal.useCallback[closeAnimated]": async ()=>{
            if (!open || closing) return;
            setClosing(true);
            await new Promise({
                "useAnimatedOriginModal.useCallback[closeAnimated]": (resolve)=>window.setTimeout(resolve, durationMs)
            }["useAnimatedOriginModal.useCallback[closeAnimated]"]);
            setOpen(false);
            setClosing(false);
            onAfterClose?.();
        }
    }["useAnimatedOriginModal.useCallback[closeAnimated]"], [
        open,
        closing,
        durationMs,
        onAfterClose
    ]);
    return {
        open,
        closing,
        origin,
        durationMs,
        setOpen,
        openFromElement,
        openCentered,
        closeAnimated
    };
}
_s(useAnimatedOriginModal, "9KKRhu8D0kwgGJQrmWvpWz+37e0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/admin/PermissionsAdminPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PermissionsAdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/adminPermissionModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/AdminPermissionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/AdminConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useAnimatedOriginModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/useAnimatedOriginModal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const ACTIONS = [
    'create',
    'read',
    'update',
    'delete'
];
const FEATURE_LABELS = {
    overview: 'Overview',
    services: 'Services',
    products: 'Products',
    news: 'News',
    media: 'Media',
    banners: 'Banners',
    homeFeatures: 'Home features',
    uiTexts: 'UI text & translations',
    contacts: 'Contacts',
    aboutTeam: 'About team',
    aboutStats: 'About stats',
    users: 'Users',
    userPassword: 'User passwords',
    permissions: 'Permissions'
};
function PermissionsAdminPanel() {
    _s();
    const { can } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [roles, setRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRoleId, setSelectedRoleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userTarget, setUserTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [detailLoading, setDetailLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [matrix, setMatrix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PermissionsAdminPanel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])()
    }["PermissionsAdminPanel.useState"]);
    const [locked, setLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetConfirmOpen, setResetConfirmOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetDialogOrigin, setResetDialogOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PermissionsAdminPanel.useCallback[loadUsers]": async ()=>{
            setLoading(true);
            try {
                const [usersRes, rolesRes] = await Promise.all([
                    fetch('/api/admin/users', {
                        credentials: 'include'
                    }),
                    fetch('/api/admin/roles', {
                        credentials: 'include'
                    })
                ]);
                if (!usersRes.ok) throw new Error('Failed');
                const data = await usersRes.json();
                const rows = Array.isArray(data) ? data.filter({
                    "PermissionsAdminPanel.useCallback[loadUsers]": (u)=>u.isActive
                }["PermissionsAdminPanel.useCallback[loadUsers]"]) : [];
                setUsers(rows);
                if (rolesRes.ok) {
                    const roleRows = await rolesRes.json();
                    const validRoles = Array.isArray(roleRows) ? roleRows : [];
                    setRoles(validRoles);
                    setSelectedRoleId({
                        "PermissionsAdminPanel.useCallback[loadUsers]": (cur)=>cur && validRoles.some({
                                "PermissionsAdminPanel.useCallback[loadUsers]": (r)=>r.id === cur
                            }["PermissionsAdminPanel.useCallback[loadUsers]"]) ? cur : validRoles[0]?.id ?? null
                    }["PermissionsAdminPanel.useCallback[loadUsers]"]);
                } else {
                    setRoles([]);
                    setSelectedRoleId(null);
                }
            } catch  {
                toast.error('Failed to load users');
            } finally{
                setLoading(false);
            }
        }
    }["PermissionsAdminPanel.useCallback[loadUsers]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PermissionsAdminPanel.useEffect": ()=>{
            if (!can('permissions', 'read')) return;
            void loadUsers();
        }
    }["PermissionsAdminPanel.useEffect"], [
        can,
        loadUsers
    ]);
    const filteredUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PermissionsAdminPanel.useMemo[filteredUsers]": ()=>users.filter({
                "PermissionsAdminPanel.useMemo[filteredUsers]": (u)=>selectedRoleId ? u.roleId === selectedRoleId : true
            }["PermissionsAdminPanel.useMemo[filteredUsers]"])
    }["PermissionsAdminPanel.useMemo[filteredUsers]"], [
        users,
        selectedRoleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PermissionsAdminPanel.useEffect": ()=>{
            if (userTarget !== 'all' && typeof userTarget === 'number' && !filteredUsers.some({
                "PermissionsAdminPanel.useEffect": (u)=>u.id === userTarget
            }["PermissionsAdminPanel.useEffect"])) {
                setUserTarget('all');
            }
        }
    }["PermissionsAdminPanel.useEffect"], [
        filteredUsers,
        userTarget
    ]);
    const loadRoleDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PermissionsAdminPanel.useCallback[loadRoleDetail]": async (roleId)=>{
            setDetailLoading(true);
            try {
                const res = await fetch(`/api/admin/roles/${roleId}/permissions`, {
                    credentials: 'include'
                });
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                if (data.features && typeof data.features === 'object') {
                    setMatrix(data.features);
                } else {
                    setMatrix((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])());
                }
                setLocked(data.editable === false);
            } catch  {
                toast.error('Failed to load role permissions');
                setMatrix((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])());
            } finally{
                setDetailLoading(false);
            }
        }
    }["PermissionsAdminPanel.useCallback[loadRoleDetail]"], [
        toast
    ]);
    const loadUserDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PermissionsAdminPanel.useCallback[loadUserDetail]": async (userId)=>{
            setDetailLoading(true);
            try {
                const res = await fetch(`/api/admin/permissions/${userId}`, {
                    credentials: 'include'
                });
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                if (data.features && typeof data.features === 'object') {
                    setMatrix(data.features);
                } else {
                    setMatrix((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])());
                }
                setLocked(data.editable === false);
            } catch  {
                toast.error('Failed to load user permissions');
                setMatrix((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEmptyAdminMatrix"])());
            } finally{
                setDetailLoading(false);
            }
        }
    }["PermissionsAdminPanel.useCallback[loadUserDetail]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PermissionsAdminPanel.useEffect": ()=>{
            if (!can('permissions', 'read')) return;
            if (userTarget === 'all') {
                if (!selectedRoleId) return;
                void loadRoleDetail(selectedRoleId);
                return;
            }
            void loadUserDetail(userTarget);
        }
    }["PermissionsAdminPanel.useEffect"], [
        userTarget,
        selectedRoleId,
        can,
        loadRoleDetail,
        loadUserDetail
    ]);
    const toggle = (f, a)=>{
        if (locked || !can('permissions', 'update')) return;
        setMatrix((m)=>({
                ...m,
                [f]: {
                    ...m[f],
                    [a]: !m[f][a]
                }
            }));
    };
    const canRunActions = userTarget === 'all' ? selectedRoleId != null : typeof userTarget === 'number' && filteredUsers.some((u)=>u.id === userTarget);
    const save = async ()=>{
        if (!can('permissions', 'update') || !canRunActions) return;
        setSaving(true);
        try {
            if (userTarget === 'all' && selectedRoleId != null) {
                const res = await fetch(`/api/admin/roles/${selectedRoleId}/permissions`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        features: matrix
                    })
                });
                if (!res.ok) {
                    const j = await res.json().catch(()=>({}));
                    throw new Error(j.error || 'Save failed');
                }
                toast.success('Group permissions saved');
                await loadRoleDetail(selectedRoleId);
            } else if (typeof userTarget === 'number') {
                const res = await fetch(`/api/admin/permissions/${userTarget}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        features: matrix
                    })
                });
                if (!res.ok) {
                    const j = await res.json().catch(()=>({}));
                    throw new Error(j.error || 'Save failed');
                }
                toast.success('Permissions saved');
                await loadUserDetail(userTarget);
            }
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Save failed');
            if (userTarget === 'all' && selectedRoleId != null) await loadRoleDetail(selectedRoleId);
            else if (typeof userTarget === 'number') await loadUserDetail(userTarget);
        } finally{
            setSaving(false);
        }
    };
    const reset = async ()=>{
        if (!can('permissions', 'update') || !canRunActions) return;
        setResetConfirmOpen(true);
    };
    const performReset = async ()=>{
        if (!can('permissions', 'update') || !canRunActions) return;
        setSaving(true);
        try {
            if (userTarget === 'all' && selectedRoleId != null) {
                const res = await fetch(`/api/admin/roles/${selectedRoleId}/permissions`, {
                    method: 'POST',
                    credentials: 'include'
                });
                if (!res.ok) {
                    const j = await res.json().catch(()=>({}));
                    throw new Error(j.error || 'Reset failed');
                }
                toast.success('Group permissions reset');
                await loadRoleDetail(selectedRoleId);
            } else if (typeof userTarget === 'number') {
                const res = await fetch(`/api/admin/permissions/${userTarget}`, {
                    method: 'POST',
                    credentials: 'include'
                });
                if (!res.ok) throw new Error('Reset failed');
                toast.success('Permissions reset');
                await loadUserDetail(userTarget);
            }
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Reset failed');
        } finally{
            setSaving(false);
        }
    };
    if (!can('permissions', 'read')) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white/70",
            children: "No permission."
        }, void 0, false, {
            fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
            lineNumber: 246,
            columnNumber: 12
        }, this);
    }
    const roleName = roles.find((r)=>r.id === selectedRoleId)?.name ?? '—';
    const scopeLine = userTarget === 'all' ? `Editing user group (role): ${roleName}` : `Editing user: ${users.find((u)=>u.id === userTarget)?.email ?? '—'}`;
    const showTable = !loading && !detailLoading && (userTarget === 'all' ? selectedRoleId != null : typeof userTarget === 'number');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col xl:flex-row xl:items-end justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-white",
                        children: "Permissions"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2 sm:items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-white/80 flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "User group"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-w-[200px]",
                                        value: selectedRoleId ?? '',
                                        onChange: (e)=>{
                                            const id = Number(e.target.value) || null;
                                            setSelectedRoleId(id);
                                            setUserTarget('all');
                                        },
                                        children: roles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: r.id,
                                                children: r.name
                                            }, r.id, false, {
                                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-white/80 flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "User"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-w-[220px]",
                                        value: userTarget === 'all' ? 'all' : String(userTarget),
                                        onChange: (e)=>{
                                            const v = e.target.value;
                                            setUserTarget(v === 'all' ? 'all' : Number(v));
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All (group permissions)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            filteredUsers.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: u.id,
                                                    children: u.email
                                                }, u.id, false, {
                                                    fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            can('permissions', 'update') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 items-center sm:ml-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-admin-secondary",
                                        disabled: saving || detailLoading || !canRunActions,
                                        onClick: (e)=>{
                                            setResetDialogOrigin((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$useAnimatedOriginModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalOriginFromElement"])(e.currentTarget));
                                            void reset();
                                        },
                                        children: "Reset to defaults"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-admin-primary",
                                        disabled: saving || detailLoading || !canRunActions,
                                        onClick: ()=>void save(),
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 text-sm",
                children: scopeLine
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/70",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 327,
                columnNumber: 18
            }, this) : null,
            detailLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/70",
                children: "Loading matrix…"
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 328,
                columnNumber: 24
            }, this) : null,
            locked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-amber-200/90 text-sm",
                children: userTarget === 'all' ? 'This role’s permissions cannot be edited (SYSADMIN). View only.' : 'This account’s permissions are managed by role (SYSADMIN / protected). View only.'
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this) : null,
            showTable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-xl border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-xs sm:text-sm text-left text-white/90 min-w-[640px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-white/5 text-white/70",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-2 py-2 sticky left-0 bg-white/10",
                                        children: "Feature"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, this),
                                    ACTIONS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-2 text-center capitalize",
                                            children: a
                                        }, a, false, {
                                            fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                            lineNumber: 344,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                lineNumber: 341,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$adminPermissionModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UI_FEATURES"].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-2 py-2 sticky left-0 bg-black/40 font-medium",
                                            children: FEATURE_LABELS[f]
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, this),
                                        ACTIONS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-2 py-1 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: matrix[f]?.[a] ?? false,
                                                    onChange: ()=>toggle(f, a),
                                                    disabled: locked || !can('permissions', 'update'),
                                                    className: "accent-cyan-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 23
                                                }, this)
                                            }, a, false, {
                                                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                                lineNumber: 355,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, f, true, {
                                    fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                                    lineNumber: 352,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                    lineNumber: 339,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 338,
                columnNumber: 9
            }, this) : null,
            showTable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/50 text-xs max-w-3xl",
                children: [
                    "Default templates: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/65",
                        children: FEATURE_LABELS.uiTexts
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                        lineNumber: 373,
                        columnNumber: 30
                    }, this),
                    " is granted for SYSADMIN, ADMIN, and MANAGER only. EDITOR and WRITER have no UI text access until you enable it in this matrix."
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 372,
                columnNumber: 9
            }, this) : null,
            !loading && userTarget !== 'all' && filteredUsers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60",
                children: "No active users in this group."
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 378,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: resetConfirmOpen,
                origin: resetDialogOrigin,
                title: "Reset permissions",
                message: userTarget === 'all' ? 'Reset this user group role permission set to the default template for this role?' : 'Reset this user permission set to role defaults?',
                confirmText: "Reset",
                confirming: saving,
                onCancel: ()=>!saving ? (setResetConfirmOpen(false), setResetDialogOrigin(null)) : undefined,
                onConfirm: ()=>{
                    void performReset().finally(()=>{
                        setResetConfirmOpen(false);
                        setResetDialogOrigin(null);
                    });
                }
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/admin/PermissionsAdminPanel.tsx",
        lineNumber: 261,
        columnNumber: 5
    }, this);
}
_s(PermissionsAdminPanel, "YAQwGT7EC5dtmfVU11lCqy8O6NQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminPermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = PermissionsAdminPanel;
var _c;
__turbopack_context__.k.register(_c, "PermissionsAdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/admin/permissions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPermissionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$PermissionsAdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/PermissionsAdminPanel.tsx [app-client] (ecmascript)");
'use client';
;
;
function AdminPermissionsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$PermissionsAdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/frontend/app/admin/permissions/page.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = AdminPermissionsPage;
var _c;
__turbopack_context__.k.register(_c, "AdminPermissionsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_86040c48._.js.map