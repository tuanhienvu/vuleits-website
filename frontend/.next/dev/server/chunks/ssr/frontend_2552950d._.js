module.exports = [
"[project]/frontend/components/navigation/DetailBackButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DetailBackButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
function DetailBackButton({ fallbackHref, label = 'Back', className, onCustomNavigate }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>{
            if (onCustomNavigate) {
                onCustomNavigate();
                return;
            }
            if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.history.length > 1) //TURBOPACK unreachable
            ;
            else {
                router.push(fallbackHref);
            }
        },
        className: className ?? 'mb-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: "←"
            }, void 0, false, {
                fileName: "[project]/frontend/components/navigation/DetailBackButton.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            " ",
            label
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/navigation/DetailBackButton.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/products/interactive/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shape compatible with list API card rows for interactive product UI. */ __turbopack_context__.s([
    "PRODUCT_HERO_LAYOUT_ID",
    ()=>PRODUCT_HERO_LAYOUT_ID
]);
const PRODUCT_HERO_LAYOUT_ID = 'product-hero-';
}),
"[project]/frontend/components/products/interactive/productTransitionStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Card → detail → card fullscreen transition (viewport-relative bounds). */ __turbopack_context__.s([
    "PRODUCT_TRANSITION_STORAGE_KEY",
    ()=>PRODUCT_TRANSITION_STORAGE_KEY,
    "clearProductTransition",
    ()=>clearProductTransition,
    "readProductTransition",
    ()=>readProductTransition,
    "writeProductTransition",
    ()=>writeProductTransition
]);
const PRODUCT_TRANSITION_STORAGE_KEY = 'vuleits_product_transition_v1';
function writeProductTransition(slug, measureEl) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function readProductTransition() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function clearProductTransition() {
    try {
        sessionStorage.removeItem(PRODUCT_TRANSITION_STORAGE_KEY);
    } catch  {
    /* ignore */ }
}
}),
"[project]/frontend/lib/products/videoEmbed.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "youtubeEmbedFromUrl",
    ()=>youtubeEmbedFromUrl
]);
function youtubeEmbedFromUrl(url) {
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com') && u.pathname === '/watch') {
            const id = u.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        if (u.hostname === 'youtu.be') {
            const id = u.pathname.replace(/^\//, '').split('/')[0];
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
    } catch  {
        return null;
    }
    return null;
}
}),
"[project]/frontend/components/products/ProductDetailClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$navigation$2f$DetailBackButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/navigation/DetailBackButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/products/interactive/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/products/interactive/productTransitionStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$products$2f$videoEmbed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/products/videoEmbed.ts [app-ssr] (ecmascript)");
;
'use client';
;
;
;
;
;
;
;
;
;
;
const RelatedProductsRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/frontend/components/products/related/RelatedProductsRow.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
/** Expand: snappier so the detail shell reaches full screen sooner. */ const SHELL_ENTER_SPRING = {
    type: 'spring',
    stiffness: 380,
    damping: 36,
    mass: 0.72
};
/** Collapse back to card: ~30% longer than prior exit (~stiffness 72, mass 1.22). */ const SHELL_EXIT_SPRING = {
    type: 'spring',
    stiffness: 55,
    damping: 36,
    mass: 1.59
};
/**
 * `transform-origin` for fullscreen shell: card hero center as % of the panel.
 * Uses viewport size from when the card was measured (`viewportW/H`) so ratios match `getBoundingClientRect()`.
 */ function cardImageCenterOriginPercent(b) {
    if ("TURBOPACK compile-time truthy", 1) return '50% 50%';
    //TURBOPACK unreachable
    ;
    const vw = undefined;
    const vh = undefined;
    const cx = undefined;
    const cy = undefined;
}
function ProductDetailClient({ initial }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const skipMotion = reduceMotion === true;
    /** Bounds for shared-element shell; state (not ref) so render stays valid for React Compiler / eslint. */ const [shellBounds, setShellBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const exitHandledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [shellFromListing, setShellFromListing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exiting, setExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const viewTrackedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (viewTrackedRef.current) return;
        viewTrackedRef.current = true;
        void fetch('/api/products/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slug: initial.slug,
                action: 'view'
            })
        });
    }, [
        initial.slug
    ]);
    /* Sync shared-element bounds from sessionStorage before first paint (cannot be derived during SSR render). */ /* eslint-disable react-hooks/set-state-in-effect -- intentional layout sync; deferring would flash wrong shell */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (skipMotion) {
            const stale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProductTransition"])();
            if (stale?.slug === initial.slug) (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProductTransition"])();
            setShellBounds(null);
            return;
        }
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readProductTransition"])();
        if (!data) {
            setShellFromListing(false);
            setShellBounds(null);
            return;
        }
        if (data.slug !== initial.slug) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProductTransition"])();
            setShellFromListing(false);
            setShellBounds(null);
            return;
        }
        setShellBounds(data);
        setShellFromListing(true);
    }, [
        initial.slug,
        skipMotion
    ]);
    /* eslint-enable react-hooks/set-state-in-effect */ const finishExitAndNavigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProductTransition"])();
        setShellBounds(null);
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.history.length > 1) //TURBOPACK unreachable
        ;
        else {
            router.push('/products');
        }
    }, [
        router
    ]);
    const handleBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!shellBounds || skipMotion || !shellFromListing) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProductTransition"])();
            if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.history.length > 1) //TURBOPACK unreachable
            ;
            else {
                router.push('/products');
            }
            return;
        }
        exitHandledRef.current = false;
        setExiting(true);
    }, [
        shellFromListing,
        skipMotion,
        router,
        shellBounds
    ]);
    const onShellAnimationComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!exiting) return;
        if (exitHandledRef.current) return;
        exitHandledRef.current = true;
        finishExitAndNavigate();
    }, [
        exiting,
        finishExitAndNavigate
    ]);
    const mainImage = initial.imageUrls[0] ?? null;
    const useShell = shellFromListing && shellBounds != null && !skipMotion;
    const b = shellBounds;
    const productsCrumb = useShell && !skipMotion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleBack,
        className: "hover:text-fg transition-colors text-sm text-fg-muted",
        children: "Products"
    }, void 0, false, {
        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
        lineNumber: 126,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "/products",
        className: "text-fg-muted hover:text-fg transition-colors",
        children: "Products"
    }, void 0, false, {
        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
        lineNumber: 134,
        columnNumber: 7
    }, this);
    const heroLayoutId = useShell || skipMotion ? undefined : `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRODUCT_HERO_LAYOUT_ID"]}${initial.slug}`;
    const mainInner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$navigation$2f$DetailBackButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                fallbackHref: "/products",
                onCustomNavigate: handleBack
            }, void 0, false, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "text-sm text-fg-muted mb-6",
                "aria-label": "Breadcrumb",
                children: [
                    productsCrumb,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2",
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-fg",
                        children: initial.productName
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].header, {
                className: "mb-10",
                initial: skipMotion ? false : useShell ? {
                    opacity: 0,
                    y: 10
                } : {
                    opacity: 0,
                    y: 14
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: skipMotion ? {
                    duration: 0
                } : useShell ? {
                    type: 'spring',
                    bounce: 0.06,
                    stiffness: 360,
                    damping: 34
                } : {
                    type: 'spring',
                    bounce: 0.1,
                    stiffness: 260,
                    damping: 32
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-white/10 text-emerald-900 dark:text-emerald-200 border border-emerald-400/30",
                                children: initial.category.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            initial.isFeatured ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-900 dark:text-amber-100 border border-amber-400/40",
                                children: "Featured"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold text-fg mb-4",
                        children: initial.productName
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-fg-muted max-w-3xl",
                        children: initial.shortDescription
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-fg-subtle",
                                children: [
                                    initial.authorName ? `By ${initial.authorName} · ` : null,
                                    initial.viewsCount,
                                    " views · ",
                                    initial.demoClickCount,
                                    " demo opens"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-fg-muted transition hover:bg-white/10",
                                onClick: ()=>{
                                    void fetch('/api/products/analytics', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            slug: initial.slug,
                                            action: 'share'
                                        })
                                    });
                                    const url = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
                                    if (navigator.share) {
                                        void navigator.share({
                                            title: initial.productName,
                                            text: initial.shortDescription,
                                            url
                                        }).catch(()=>{
                                            void navigator.clipboard.writeText(url);
                                        });
                                    } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                                    ;
                                },
                                children: "Share"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                layoutId: heroLayoutId,
                className: "mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl",
                initial: skipMotion ? false : useShell ? {
                    opacity: 0.55,
                    scale: 0.985,
                    filter: 'blur(3px)'
                } : {
                    opacity: 0,
                    scale: 0.94
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)'
                },
                transition: skipMotion ? {
                    duration: 0
                } : useShell ? {
                    delay: 0,
                    duration: 0.48,
                    ease: [
                        0.22,
                        0.62,
                        0.32,
                        1
                    ]
                } : {
                    type: 'spring',
                    bounce: 0.16,
                    duration: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: mainImage,
                    alt: "",
                    className: "w-full max-h-[min(70vh,560px)] object-cover transition duration-500 hover:scale-[1.02]",
                    loading: "eager"
                }, void 0, false, {
                    fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                    lineNumber: 225,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this) : null,
            initial.imageUrls.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-12",
                "aria-label": "Gallery",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-fg mb-4",
                        children: "Gallery"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                        children: initial.imageUrls.slice(1).map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group overflow-hidden rounded-2xl border border-white/10 bg-white/5 aspect-video",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: src,
                                    alt: "",
                                    className: "h-full w-full object-cover transition duration-500 group-hover:scale-105",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this)
                            }, `${src}-${i}`, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 239,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this) : null,
            initial.videoUrls.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-12",
                "aria-label": "Videos",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-fg mb-4",
                        children: "Videos"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: initial.videoUrls.map((url, i)=>{
                            const embed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$products$2f$videoEmbed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["youtubeEmbedFromUrl"])(url);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-video",
                                children: embed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    title: `Video ${i + 1}`,
                                    src: embed,
                                    className: "h-full w-full",
                                    loading: "lazy",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                    lineNumber: 265,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex h-full items-center justify-center text-emerald-700 dark:text-emerald-300 hover:underline p-6",
                                    children: "Open video"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                    lineNumber: 274,
                                    columnNumber: 21
                                }, this)
                            }, `${url}-${i}`, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 263,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this) : null,
            initial.embedDemoUrl || initial.demoLink || initial.landingPageLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "demo",
                className: "mb-12 scroll-mt-28 space-y-8",
                "aria-label": "Demo and links",
                children: [
                    initial.embedDemoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-2xl border border-emerald-400/20 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                            title: "Product demo",
                            src: initial.embedDemoUrl,
                            className: "h-[min(70vh,560px)] w-full bg-white",
                            loading: "lazy",
                            sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                            lineNumber: 289,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 288,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3",
                        children: [
                            initial.demoLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DemoButton, {
                                href: initial.demoLink,
                                label: "Open demo",
                                slug: initial.slug
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 300,
                                columnNumber: 15
                            }, this) : null,
                            initial.landingPageLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                id: "landing",
                                href: initial.landingPageLink,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/12 px-5 py-3 font-medium text-fg shadow-lg shadow-black/20 transition hover:border-white/45 hover:bg-white/20 scroll-mt-28",
                                children: "Landing page"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 303,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this) : null,
            initial.technologies.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-12",
                "aria-labelledby": "tech-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "tech-heading",
                        className: "text-xl font-semibold text-fg mb-4",
                        children: "Technologies used"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex flex-wrap gap-3",
                        children: initial.technologies.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "group relative inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 transition hover:border-emerald-400/40 hover:bg-white/10",
                                    title: t.description ?? t.name,
                                    children: [
                                        t.logo ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: t.logo,
                                            alt: "",
                                            className: "h-8 w-8 object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                            lineNumber: 331,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg",
                                            children: "⚙"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                            lineNumber: 333,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-fg-muted",
                                            children: t.name
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                            lineNumber: 335,
                                            columnNumber: 19
                                        }, this),
                                        t.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "public-popover-surface pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-white/10 px-3 py-2 text-xs text-fg-muted opacity-0 shadow-xl transition group-hover:opacity-100",
                                            children: t.description
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                            lineNumber: 337,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this)
                            }, t.id, false, {
                                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                                lineNumber: 324,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-8",
                "aria-labelledby": "overview-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "overview-heading",
                        className: "text-xl font-semibold text-fg mb-4",
                        children: "Overview"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "public-prose-rich max-w-none rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-fg-muted [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-(--text-primary) [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-(--text-primary) [&_h3]:text-xl [&_h3]:text-(--text-primary) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-(--link-color) [&_a]:underline [&_a]:hover:text-(--link-hover)",
                        dangerouslySetInnerHTML: {
                            __html: initial.fullDescriptionHtml
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            initial.related.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-t border-white/10 pt-12",
                "aria-labelledby": "related-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "related-heading",
                        className: "mb-6 text-2xl font-bold text-fg",
                        children: "Related products"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RelatedProductsRow, {
                        related: initial.related,
                        listLabelId: "related-heading",
                        onNavigate: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$products$2f$interactive$2f$productTransitionStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearProductTransition"])()
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 359,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
    if (useShell && b) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: `fixed overflow-x-hidden bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a] shadow-2xl will-change-transform ${exiting ? 'overflow-hidden' : 'overflow-y-auto'}`,
            style: {
                zIndex: 25
            },
            initial: {
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                borderRadius: 16,
                scale: 1,
                opacity: 1,
                transformOrigin: '50% 50%'
            },
            animate: exiting ? {
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                borderRadius: 16,
                scale: 0.82,
                opacity: 0.88,
                transformOrigin: '50% 50%'
            } : {
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                scale: 1,
                opacity: 1,
                transformOrigin: cardImageCenterOriginPercent(b)
            },
            transition: exiting ? SHELL_EXIT_SPRING : SHELL_ENTER_SPRING,
            onAnimationComplete: onShellAnimationComplete,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 py-8 pb-16 min-h-full",
                children: mainInner
            }, void 0, false, {
                fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
                lineNumber: 416,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
            lineNumber: 375,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8 pb-16",
        children: mainInner
    }, void 0, false, {
        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
        lineNumber: 421,
        columnNumber: 10
    }, this);
}
// --- DemoButton: external demo link + analytics ---
function DemoButton({ href, label, slug }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: ()=>{
            void fetch('/api/products/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slug,
                    action: 'click_demo'
                })
            });
        },
        className: "inline-flex items-center gap-2 rounded-xl border border-emerald-300/70 bg-emerald-400 px-5 py-3 font-medium text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:border-emerald-200 hover:bg-emerald-300",
        children: label
    }, void 0, false, {
        fileName: "[project]/frontend/components/products/ProductDetailClient.tsx",
        lineNumber: 428,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=frontend_2552950d._.js.map