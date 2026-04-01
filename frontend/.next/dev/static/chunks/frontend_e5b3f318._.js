(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/lib/safe-array.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Ensures we never call .map on undefined when API/DB shapes differ on hosting. */ __turbopack_context__.s([
    "safeArray",
    ()=>safeArray
]);
function safeArray(value) {
    return Array.isArray(value) ? value : [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/publicHttpUrl.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Returns href or null if not a safe public http(s) URL for use in href. */ __turbopack_context__.s([
    "sanitizePublicHttpUrl",
    ()=>sanitizePublicHttpUrl
]);
function sanitizePublicHttpUrl(raw) {
    const s = raw.trim();
    if (!s) return null;
    try {
        const u = new URL(s);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
        return u.href;
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/aboutIntroSetting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABOUT_INTRO_SETTING_KEY",
    ()=>ABOUT_INTRO_SETTING_KEY,
    "defaultAboutIntroPayload",
    ()=>defaultAboutIntroPayload,
    "parseAboutIntroJson",
    ()=>parseAboutIntroJson,
    "sanitizeHeroImageSrc",
    ()=>sanitizeHeroImageSrc,
    "serializeAboutIntroPayload",
    ()=>serializeAboutIntroPayload,
    "toPublicIntro",
    ()=>toPublicIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/publicHttpUrl.ts [app-client] (ecmascript)");
;
const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';
function sanitizeHeroImageSrc(raw) {
    const s = raw.trim();
    if (!s) return null;
    if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) {
        if (/["'<>\s]/.test(s)) return null;
        return s;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizePublicHttpUrl"])(s);
}
const DEFAULT = {
    titleEn: 'About Our Vision',
    titleVi: 'Tầm nhìn của chúng tôi',
    bodyEn: `We believe in creating digital experiences that feel natural and intuitive. Our glass morphism design philosophy combines transparency, depth, and subtle animations to create interfaces that users love to interact with.

Founded in 2024, our team of designers and developers are passionate about pushing the boundaries of web design while maintaining accessibility and performance standards.

Every project we undertake is crafted with attention to detail, ensuring that form follows function while never compromising on aesthetic beauty.`,
    bodyVi: `Chúng tôi tin vào việc tạo ra trải nghiệm số tự nhiên và trực quan. Triết lý thiết kế glass morphism kết hợp độ trong suốt, chiều sâu và chuyển động tinh tế để mang lại giao diện người dùng yêu thích.

Được thành lập năm 2024, đội ngũ thiết kế và lập trình của chúng tôi luôn nỗ lực mở rộng giới hạn của thiết kế web, đồng thời đảm bảo khả năng tiếp cận và hiệu năng.

Mỗi dự án đều được chăm chút từng chi tiết, đảm bảo hình thức đi đôi với chức năng mà không hy sinh vẻ đẹp thẩm mỹ.`,
    heroImageUrl: '',
    heroImageAltEn: '',
    heroImageAltVi: ''
};
function defaultAboutIntroPayload() {
    return {
        ...DEFAULT
    };
}
function splitParagraphs(text) {
    return text.split(/\n\s*\n/g).map((p)=>p.trim()).filter(Boolean);
}
/** True when the stored body is rich text (e.g. from TinyMCE) vs plain paragraphs. */ function introBodyLooksLikeHtml(raw) {
    const t = raw.trim();
    if (!t) return false;
    return /<[a-z][\s\S]*>/i.test(t);
}
function parseAboutIntroJson(raw) {
    const base = defaultAboutIntroPayload();
    if (!raw?.trim()) return base;
    try {
        const o = JSON.parse(raw);
        return {
            titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : base.titleEn,
            titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : base.titleVi,
            bodyEn: typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 20000) : base.bodyEn,
            bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000) : base.bodyVi,
            heroImageUrl: typeof o.heroImageUrl === 'string' ? o.heroImageUrl.slice(0, 2048) : base.heroImageUrl,
            heroImageAltEn: typeof o.heroImageAltEn === 'string' ? o.heroImageAltEn.slice(0, 200) : base.heroImageAltEn,
            heroImageAltVi: typeof o.heroImageAltVi === 'string' ? o.heroImageAltVi.slice(0, 200) : base.heroImageAltVi
        };
    } catch  {
        return base;
    }
}
function toPublicIntro(payload, locale) {
    const vi = locale === 'vi-VN';
    const title = (vi ? payload.titleVi : payload.titleEn).trim() || (vi ? DEFAULT.titleVi : DEFAULT.titleEn);
    const body = vi ? payload.bodyVi : payload.bodyEn;
    let bodyHtml = '';
    let paragraphs = [];
    if (introBodyLooksLikeHtml(body)) {
        bodyHtml = body.trim();
        if (!bodyHtml) {
            paragraphs = splitParagraphs(body.replace(/<[^>]+>/g, '\n'));
        }
    } else {
        paragraphs = splitParagraphs(body);
        if (paragraphs.length === 0) {
            paragraphs = splitParagraphs(vi ? DEFAULT.bodyVi : DEFAULT.bodyEn);
        }
    }
    const heroImageUrl = sanitizeHeroImageSrc(payload.heroImageUrl);
    const altRaw = (vi ? payload.heroImageAltVi : payload.heroImageAltEn).trim().slice(0, 200);
    const heroImageAlt = heroImageUrl ? altRaw || (vi ? 'Hình minh họa' : 'Illustration') : '';
    return {
        title,
        bodyHtml,
        paragraphs,
        heroImageUrl,
        heroImageAlt
    };
}
function serializeAboutIntroPayload(p) {
    return JSON.stringify({
        titleEn: p.titleEn.trim(),
        titleVi: p.titleVi.trim(),
        bodyEn: p.bodyEn.trim(),
        bodyVi: p.bodyVi.trim(),
        heroImageUrl: p.heroImageUrl.trim(),
        heroImageAltEn: p.heroImageAltEn.trim(),
        heroImageAltVi: p.heroImageAltVi.trim()
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/pages/AboutPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$safe$2d$array$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/safe-array.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/aboutIntroSetting.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function normalizeStats(raw) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$safe$2d$array$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeArray"])(raw).map((item)=>{
        const s = item;
        return {
            number: String(s.number ?? ''),
            label: String(s.label ?? '')
        };
    });
}
function normalizeTeam(raw) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$safe$2d$array$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeArray"])(raw).map((item)=>{
        const m = item;
        return {
            name: String(m.name ?? ''),
            role: String(m.role ?? ''),
            emoji: String(m.emoji ?? ''),
            bio: String(m.bio ?? '')
        };
    });
}
function AboutPage() {
    _s();
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const [intro, setIntro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const introFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPublicIntro"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAboutIntroPayload"])(), locale);
    const [activeTeamCard, setActiveTeamCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function parseIntroJson(j) {
        const title = typeof j.title === 'string' ? j.title : '';
        const bodyHtml = typeof j.bodyHtml === 'string' ? j.bodyHtml : '';
        const paragraphs = Array.isArray(j.paragraphs) ? j.paragraphs.map((x)=>String(x ?? '').trim()).filter(Boolean) : [];
        const heroImageUrl = j.heroImageUrl != null && String(j.heroImageUrl).trim() ? String(j.heroImageUrl).trim() : null;
        const heroImageAlt = typeof j.heroImageAlt === 'string' ? j.heroImageAlt : '';
        return {
            title,
            bodyHtml,
            paragraphs,
            heroImageUrl,
            heroImageAlt
        };
    }
    const fallbackStats = [
        {
            number: '150+',
            label: 'Projects Completed'
        },
        {
            number: '50+',
            label: 'Happy Clients'
        },
        {
            number: '3',
            label: 'Years Experience'
        },
        {
            number: '24/7',
            label: 'Support Available'
        }
    ];
    const fallbackTeam = [
        {
            name: 'John Anderson',
            role: 'CEO & Founder',
            emoji: '👨‍💼',
            bio: 'Visionary leader with 15+ years in digital innovation, driving our mission to create exceptional user experiences.'
        },
        {
            name: 'Sarah Chen',
            role: 'Creative Director',
            emoji: '👩‍🎨',
            bio: 'Award-winning designer specializing in modern UI/UX, bringing artistic vision to every project.'
        },
        {
            name: 'Michael Torres',
            role: 'Lead Developer',
            emoji: '👨‍💻',
            bio: 'Full-stack expert passionate about clean code and innovative web technologies.'
        },
        {
            name: 'Emma Wilson',
            role: 'Senior Developer',
            emoji: '👩‍💻',
            bio: 'Frontend specialist with expertise in React and modern JavaScript frameworks.'
        },
        {
            name: 'David Kim',
            role: 'UX Designer',
            emoji: '👨‍🎨',
            bio: 'User experience expert focused on creating intuitive and accessible digital products.'
        },
        {
            name: 'Lisa Martinez',
            role: 'Project Manager',
            emoji: '👩‍💼',
            bio: 'Certified PMP with a track record of delivering complex projects on time and budget.'
        }
    ];
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(fallbackStats);
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(fallbackTeam);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AboutPage.useEffect": ()=>{
            let cancelled = false;
            ({
                "AboutPage.useEffect": async ()=>{
                    try {
                        const [statsRes, teamRes, introRes] = await Promise.all([
                            fetch('/api/about/stats'),
                            fetch('/api/about/team'),
                            fetch(`/api/about/intro?locale=${encodeURIComponent(locale)}`)
                        ]);
                        if (!cancelled) {
                            if (statsRes.ok) {
                                const s = await statsRes.json();
                                const ns = normalizeStats(s);
                                if (ns.length > 0) setStats(ns);
                            }
                            if (teamRes.ok) {
                                const t = await teamRes.json();
                                const nt = normalizeTeam(t);
                                if (nt.length > 0) setTeam(nt);
                            }
                            if (introRes.ok) {
                                const j = await introRes.json();
                                setIntro(parseIntroJson(j));
                            }
                        }
                    } catch  {
                    // keep fallback
                    }
                }
            })["AboutPage.useEffect"]();
            return ({
                "AboutPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["AboutPage.useEffect"];
        }
    }["AboutPage.useEffect"], [
        locale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-8 md:p-12 rounded-3xl mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold text-fg mb-6",
                                children: intro?.title || introFallback.title
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            (()=>{
                                const heroUrl = intro?.heroImageUrl ?? introFallback.heroImageUrl;
                                const heroAlt = intro?.heroImageAlt ?? introFallback.heroImageAlt;
                                if (!heroUrl) return null;
                                const remote = /^https?:/i.test(heroUrl);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full max-w-3xl mx-auto aspect-video max-h-80 mb-6 rounded-2xl overflow-hidden border border-white/15 bg-white/5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: heroUrl,
                                        alt: heroAlt || (locale === 'vi-VN' ? 'Hình minh họa' : 'Illustration'),
                                        fill: true,
                                        className: "object-cover",
                                        sizes: "(max-width: 768px) 100vw, 42rem",
                                        unoptimized: remote
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this);
                            })(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-fg-muted text-lg",
                                children: (()=>{
                                    const html = (intro?.bodyHtml ?? introFallback.bodyHtml)?.trim() ?? '';
                                    if (html) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "about-intro-rich max-w-none [&_a]:text-[color:var(--link-color)] [&_a]:underline [&_a]:hover:text-[color:var(--link-hover)] [&_blockquote]:border-l-2 [&_blockquote]:border-white/25 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[color:var(--text-primary)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[color:var(--text-primary)] [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[color:var(--text-primary)] [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:text-[color:var(--text-muted)] [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6",
                                            dangerouslySetInnerHTML: {
                                                __html: html
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, this);
                                    }
                                    const paras = intro?.paragraphs?.length ? intro.paragraphs : introFallback.paragraphs;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: paras.map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "whitespace-pre-line",
                                                children: text
                                            }, i, false, {
                                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this);
                                })()
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12",
                        children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-2xl text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl md:text-4xl font-bold text-fg mb-2",
                                        children: stat.number
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-fg-muted",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-4xl font-bold text-fg mb-8",
                        children: "Meet Our Team"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: team.map((member, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group perspective-distant min-h-[260px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    role: "button",
                                    tabIndex: 0,
                                    "aria-label": `${member.name} details`,
                                    "aria-pressed": activeTeamCard === index,
                                    className: `relative h-full min-h-[260px] transform-3d transition-transform duration-900 group-hover:transform-[rotateY(180deg)] ${activeTeamCard === index ? 'transform-[rotateY(180deg)]' : ''}`,
                                    onClick: ()=>setActiveTeamCard((prev)=>prev === index ? null : index),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setActiveTeamCard((prev)=>prev === index ? null : index);
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "glass absolute inset-0 rounded-2xl p-6 text-center backface-hidden transform-[rotateY(0deg)]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full flex flex-col items-center justify-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-6xl mb-5",
                                                        children: member.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-fg font-semibold text-2xl",
                                                        children: member.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                lineNumber: 195,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "glass absolute inset-0 rounded-2xl p-6 text-center backface-hidden transform-[rotateY(180deg)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-3",
                                                    children: member.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-fg font-semibold text-xl mb-1",
                                                    children: member.name
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-(--brand-accent) text-sm mb-3",
                                                    children: member.role
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-fg-muted text-sm mb-4",
                                                    children: member.bio
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-3 justify-center text-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": true,
                                                            children: "📧"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": true,
                                                            children: "💼"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": true,
                                                            children: "🎨"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this)
                            }, index, false, {
                                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/AboutPage.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/pages/AboutPage.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(AboutPage, "Ctzb8X3reWL+LD760jsnC5C0KIs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = AboutPage;
var _c;
__turbopack_context__.k.register(_c, "AboutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/pages/AboutPage.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/pages/AboutPage.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_e5b3f318._.js.map