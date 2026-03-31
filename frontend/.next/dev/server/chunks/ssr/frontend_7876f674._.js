module.exports = [
"[project]/frontend/lib/legalPageSetting.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLegalPagePayload",
    ()=>defaultLegalPagePayload
]);
function defaultLegalPagePayload(kind) {
    if (kind === 'privacy') {
        return {
            titleEn: 'Privacy',
            titleVi: 'Chinh sach bao mat',
            bodyEn: '<h2>1. Introduction</h2><p>Welcome to VULE ITS Website. We are committed to protecting your privacy and ensuring a safe experience on our website.</p>',
            bodyVi: '<h2>1. Gioi thieu</h2><p>VULE ITS cam ket bao ve quyen rieng tu va mang den trai nghiem an toan cho nguoi dung.</p>',
            updatedAtLabelEn: 'Last updated: December 13, 2025',
            updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025'
        };
    }
    return {
        titleEn: 'Terms',
        titleVi: 'Dieu khoan su dung',
        bodyEn: '<h2>1. Agreement to Terms</h2><p>By accessing this website, you agree to these terms and applicable laws.</p>',
        bodyVi: '<h2>1. Dong y dieu khoan</h2><p>Khi truy cap website, ban dong y voi cac dieu khoan va quy dinh phap luat lien quan.</p>',
        updatedAtLabelEn: 'Last updated: December 13, 2025',
        updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025'
    };
}
}),
"[project]/frontend/components/pages/TermsOfServicePage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TermsOfServicePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/legalPageSetting.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function TermsOfServicePage() {
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$legalPageSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLegalPagePayload"])('terms');
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        title: locale === 'vi-VN' ? fallback.titleVi : fallback.titleEn,
        bodyHtml: locale === 'vi-VN' ? fallback.bodyVi : fallback.bodyEn,
        updatedAtLabel: locale === 'vi-VN' ? fallback.updatedAtLabelVi : fallback.updatedAtLabelEn
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch(`/api/terms-of-service?locale=${encodeURIComponent(locale)}`);
                if (!res.ok || cancelled) return;
                const payload = await res.json();
                if (!cancelled) setData(payload);
            } catch  {
            // keep fallback
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        locale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "glass p-8 md:p-12 rounded-3xl mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold text-fg mb-4",
                        children: data.title
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-fg-muted text-sm",
                        children: data.updatedAtLabel
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "glass p-8 md:p-12 rounded-3xl mb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "public-prose-rich max-w-none text-fg-muted [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-(--text-primary) [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-(--text-primary) [&_h3]:text-xl [&_h3]:text-(--text-primary) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-(--link-color) [&_a]:underline [&_a]:hover:text-(--link-hover)",
                    dangerouslySetInnerHTML: {
                        __html: data.bodyHtml
                    }
                }, void 0, false, {
                    fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/pages/TermsOfServicePage.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/pages/TermsOfServicePage.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/pages/TermsOfServicePage.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=frontend_7876f674._.js.map