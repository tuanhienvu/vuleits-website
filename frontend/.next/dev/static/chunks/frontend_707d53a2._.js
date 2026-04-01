(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/lib/news/newsCategories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NEWS_CATEGORIES",
    ()=>NEWS_CATEGORIES
]);
const NEWS_CATEGORIES = [
    'Politics',
    'Economy',
    'Technology',
    'Entertainment',
    'Science',
    'Sports',
    'Health',
    'Other'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/news/NewsCarouselRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsCarouselRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function NewsCarouselRow({ items, autoStartDelayMs = 0 }) {
    _s();
    const scrollerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canPrev, setCanPrev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canNext, setCanNext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showControls = items.length > 3;
    const hoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const updateControls = ()=>{
        const el = scrollerRef.current;
        if (!el) return;
        const left = el.scrollLeft;
        const right = left + el.clientWidth;
        setCanPrev(left > 1);
        setCanNext(right < el.scrollWidth - 1);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewsCarouselRow.useEffect": ()=>{
            const el = scrollerRef.current;
            if (!el) return;
            updateControls();
            const onScroll = {
                "NewsCarouselRow.useEffect.onScroll": ()=>updateControls()
            }["NewsCarouselRow.useEffect.onScroll"];
            const onResize = {
                "NewsCarouselRow.useEffect.onResize": ()=>updateControls()
            }["NewsCarouselRow.useEffect.onResize"];
            el.addEventListener('scroll', onScroll, {
                passive: true
            });
            window.addEventListener('resize', onResize);
            return ({
                "NewsCarouselRow.useEffect": ()=>{
                    el.removeEventListener('scroll', onScroll);
                    window.removeEventListener('resize', onResize);
                }
            })["NewsCarouselRow.useEffect"];
        }
    }["NewsCarouselRow.useEffect"], [
        items.length
    ]);
    const scrollByPage = (dir)=>{
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({
            left: dir * el.clientWidth,
            behavior: 'smooth'
        });
    };
    const cards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewsCarouselRow.useMemo[cards]": ()=>items
    }["NewsCarouselRow.useMemo[cards]"], [
        items
    ]);
    // Auto-advance the carousel when there are enough cards.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewsCarouselRow.useEffect": ()=>{
            if (!showControls) return;
            let intervalId = null;
            let timeoutId = null;
            timeoutId = window.setTimeout({
                "NewsCarouselRow.useEffect": ()=>{
                    intervalId = window.setInterval({
                        "NewsCarouselRow.useEffect": ()=>{
                            if (hoverRef.current) return;
                            const el = scrollerRef.current;
                            if (!el) return;
                            const left = el.scrollLeft;
                            const nextLeft = left + el.clientWidth;
                            const atEnd = nextLeft >= el.scrollWidth - el.clientWidth - 1;
                            if (atEnd) {
                                el.scrollTo({
                                    left: 0,
                                    behavior: 'smooth'
                                });
                                return;
                            }
                            el.scrollBy({
                                left: el.clientWidth,
                                behavior: 'smooth'
                            });
                        }
                    }["NewsCarouselRow.useEffect"], 4000);
                }
            }["NewsCarouselRow.useEffect"], Math.max(0, autoStartDelayMs));
            return ({
                "NewsCarouselRow.useEffect": ()=>{
                    if (timeoutId != null) window.clearTimeout(timeoutId);
                    if (intervalId != null) window.clearInterval(intervalId);
                }
            })["NewsCarouselRow.useEffect"];
        }
    }["NewsCarouselRow.useEffect"], [
        showControls,
        autoStartDelayMs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            showControls ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex absolute -top-11 right-0 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>scrollByPage(-1),
                        disabled: !canPrev,
                        className: "news-carousel-nav-btn px-3 py-1.5 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors",
                        "aria-label": "Previous articles",
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>scrollByPage(1),
                        disabled: !canNext,
                        className: "news-carousel-nav-btn px-3 py-1.5 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors",
                        "aria-label": "Next articles",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollerRef,
                className: [
                    /* Room for hover lift/scale + shadow; overflow-x scrollports clip vertically without padding */ 'flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 pb-8',
                    '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                ].join(' '),
                onMouseEnter: ()=>{
                    hoverRef.current = true;
                },
                onMouseLeave: ()=>{
                    hoverRef.current = false;
                },
                children: cards.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 snap-start basis-full md:basis-[calc((100%-32px)/3)] px-0.5 py-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsCardContent, {
                            article: a
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)
                    }, a.id, false, {
                        fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(NewsCarouselRow, "hDxnYFSjHfIr/vzDwDrTsVlRVZ8=");
_c = NewsCarouselRow;
function NewsCardContent({ article }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/news/${article.slug}`,
        className: "news-uiverse-card block glass p-6 rounded-2xl transition-all duration-300 h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsCardInner, {
            article: article
        }, void 0, false, {
            fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c1 = NewsCardContent;
function NewsCardInner({ article }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-24 rounded-lg overflow-hidden bg-(--pub-card-image-well-bg) mb-4",
                children: article.thumbnailSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: article.thumbnailSrc,
                    alt: article.thumbnailAlt ?? article.title,
                    fill: true,
                    className: "object-cover",
                    loading: "lazy",
                    unoptimized: /^https?:\/\//i.test(article.thumbnailSrc)
                }, void 0, false, {
                    fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full flex items-center justify-center text-3xl",
                    children: "📰"
                }, void 0, false, {
                    fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-fg font-semibold",
                children: article.title
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-fg-muted text-sm mt-2",
                children: article.description
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-fg-subtle text-xs mt-3",
                children: new Date(article.publishedAt).toLocaleDateString()
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-fg-subtle text-[11px] mt-1",
                children: article.authorName
            }, void 0, false, {
                fileName: "[project]/frontend/components/news/NewsCarouselRow.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c2 = NewsCardInner;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NewsCarouselRow");
__turbopack_context__.k.register(_c1, "NewsCardContent");
__turbopack_context__.k.register(_c2, "NewsCardInner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/pages/NewsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$news$2f$newsCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/news/newsCategories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$news$2f$NewsCarouselRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/news/NewsCarouselRow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function NewsPage() {
    _s();
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [fromDate, setFromDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [toDate, setToDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewsPage.useEffect": ()=>{
            let cancelled = false;
            ({
                "NewsPage.useEffect": async ()=>{
                    setLoading(true);
                    try {
                        const params = new URLSearchParams();
                        if (search.trim()) params.set('q', search.trim());
                        if (category.trim()) params.set('category', category.trim());
                        if (fromDate.trim()) params.set('from', fromDate.trim());
                        if (toDate.trim()) params.set('to', toDate.trim());
                        // Fetch enough rows so each category section can exceed 3 cards
                        // (required for the carousel + auto-slide).
                        params.set('limit', '100');
                        const res = await fetch(`/api/news?${params.toString()}`);
                        if (!res.ok) return;
                        const data = await res.json();
                        if (!cancelled) setArticles(Array.isArray(data.items) ? data.items : []);
                    } catch  {
                        if (!cancelled) setArticles([]);
                    } finally{
                        if (!cancelled) setLoading(false);
                    }
                }
            })["NewsPage.useEffect"]();
            return ({
                "NewsPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["NewsPage.useEffect"];
        }
    }["NewsPage.useEffect"], [
        search,
        category,
        fromDate,
        toDate
    ]);
    const byCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewsPage.useMemo[byCategory]": ()=>{
            const primary = [
                'Politics',
                'Economy',
                'Technology',
                'Entertainment'
            ];
            const primarySet = new Set(primary);
            const out = {
                Politics: [],
                Economy: [],
                Technology: [],
                Entertainment: [],
                Other: []
            };
            for (const a of articles){
                if (primarySet.has(a.category)) out[a.category]?.push(a);
                else out.Other.push(a);
            }
            return out;
        }
    }["NewsPage.useMemo[byCategory]"], [
        articles
    ]);
    const categories = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$news$2f$newsCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWS_CATEGORIES"].filter((c)=>c !== 'Other');
    const primaryCategories = [
        'Politics',
        'Economy',
        'Technology',
        'Entertainment'
    ];
    const categoryFilter = category.trim();
    const showAllCategories = !categoryFilter;
    const clearCategoryFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewsPage.useCallback[clearCategoryFilter]": ()=>{
            setCategory('');
        }
    }["NewsPage.useCallback[clearCategoryFilter]"], []);
    const mapToCarouselItems = (list)=>list.map((a)=>({
                id: a.id,
                slug: a.slug,
                title: a.title,
                description: a.description,
                authorName: a.authorName,
                publishedAt: a.publishedAt,
                thumbnailSrc: a.thumbnailSrc,
                thumbnailAlt: a.thumbnailAlt
            }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "glass p-8 md:p-12 rounded-3xl mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold text-fg mb-4",
                        children: "Latest News & Updates"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-fg-muted text-lg",
                        children: "Stay informed with our latest articles and announcements"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "glass p-6 rounded-2xl mb-8",
                "aria-labelledby": "news-search-heading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-fg-muted text-sm block mb-2",
                                    children: "Keyword"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search by keyword...",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    className: "w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2 md:contents",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center justify-between gap-1 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-fg-muted text-sm",
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this),
                                                categoryFilter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: clearCategoryFilter,
                                                    className: "text-[11px] text-red-400 hover:text-red-300 underline underline-offset-2 whitespace-nowrap",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: category,
                                            onChange: (e)=>setCategory(e.target.value),
                                            className: "w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg focus:outline-none focus:border-white/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "All"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this),
                                                categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: c,
                                                        children: c
                                                    }, c, false, {
                                                        fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-fg-muted text-sm block mb-2",
                                            children: "From"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: fromDate,
                                            onChange: (e)=>setFromDate(e.target.value),
                                            className: "w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-fg-muted text-sm block mb-2",
                                            children: "To"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: toDate,
                                            onChange: (e)=>setToDate(e.target.value),
                                            className: "w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-fg-muted mb-12",
                children: "Loading news..."
            }, void 0, false, {
                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this) : showAllCategories ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-10 mb-12",
                "aria-label": "Articles list",
                children: [
                    primaryCategories.map((cat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "news-category-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-fg mb-4",
                                    children: cat
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this),
                                byCategory[cat].length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$news$2f$NewsCarouselRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    autoStartDelayMs: idx * 750,
                                    items: mapToCarouselItems(byCategory[cat])
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass p-6 rounded-2xl text-fg-muted",
                                    children: "No articles found."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                    lineNumber: 173,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, `${cat}-row`, true, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-fg mb-4",
                                children: "Other"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            byCategory.Other.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$news$2f$NewsCarouselRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                autoStartDelayMs: primaryCategories.length * 750,
                                items: mapToCarouselItems(byCategory.Other)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-2xl text-fg-muted",
                                children: "No articles found."
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-10 mb-12",
                "aria-label": "Filtered articles",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "news-category-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-fg mb-4",
                            children: categoryFilter
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this),
                        articles.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$news$2f$NewsCarouselRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            autoStartDelayMs: 0,
                            items: mapToCarouselItems(articles)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass p-6 rounded-2xl text-fg-muted",
                            children: "No articles found."
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/pages/NewsPage.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/pages/NewsPage.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(NewsPage, "dulcOdd1HQqd+AR43/V5wfUy2kE=");
_c = NewsPage;
var _c;
__turbopack_context__.k.register(_c, "NewsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/pages/NewsPage.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/pages/NewsPage.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_707d53a2._.js.map