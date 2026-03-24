module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const messagesByLocale = {
    'en-US': {
        'lang.english': 'English (US)',
        'lang.vietnamese': 'Vietnamese',
        // Public nav
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.products': 'Products',
        'nav.news': 'News',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.admin': 'Admin',
        'nav.tagline': 'Bring Your Success',
        'nav.toggleMenu': 'Toggle menu',
        // Admin common
        'admin.panel': 'Admin Panel',
        'admin.overview': 'Overview',
        'admin.users': 'Users',
        'admin.permissions': 'Permissions',
        'admin.productGroup': 'Product Group',
        'admin.contents': 'Contents',
        'admin.settings': 'Settings',
        'admin.permissionGroup': 'Permission',
        'admin.homeFeatures': 'Home Features',
        'admin.aboutStats': 'About Stats',
        'admin.aboutTeam': 'About Team',
        'admin.services': 'Services',
        'admin.products': 'Products',
        'admin.news': 'News',
        'admin.media': 'Media',
        'admin.banners': 'Banners',
        'admin.contacts': 'Contacts',
        'admin.collapse': 'Collapse',
        'admin.expandSidebar': 'Expand sidebar',
        'admin.collapseSidebar': 'Collapse sidebar',
        // Admin header
        'admin.dashboardTitle': 'Admin Dashboard',
        'admin.dashboardWelcome': 'Welcome back! Manage your VULE ITS content.',
        'admin.logout': 'Logout'
    },
    'vi-VN': {
        'lang.english': 'Tiếng Anh (Mỹ)',
        'lang.vietnamese': 'Tiếng Việt',
        // Public nav
        'nav.home': 'Trang chủ',
        'nav.about': 'Giới thiệu',
        'nav.products': 'Sản phẩm',
        'nav.news': 'Tin tức',
        'nav.services': 'Dịch vụ',
        'nav.contact': 'Liên hệ',
        'nav.admin': 'Quản trị',
        'nav.tagline': 'Đưa bạn đến thành công',
        'nav.toggleMenu': 'Mở/đóng menu',
        // Admin common
        'admin.panel': 'Bảng quản trị',
        'admin.overview': 'Tổng quan',
        'admin.users': 'Người dùng',
        'admin.permissions': 'Phân quyền',
        'admin.productGroup': 'Nhóm sản phẩm',
        'admin.contents': 'Nội dung',
        'admin.settings': 'Cài đặt',
        'admin.permissionGroup': 'Quyền hạn',
        'admin.homeFeatures': 'Tính năng trang chủ',
        'admin.aboutStats': 'Chỉ số giới thiệu',
        'admin.aboutTeam': 'Đội ngũ',
        'admin.services': 'Dịch vụ',
        'admin.products': 'Sản phẩm',
        'admin.news': 'Tin tức',
        'admin.media': 'Thư viện',
        'admin.banners': 'Banner',
        'admin.contacts': 'Liên hệ',
        'admin.collapse': 'Thu gọn',
        'admin.expandSidebar': 'Mở rộng thanh bên',
        'admin.collapseSidebar': 'Thu gọn thanh bên',
        // Admin header
        'admin.dashboardTitle': 'Bảng điều khiển',
        'admin.dashboardWelcome': 'Chào mừng trở lại! Quản lý nội dung VULE ITS.',
        'admin.logout': 'Đăng xuất'
    }
};
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'app_locale';
function LocaleProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en-US');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (typeof document !== 'undefined') document.documentElement.lang = locale;
    }, [
        locale
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            locale,
            setLocale: (next)=>setLocaleState(next),
            t: (key)=>messagesByLocale[locale][key] ?? messagesByLocale['en-US'][key] ?? key
        }), [
        locale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/providers/LocaleProvider.tsx",
        lineNumber: 132,
        columnNumber: 10
    }, this);
}
function useLocale() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocaleContext);
    if (!ctx) {
        throw new Error('useLocale must be used inside LocaleProvider');
    }
    return ctx;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__88ea5be6._.js.map