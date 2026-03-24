(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const menuGroups = [
        {
            id: 'product',
            label: t('admin.productGroup'),
            items: [
                {
                    id: 'services',
                    label: t('admin.services'),
                    icon: '🧩',
                    path: '/admin/dashboard?tab=services'
                },
                {
                    id: 'products',
                    label: t('admin.products'),
                    icon: '📦',
                    path: '/admin/dashboard?tab=products'
                }
            ]
        },
        {
            id: 'communication',
            label: t('admin.contents'),
            items: [
                {
                    id: 'news',
                    label: t('admin.news'),
                    icon: '📰',
                    path: '/admin/dashboard?tab=news'
                },
                {
                    id: 'media',
                    label: t('admin.media'),
                    icon: '🖼️',
                    path: '/admin/dashboard?tab=media'
                },
                {
                    id: 'banners',
                    label: t('admin.banners'),
                    icon: '🎬',
                    path: '/admin/dashboard?tab=banners'
                }
            ]
        },
        {
            id: 'settings',
            label: t('admin.settings'),
            items: [
                {
                    id: 'homeFeatures',
                    label: t('admin.homeFeatures'),
                    icon: '🏠',
                    path: '/admin/dashboard?tab=homeFeatures'
                },
                {
                    id: 'contacts',
                    label: t('admin.contacts'),
                    icon: '💬',
                    path: '/admin/dashboard?tab=contacts'
                },
                {
                    id: 'aboutTeam',
                    label: t('admin.aboutTeam'),
                    icon: '👤',
                    path: '/admin/dashboard?tab=aboutTeam'
                },
                {
                    id: 'aboutStats',
                    label: t('admin.aboutStats'),
                    icon: '📈',
                    path: '/admin/dashboard?tab=aboutStats'
                }
            ]
        },
        {
            id: 'permission',
            label: t('admin.permissionGroup'),
            items: [
                {
                    id: 'users',
                    label: t('admin.users'),
                    icon: '👥',
                    path: '/admin/dashboard?tab=users'
                },
                {
                    id: 'permissions',
                    label: t('admin.permissions'),
                    icon: '🔐',
                    path: '/admin/dashboard?tab=permissions'
                }
            ]
        }
    ];
    const handleNavigation = (path)=>{
        router.push(path);
        onMobileToggle();
    };
    // Get active tab from URL using useMemo
    const activeTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminSidebar.useMemo[activeTab]": ()=>{
            return searchParams.get('tab') || 'overview';
        }
    }["AdminSidebar.useMemo[activeTab]"], [
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} hidden lg:block`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 relative shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/Logo.jpg",
                                            alt: "VULE ITS Logo",
                                            fill: true,
                                            sizes: "40px",
                                            className: "object-contain rounded-full",
                                            priority: true
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-bold text-lg font-zcool truncate",
                                                children: "VULE ITS"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-xs font-zcool truncate",
                                                children: t('admin.panel')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex-1 overflow-y-auto p-4 space-y-2",
                            children: [
                                (()=>{
                                    const item = {
                                        id: 'overview',
                                        label: t('admin.overview'),
                                        icon: '📊',
                                        path: '/admin/dashboard?tab=overview'
                                    };
                                    const isActive = activeTab === item.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleNavigation(item.path),
                                        className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                        title: !isOpen ? item.label : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl shrink-0",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, this),
                                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium truncate",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 117,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this);
                                })(),
                                menuGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3",
                                        children: [
                                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 pb-1 text-xs uppercase tracking-wider text-white/50 font-medium",
                                                children: group.label
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: group.items.map((item)=>{
                                                    const isActive = activeTab === item.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleNavigation(item.path),
                                                        className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                                        title: !isOpen ? item.label : undefined,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl shrink-0",
                                                                children: item.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 25
                                                            }, this),
                                                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium truncate",
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 36
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, group.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-t border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onToggle,
                                className: "w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all",
                                title: isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        children: isOpen ? '◀' : '▶'
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: t('admin.collapse')
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 161,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-transform duration-300 w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 relative shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/Logo.jpg",
                                            alt: "VULE ITS Logo",
                                            fill: true,
                                            sizes: "40px",
                                            className: "object-contain rounded-full",
                                            priority: true
                                        }, void 0, false, {
                                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-bold text-lg font-zcool truncate",
                                                children: "VULE ITS"
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-xs font-zcool truncate",
                                                children: t('admin.panel')
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex-1 overflow-y-auto p-4 space-y-2",
                            children: [
                                (()=>{
                                    const item = {
                                        id: 'overview',
                                        label: t('admin.overview'),
                                        icon: '📊',
                                        path: '/admin/dashboard?tab=overview'
                                    };
                                    const isActive = activeTab === item.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleNavigation(item.path),
                                        className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl shrink-0",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 210,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this);
                                })(),
                                menuGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 pb-1 text-xs uppercase tracking-wider text-white/50 font-medium",
                                                children: group.label
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: group.items.map((item)=>{
                                                    const isActive = activeTab === item.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleNavigation(item.path),
                                                        className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border-b-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl shrink-0",
                                                                children: item.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                                lineNumber: 232,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, group.id, true, {
                                        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AdminSidebar, "Pes4/qsSmOKFFdPipY6EFTs8TeQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = AdminSidebar;
var _c;
__turbopack_context__.k.register(_c, "AdminSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocaleSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function LocaleSwitcher({ className }) {
    _s();
    const { locale, setLocale, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: locale,
        onChange: (e)=>setLocale(e.target.value),
        className: className ?? 'bg-white/20 border border-white/30 text-white px-2 py-1 rounded text-sm',
        "aria-label": "Language",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "en-US",
                className: "bg-gray-800 text-white",
                children: t('lang.english')
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "vi-VN",
                className: "bg-gray-800 text-white",
                children: t('lang.vietnamese')
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(LocaleSwitcher, "2rsPTuiNUmOzv71ev3zyLp3uIeQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = LocaleSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LocaleSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/LocaleSwitcher.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AdminHeader({ onMenuClick }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userEmail, setUserEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminHeader.useEffect": ()=>{
            // Fetch current user info
            const fetchUser = {
                "AdminHeader.useEffect.fetchUser": async ()=>{
                    try {
                        const res = await fetch('/api/admin/users', {
                            credentials: 'include'
                        });
                        if (res.ok) {
                            const data = await res.json();
                            if (data.user) {
                                setUserEmail(data.user.email || '');
                            }
                        }
                    } catch  {
                    // Ignore errors
                    }
                }
            }["AdminHeader.useEffect.fetchUser"];
            fetchUser();
        }
    }["AdminHeader.useEffect"], []);
    const handleLogout = async ()=>{
        try {
            const res = await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                router.push('/admin/login');
            }
        } catch  {
            router.push('/admin/login');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between px-4 lg:px-6 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onMenuClick,
                            className: "lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors",
                            "aria-label": t('nav.toggleMenu'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl lg:text-2xl font-bold text-white font-zcool",
                                    children: t('admin.dashboardTitle')
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-sm hidden sm:block font-zcool",
                                    children: t('admin.dashboardWelcome')
                                }, void 0, false, {
                                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "hidden sm:block bg-white/10 border border-white/30 text-white px-2 py-1.5 rounded-lg text-sm"
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        userEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm",
                                children: userEmail
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-red-200 rounded-lg transition-colors font-medium text-sm",
                            children: t('admin.logout')
                        }, void 0, false, {
                            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(AdminHeader, "sGyS5v4MniOEJ1HEqisUgIlrNJE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = AdminHeader;
var _c;
__turbopack_context__.k.register(_c, "AdminHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/src/components/admin/AdminHeader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AdminLayout({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isLoginPage = pathname === '/admin/login';
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Close mobile menu on window resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            const handleResize = {
                "AdminLayout.useEffect.handleResize": ()=>{
                    if (window.innerWidth >= 1024) {
                        setMobileMenuOpen(false);
                    }
                }
            }["AdminLayout.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "AdminLayout.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], []);
    // If login page, render without layout
    if (isLoginPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: sidebarOpen,
                    onToggle: ()=>setSidebarOpen(!sidebarOpen),
                    mobileOpen: mobileMenuOpen,
                    onMobileToggle: ()=>setMobileMenuOpen(!mobileMenuOpen)
                }, void 0, false, {
                    fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$src$2f$components$2f$admin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onMenuClick: ()=>setMobileMenuOpen(!mobileMenuOpen)
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "p-4 lg:p-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
                onClick: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebPortal/vuleits-website/src/app/admin/layout.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(AdminLayout, "96YOMWkQ4OqvVNAzRcneVz+6Zik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=WebPortal_vuleits-website_src_4f57301b._.js.map