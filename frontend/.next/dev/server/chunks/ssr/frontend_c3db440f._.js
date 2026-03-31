module.exports = [
"[project]/frontend/lib/locale/uiMessagesExcel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UI_MESSAGES_EXCEL_HEADERS",
    ()=>UI_MESSAGES_EXCEL_HEADERS,
    "buildSaveEntries",
    ()=>buildSaveEntries,
    "draftToAoA",
    ()=>draftToAoA,
    "mergeDraftWithPatch",
    ()=>mergeDraftWithPatch,
    "parseTranslationSheet",
    ()=>parseTranslationSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/locale/defaultMessages.ts [app-ssr] (ecmascript)");
;
const UI_MESSAGES_EXCEL_HEADERS = [
    'key',
    'en-US',
    'vi-VN'
];
const MAX_IMPORT_ROWS = 4000;
function normHeaderCell(raw) {
    return String(raw ?? '').trim().toLowerCase().replace(/\u00a0/g, ' ').replace(/\s+/g, ' ');
}
function findColumnIndex(headers, predicate) {
    for(let i = 0; i < headers.length; i++){
        const n = normHeaderCell(headers[i]);
        if (n && predicate(n)) return i;
    }
    return -1;
}
function isKeyHeader(n) {
    return n === 'key' || n === 'message key' || n === 'message_key' || n === 'messagekey';
}
function isEnHeader(n) {
    return n === 'en-us' || n === 'en_us' || n === 'english' || n === 'english (us)';
}
function isViHeader(n) {
    return n === 'vi-vn' || n === 'vi_vn' || n === 'vietnamese' || n === 'vietnamese (vn)';
}
function cellToString(v) {
    if (v === undefined || v === null) return '';
    if (typeof v === 'number' && Number.isFinite(v)) return String(v);
    return String(v);
}
function draftToAoA(draft, keys) {
    const rows = [
        [
            ...UI_MESSAGES_EXCEL_HEADERS
        ]
    ];
    for (const key of keys){
        rows.push([
            key,
            draft[key]?.['en-US'] ?? '',
            draft[key]?.['vi-VN'] ?? ''
        ]);
    }
    return rows;
}
function parseTranslationSheet(aoa, validKeys) {
    const unknownKeys = [];
    const patch = {};
    if (!aoa.length) return {
        patch,
        unknownKeys,
        appliedRows: 0
    };
    const headerRow = aoa[0] ?? [];
    const ik = findColumnIndex(headerRow, isKeyHeader);
    const ien = findColumnIndex(headerRow, isEnHeader);
    const ivi = findColumnIndex(headerRow, isViHeader);
    if (ik < 0 || ien < 0 || ivi < 0) {
        return {
            patch,
            unknownKeys,
            appliedRows: 0
        };
    }
    let appliedRows = 0;
    for(let r = 1; r < aoa.length && appliedRows < MAX_IMPORT_ROWS; r++){
        const row = aoa[r];
        if (!Array.isArray(row)) continue;
        const key = cellToString(row[ik]).trim();
        if (!key) continue;
        if (!validKeys.has(key)) {
            unknownKeys.push(key);
            continue;
        }
        const en = cellToString(row[ien]);
        const vi = cellToString(row[ivi]);
        patch[key] = {
            'en-US': en,
            'vi-VN': vi
        };
        appliedRows++;
    }
    return {
        patch,
        unknownKeys,
        appliedRows
    };
}
function mergeDraftWithPatch(prev, patch) {
    const next = {
        ...prev
    };
    for (const [key, locs] of Object.entries(patch)){
        if (!locs) continue;
        const base = {
            'en-US': prev[key]?.['en-US'] ?? '',
            'vi-VN': prev[key]?.['vi-VN'] ?? ''
        };
        for (const loc of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_LOCALES"]){
            if (Object.prototype.hasOwnProperty.call(locs, loc)) {
                base[loc] = locs[loc] ?? '';
            }
        }
        next[key] = base;
    }
    return next;
}
function buildSaveEntries(draft, keys) {
    const entries = [];
    for (const key of keys){
        for (const loc of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_LOCALES"]){
            const current = (draft[key]?.[loc] ?? '').trim();
            const def = (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"][loc][key] ?? '').trim();
            if (current === def) {
                entries.push({
                    locale: loc,
                    key,
                    value: ''
                });
            } else {
                entries.push({
                    locale: loc,
                    key,
                    value: draft[key]?.[loc] ?? ''
                });
            }
        }
    }
    return entries;
}
}),
"[project]/frontend/components/admin/TranslationsAdminPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TranslationsAdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/ToastProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/admin/AdminPermissionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/locale/defaultMessages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/locale/uiMessagesExcel.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const SAVE_CHUNK = 100;
async function putEntriesChunked(entries, chunkSize) {
    for(let i = 0; i < entries.length; i += chunkSize){
        const chunk = entries.slice(i, i + chunkSize);
        const res = await fetch('/api/admin/ui-messages', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entries: chunk
            })
        });
        if (!res.ok) throw new Error('save');
    }
}
function textareaRowsForKey(key) {
    if (key.includes('heroIntro') || key.includes('Body') || key.includes('Hint') || key.includes('Subtitle')) return 4;
    return 2;
}
function keySection(key) {
    const i = key.indexOf('.');
    return i === -1 ? key : key.slice(0, i);
}
function isKeyCustomized(draft, key) {
    for (const loc of [
        'en-US',
        'vi-VN'
    ]){
        const cur = (draft[key]?.[loc] ?? '').trim();
        const def = (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"][loc][key] ?? '').trim();
        if (cur !== def) return true;
    }
    return false;
}
const PAGE_SIZE_OPTIONS = [
    10,
    25,
    50,
    100
];
function TranslationsAdminPanel() {
    const { t, refreshUiMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { can } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$admin$2f$AdminPermissionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminPermissions"])();
    const canSave = can('uiTexts', 'update');
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [sectionFilter, setSectionFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(25);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('table');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const importTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const validKeySet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Set(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]), []);
    const sectionOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = new Map();
        for (const k of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]){
            const s = keySection(k);
            counts.set(s, (counts.get(s) ?? 0) + 1);
        }
        const sections = Array.from(counts.keys()).sort((a, b)=>a.localeCompare(b));
        return {
            counts,
            sections
        };
    }, []);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        try {
            const res = await fetch('/api/admin/ui-messages', {
                credentials: 'include'
            });
            if (res.status === 401 || res.status === 403) {
                window.location.href = '/admin/login';
                return;
            }
            if (!res.ok) throw new Error('load');
            const data = await res.json();
            const next = {};
            for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]){
                next[key] = {
                    'en-US': data['en-US']?.[key] ?? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"]['en-US'][key] ?? '',
                    'vi-VN': data['vi-VN']?.[key] ?? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"]['vi-VN'][key] ?? ''
                };
            }
            setDraft(next);
        } catch  {
            toast.error(t('admin.uiMessagesLoadError'));
        } finally{
            setLoading(false);
        }
    }, [
        toast,
        t
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void load();
    }, [
        load
    ]);
    const filteredKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let keys = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"];
        if (sectionFilter) {
            keys = keys.filter((k)=>keySection(k) === sectionFilter);
        }
        if (statusFilter === 'custom') {
            keys = keys.filter((k)=>isKeyCustomized(draft, k));
        } else if (statusFilter === 'default') {
            keys = keys.filter((k)=>!isKeyCustomized(draft, k));
        }
        const qq = q.trim().toLowerCase();
        if (qq) {
            keys = keys.filter((k)=>{
                const row = draft[k];
                const en = (row?.['en-US'] ?? '').toLowerCase();
                const vi = (row?.['vi-VN'] ?? '').toLowerCase();
                return k.toLowerCase().includes(qq) || en.includes(qq) || vi.includes(qq);
            });
        }
        return keys;
    }, [
        q,
        draft,
        sectionFilter,
        statusFilter
    ]);
    const pageCount = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(filteredKeys.length / pageSize));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPage((p)=>Math.min(p, pageCount));
    }, [
        pageCount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPage(1);
    }, [
        q,
        sectionFilter,
        statusFilter,
        pageSize
    ]);
    const { displayedKeys, rangeFrom, rangeTo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const total = filteredKeys.length;
        if (total === 0) {
            return {
                displayedKeys: [],
                rangeFrom: 0,
                rangeTo: 0
            };
        }
        if (pageSize === 'all') {
            return {
                displayedKeys: filteredKeys,
                rangeFrom: 1,
                rangeTo: total
            };
        }
        const start = (page - 1) * pageSize;
        const slice = filteredKeys.slice(start, start + pageSize);
        return {
            displayedKeys: slice,
            rangeFrom: start + 1,
            rangeTo: start + slice.length
        };
    }, [
        filteredKeys,
        page,
        pageSize
    ]);
    const hasActiveFilters = Boolean(q.trim() || sectionFilter || statusFilter !== 'all' || pageSize !== 25);
    const setCell = (key, locale, value)=>{
        setDraft((prev)=>({
                ...prev,
                [key]: {
                    ...prev[key],
                    [locale]: value
                }
            }));
    };
    const save = async ()=>{
        if (!canSave) {
            toast.error(t('admin.uiMessagesNeedUpdate'));
            return;
        }
        setSaving(true);
        try {
            const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSaveEntries"])(draft, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]);
            await putEntriesChunked(entries, SAVE_CHUNK);
            toast.success(t('admin.uiMessagesSaveDone'));
            await refreshUiMessages();
            await load();
        } catch  {
            toast.error(t('admin.uiMessagesSaveError'));
        } finally{
            setSaving(false);
        }
    };
    const exportExcel = async ()=>{
        try {
            const XLSX = await __turbopack_context__.A("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript, async loader)");
            const aoa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["draftToAoA"])(draft, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]);
            const ws = XLSX.utils.aoa_to_sheet(aoa);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'UI_Translations');
            const when = new Date().toISOString().slice(0, 10);
            XLSX.writeFile(wb, `ui-translations-backup-${when}.xlsx`);
            toast.success(t('admin.uiMessagesExportDone'));
        } catch  {
            toast.error(t('admin.uiMessagesSaveError'));
        }
    };
    const runImportFromFile = async (file, target)=>{
        try {
            const XLSX = await __turbopack_context__.A("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript, async loader)");
            const buf = await file.arrayBuffer();
            const wb = XLSX.read(buf, {
                type: 'array'
            });
            const name = wb.SheetNames[0];
            if (!name) {
                toast.error(t('admin.uiMessagesImportBadLayout'));
                return;
            }
            const sheet = wb.Sheets[name];
            if (!sheet) {
                toast.error(t('admin.uiMessagesImportBadLayout'));
                return;
            }
            const aoa = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                defval: ''
            });
            const { patch, unknownKeys, appliedRows } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseTranslationSheet"])(aoa, validKeySet);
            if (appliedRows === 0) {
                if (unknownKeys.length > 0) {
                    toast.error(t('admin.uiMessagesImportNoRows'));
                    toast.info(t('admin.uiMessagesImportSkippedUnknown', {
                        count: String(unknownKeys.length)
                    }));
                } else {
                    toast.error(t('admin.uiMessagesImportBadLayout'));
                }
                return;
            }
            const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeDraftWithPatch"])(draft, patch);
            setDraft(merged);
            if (unknownKeys.length > 0) {
                toast.info(t('admin.uiMessagesImportSkippedUnknown', {
                    count: String(unknownKeys.length)
                }));
            }
            if (target === 'editor') {
                toast.success(t('admin.uiMessagesImportEditorDone'));
                return;
            }
            if (!canSave) {
                toast.error(t('admin.uiMessagesNeedUpdate'));
                return;
            }
            setSaving(true);
            try {
                const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$uiMessagesExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSaveEntries"])(merged, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"]);
                await putEntriesChunked(entries, SAVE_CHUNK);
                toast.success(t('admin.uiMessagesImportServerDone'));
                await refreshUiMessages();
                await load();
            } catch  {
                toast.error(t('admin.uiMessagesSaveError'));
            } finally{
                setSaving(false);
            }
        } catch  {
            toast.error(t('admin.uiMessagesImportBadLayout'));
        }
    };
    const onFileChange = (e)=>{
        const file = e.target.files?.[0];
        e.target.value = '';
        const target = importTargetRef.current;
        importTargetRef.current = null;
        if (!file || !target) return;
        void runImportFromFile(file, target);
    };
    const pickImport = (target)=>{
        if (target === 'server' && !canSave) {
            toast.error(t('admin.uiMessagesNeedUpdate'));
            return;
        }
        importTargetRef.current = target;
        fileRef.current?.click();
    };
    if (loading && Object.keys(draft).length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass p-8 rounded-2xl text-white/70",
            role: "status",
            children: t('admin.profileLoading')
        }, void 0, false, {
            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
            lineNumber: 300,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileRef,
                type: "file",
                accept: ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
                className: "hidden",
                "aria-hidden": true,
                onChange: onFileChange
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-white tracking-tight",
                    children: t('admin.uiMessages')
                }, void 0, false, {
                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                    lineNumber: 318,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-5 gap-2 xl:col-span-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex rounded-lg border border-white/15 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `px-3 py-1.5 text-xs sm:text-sm w-full ${view === 'table' ? 'bg-cyan-500/25 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`,
                                    onClick: ()=>setView('table'),
                                    children: t('admin.uiMessagesViewTable')
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `px-3 py-1.5 text-xs sm:text-sm w-full ${view === 'cards' ? 'bg-cyan-500/25 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`,
                                    onClick: ()=>setView('cards'),
                                    children: t('admin.uiMessagesViewCards')
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "btn-admin-secondary text-sm py-2 px-3 w-full",
                            onClick: ()=>void exportExcel(),
                            children: t('admin.uiMessagesExportExcel')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "btn-admin-secondary text-sm py-2 px-3 w-full",
                            onClick: ()=>pickImport('editor'),
                            children: t('admin.uiMessagesImportLoad')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "btn-admin-primary text-sm py-2 px-3 w-full disabled:opacity-50 bg-(--brand-accent) border-(--brand-accent) hover:bg-[color-mix(in_srgb,var(--brand-accent)_88%,#ffffff)]",
                            disabled: !canSave,
                            onClick: ()=>pickImport('server'),
                            children: t('admin.uiMessagesImportSave')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this),
                        canSave ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "btn-admin-primary text-sm py-2 px-3 w-full disabled:opacity-50 bg-(--brand-accent) border-(--brand-accent) hover:bg-[color-mix(in_srgb,var(--brand-accent)_88%,#ffffff)]",
                            onClick: ()=>void save(),
                            disabled: saving,
                            children: saving ? t('admin.saving') : t('admin.uiMessagesSave')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl border border-white/10 p-3 sm:p-4 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-3 items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-1 text-sm text-white/80 xl:col-span-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/55",
                                        children: t('admin.uiMessagesSearch')
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 369,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: q,
                                        onChange: (e)=>setQ(e.target.value),
                                        placeholder: t('admin.uiMessagesSearch'),
                                        className: "px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm w-full",
                                        "aria-label": "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 370,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-1 text-sm text-white/80 xl:col-span-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-end justify-between gap-2 text-xs text-white/55 min-h-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t('admin.uiMessagesFilterSection')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 380,
                                                columnNumber: 15
                                            }, this),
                                            hasActiveFilters ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "text-red-400 hover:text-red-300 underline underline-offset-2",
                                                onClick: ()=>{
                                                    setQ('');
                                                    setSectionFilter('');
                                                    setStatusFilter('all');
                                                    setPageSize(25);
                                                    setPage(1);
                                                },
                                                children: t('admin.uiMessagesClearFilters')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sectionFilter,
                                        onChange: (e)=>setSectionFilter(e.target.value),
                                        className: "px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: [
                                                    t('admin.uiMessagesFilterSectionAll'),
                                                    " (",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"].length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 402,
                                                columnNumber: 15
                                            }, this),
                                            sectionOptions.sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: s,
                                                    children: [
                                                        s,
                                                        " (",
                                                        sectionOptions.counts.get(s) ?? 0,
                                                        ")"
                                                    ]
                                                }, s, true, {
                                                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-1 text-sm text-white/80 xl:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/55",
                                        children: t('admin.uiMessagesFilterStatus')
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: statusFilter,
                                        onChange: (e)=>setStatusFilter(e.target.value),
                                        className: "px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: t('admin.uiMessagesFilterStatusAll')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 419,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "custom",
                                                children: t('admin.uiMessagesFilterStatusCustom')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 420,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "default",
                                                children: t('admin.uiMessagesFilterStatusDefault')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-1 text-sm text-white/80 xl:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/55",
                                        children: t('admin.uiMessagesRowsPerPage')
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: pageSize === 'all' ? 'all' : String(pageSize),
                                        onChange: (e)=>{
                                            const v = e.target.value;
                                            setPageSize(v === 'all' ? 'all' : Number(v));
                                        },
                                        className: "px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm",
                                        children: [
                                            PAGE_SIZE_OPTIONS.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: String(n),
                                                    children: n
                                                }, n, false, {
                                                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: t('admin.uiMessagesRowsAll')
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 426,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/50 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    t('admin.uiMessagesShowing', {
                                        from: String(rangeFrom),
                                        to: String(rangeTo),
                                        total: String(filteredKeys.length)
                                    }),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/35",
                                        children: [
                                            "· ",
                                            filteredKeys.length,
                                            " / ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUiMessageKeys"].length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 450,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this),
                            pageSize !== 'all' && pageCount > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-admin-secondary text-xs py-1.5 px-2.5 disabled:opacity-40",
                                        disabled: page <= 1,
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        children: t('admin.uiMessagesPrev')
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/60 tabular-nums",
                                        children: [
                                            page,
                                            " / ",
                                            pageCount
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 462,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-admin-secondary text-xs py-1.5 px-2.5 disabled:opacity-40",
                                        disabled: page >= pageCount,
                                        onClick: ()=>setPage((p)=>Math.min(pageCount, p + 1)),
                                        children: t('admin.uiMessagesNext')
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                        lineNumber: 443,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            displayedKeys.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl border border-white/10 p-8 text-center text-white/65 text-sm",
                children: t('admin.uiMessagesNoMatches')
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 479,
                columnNumber: 9
            }, this) : view === 'table' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-xl border border-white/10 max-h-[min(70vh,780px)] overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-left text-xs sm:text-sm text-white/90 min-w-[720px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "text-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-2 py-2 w-[22%] sticky left-0 bg-slate-900/95 z-20 border-r border-white/10",
                                        children: "key"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 485,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-2 py-2",
                                        children: "en-US"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 486,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-2 py-2",
                                        children: "vi-VN"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 487,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 484,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 483,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: displayedKeys.map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t border-white/10 align-top hover:bg-white/3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-2 py-2 font-mono text-[10px] sm:text-xs text-emerald-200/90 break-all sticky left-0 bg-black/50 border-r border-white/10",
                                            children: key
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                            lineNumber: 493,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-2 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft[key]?.['en-US'] ?? '',
                                                onChange: (e)=>setCell(key, 'en-US', e.target.value),
                                                disabled: !canSave,
                                                rows: textareaRowsForKey(key),
                                                className: "w-full min-w-[200px] px-2 py-1.5 rounded-lg bg-black/30 border border-white/15 text-white text-xs sm:text-sm disabled:opacity-60"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 497,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-2 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft[key]?.['vi-VN'] ?? '',
                                                onChange: (e)=>setCell(key, 'vi-VN', e.target.value),
                                                disabled: !canSave,
                                                rows: textareaRowsForKey(key),
                                                className: "w-full min-w-[200px] px-2 py-1.5 rounded-lg bg-black/30 border border-white/15 text-white text-xs sm:text-sm disabled:opacity-60"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 506,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                            lineNumber: 505,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                    lineNumber: 492,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                            lineNumber: 490,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                    lineNumber: 482,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 481,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-h-[min(70vh,720px)] overflow-y-auto pr-1",
                children: displayedKeys.map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl border border-white/10 p-4 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-emerald-200/90 break-all",
                                children: key
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 523,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white/50",
                                                children: "en-US"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 526,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft[key]?.['en-US'] ?? '',
                                                onChange: (e)=>setCell(key, 'en-US', e.target.value),
                                                disabled: !canSave,
                                                rows: textareaRowsForKey(key),
                                                className: "w-full px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-white text-sm min-h-10 disabled:opacity-60"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 527,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 525,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white/50",
                                                children: "vi-VN"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 536,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft[key]?.['vi-VN'] ?? '',
                                                onChange: (e)=>setCell(key, 'vi-VN', e.target.value),
                                                disabled: !canSave,
                                                rows: textareaRowsForKey(key),
                                                className: "w-full px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-white text-sm min-h-10 disabled:opacity-60"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                                lineNumber: 537,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                        lineNumber: 535,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                                lineNumber: 524,
                                columnNumber: 15
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                        lineNumber: 522,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
                lineNumber: 520,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/admin/TranslationsAdminPanel.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/admin/TranslationsAdminPanel.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/admin/TranslationsAdminPanel.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=frontend_c3db440f._.js.map