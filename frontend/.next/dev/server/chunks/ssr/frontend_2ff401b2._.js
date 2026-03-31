module.exports = [
"[project]/frontend/lib/safe-array.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Ensures we never call .map on undefined when API/DB shapes differ on hosting. */ __turbopack_context__.s([
    "safeArray",
    ()=>safeArray
]);
function safeArray(value) {
    return Array.isArray(value) ? value : [];
}
}),
"[project]/frontend/lib/publicHttpUrl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/frontend/lib/aboutIntroSetting.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/publicHttpUrl.ts [app-ssr] (ecmascript)");
;
const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';
function sanitizeHeroImageSrc(raw) {
    const s = raw.trim();
    if (!s) return null;
    if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) {
        if (/["'<>\s]/.test(s)) return null;
        return s;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$publicHttpUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitizePublicHttpUrl"])(s);
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
}),
"[project]/frontend/components/pages/HomePage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$safe$2d$array$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/safe-array.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useCompanyBranding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useCompanyBranding.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/aboutIntroSetting.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// --- Sections: Branding & features fetch | Hero | Features grid (see JSX markers) ---
function normalizeHomeFeatures(raw) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$safe$2d$array$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeArray"])(raw).map((item)=>{
        const f = item;
        return {
            icon: String(f.icon ?? ''),
            title: String(f.title ?? ''),
            description: String(f.description ?? '')
        };
    });
}
function HomePage({ setCurrentPage }) {
    const { t, locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const { companyName, slogan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useCompanyBranding$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanyBranding"])();
    const tagline = slogan || t('nav.tagline');
    const introHeroFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPublicIntro"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$aboutIntroSetting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultAboutIntroPayload"])(), locale), [
        locale
    ]);
    /** When `locale` matches, fields are from GET /api/about/intro; otherwise render uses `introHeroFallback` until the new fetch completes. */ const [heroFromApi, setHeroFromApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const heroImageUrl = heroFromApi && heroFromApi.locale === locale ? heroFromApi.url : introHeroFallback.heroImageUrl;
    const heroImageAlt = heroFromApi && heroFromApi.locale === locale ? heroFromApi.alt : introHeroFallback.heroImageAlt;
    const fallbackFeatures = [
        {
            icon: '✨',
            title: 'Modern Design',
            description: 'Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.'
        },
        {
            icon: '⚡',
            title: 'Fast Performance',
            description: 'Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices.'
        },
        {
            icon: '📱',
            title: 'Responsive',
            description: 'Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.'
        },
        {
            icon: '🎨',
            title: 'Interactive UI',
            description: 'Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.'
        },
        {
            icon: '🔒',
            title: 'Secure & Safe',
            description: 'Built with modern security standards and best practices to ensure your data and user privacy are protected.'
        },
        {
            icon: '🚀',
            title: 'Easy Integration',
            description: 'Simple to implement and customize for any project with clean, well-documented code and flexible components.'
        }
    ];
    const [features, setFeatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(fallbackFeatures);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch('/api/home/features');
                if (!res.ok) return;
                const data = await res.json();
                const normalized = normalizeHomeFeatures(data);
                if (!cancelled && normalized.length > 0) {
                    setFeatures(normalized);
                }
            } catch  {
            // keep fallback
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch(`/api/about/intro?locale=${encodeURIComponent(locale)}`);
                if (!res.ok) return;
                const j = await res.json();
                const url = j.heroImageUrl != null && String(j.heroImageUrl).trim() ? String(j.heroImageUrl).trim() : null;
                const alt = typeof j.heroImageAlt === 'string' ? j.heroImageAlt : '';
                if (!cancelled) setHeroFromApi({
                    locale,
                    url,
                    alt
                });
            } catch  {
            // keep derived fallback from `introHeroFallback` while `heroFromApi` is stale or null
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
                className: "glass p-8 md:p-12 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-5xl md:text-6xl font-bold text-fg mb-2 leading-tight font-zcool tracking-wide",
                                children: companyName
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl md:text-3xl text-(--brand-accent) mb-6 font-zcool tracking-wide",
                                children: tagline
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-fg-muted text-lg mb-6",
                                children: t('home.heroIntro')
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage('about'),
                                className: "public-cta-button",
                                children: "Learn More"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/pages/HomePage.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full md:flex-1 aspect-4/3 sm:aspect-video min-h-56 md:min-h-64 rounded-2xl overflow-hidden flex items-center justify-center bg-(--hero-media-bg) border border-(--hero-media-border)",
                        children: heroImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: heroImageUrl,
                            alt: heroImageAlt || (locale === 'vi-VN' ? 'Hình minh họa trang chủ' : 'Home page illustration'),
                            fill: true,
                            className: "object-cover",
                            sizes: "(max-width: 768px) 100vw, 50vw",
                            unoptimized: /^https?:\/\//i.test(heroImageUrl),
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/pages/HomePage.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl",
                            children: "🎨"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/pages/HomePage.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/pages/HomePage.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl mb-3",
                                    children: feature.icon
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-fg font-semibold text-xl mb-2",
                                    children: feature.title
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-fg-muted",
                                    // Allow embedded HTML/CSS/JS snippets pasted from the admin textarea.
                                    dangerouslySetInnerHTML: {
                                        __html: feature.description || ''
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/pages/HomePage.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/frontend/components/pages/HomePage.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/components/pages/HomePage.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/pages/HomePage.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/pages/HomePage.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/pages/HomePage.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/pages/HomePage.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=frontend_2ff401b2._.js.map