module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const messagesByLocale = {
    'en-US': {
        'lang.english': 'English (US)',
        'lang.vietnamese': 'Vietnamese',
        'lang.switchLanguage': 'Switch language',
        'lang.toggleToVietnamese': 'Switch to Vietnamese',
        'lang.toggleToEnglish': 'Switch to English',
        // Public nav
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.products': 'Products',
        'nav.news': 'News',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.admin': 'Login',
        'nav.tagline': 'Bring Your Success',
        'nav.toggleMenu': 'Toggle menu',
        // Public home
        'home.heroIntro': 'With the motto "High efficiency, low cost, and sustainable development," we are striving every day to prove ourselves and maintain the trust and confidence of our customers.',
        // Admin common
        'admin.panel': 'Admin Panel',
        'admin.overview': 'Overview',
        'admin.users': 'Users',
        'admin.permissions': 'Permissions',
        'admin.productGroup': 'Products',
        'admin.contents': 'Contents',
        'admin.settings': 'Settings',
        'admin.permissionGroup': 'Authority',
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
        'admin.expand': 'Expand',
        'admin.expandSidebar': 'Expand sidebar',
        'admin.collapseSidebar': 'Collapse sidebar',
        // Admin header
        'admin.dashboardTitle': 'Admin Dashboard',
        'admin.dashboardWelcome': 'Welcome back! Manage your VULE ITS content.',
        'admin.logout': 'Logout',
        'admin.userProfile': 'User profile',
        'admin.changePassword': 'Change password',
        'admin.openUserMenu': 'Open user menu',
        'admin.changePasswordTitle': 'Change password',
        'admin.currentPassword': 'Current password',
        'admin.newPassword': 'New password',
        'admin.confirmPassword': 'Confirm new password',
        'admin.cancel': 'Cancel',
        'admin.updatePassword': 'Update password',
        'admin.passwordChanged': 'Password updated successfully.',
        'admin.passwordMismatch': 'New passwords do not match.',
        'admin.passwordChangeError': 'Could not update password.',
        'admin.profileTitle': 'Your profile',
        'admin.profileSubtitle': 'Email and role are read-only. You can update how your name appears in the admin area.',
        'admin.profileEmail': 'Email',
        'admin.profileRole': 'Role',
        'admin.profileDisplayName': 'Display name',
        'admin.profileDisplayNamePlaceholder': 'Optional',
        'admin.saveChanges': 'Save changes',
        'admin.saving': 'Saving…',
        'admin.profileLoading': 'Loading profile…',
        'admin.profileLoadError': 'Could not load profile.',
        'admin.profileSaved': 'Profile updated.',
        'admin.profileSaveError': 'Could not save profile.',
        'admin.companyProfile': 'Company profile',
        'admin.companyProfileDesc': 'Organization details, logo, contacts, and social links (Administrators only).',
        'admin.companyName': 'Company name',
        'admin.companyFullNameVi': 'Full name (Vietnamese)',
        'admin.companyFullNameEn': 'Full name (English)',
        'admin.companySlogan': 'Slogan',
        'admin.companyAddress': 'Address',
        'admin.companyLogo': 'Logo',
        'admin.logoUrlHint': 'Image URL (https://… or /path)',
        'admin.logoFromLibrary': 'Choose from uploaded',
        'admin.logoUploadFile': 'Upload image',
        'admin.contactEmail': 'Email',
        'admin.contactPhone': 'Phone',
        'admin.contactHotline': 'Hotline',
        'admin.mapEmbedUrl': 'Google Maps (embed URL)',
        'admin.mapEmbedHint': 'Optional. In Google Maps: Share → Embed a map → copy only the iframe src URL. If empty, the Contact page map uses your Address.',
        'admin.socialLinks': 'Social links',
        'admin.socialAdd': 'Add link',
        'admin.socialType': 'Type',
        'admin.socialUrl': 'URL',
        'admin.saveCompanyProfile': 'Save company profile',
        'admin.companyLoadError': 'Could not load company profile.',
        'admin.companySaveError': 'Could not save.',
        'admin.companySaved': 'Company profile saved.',
        'admin.uploading': 'Uploading…',
        'admin.logoUploadSuccess': 'Logo uploaded',
        'admin.pickLogoTitle': 'Choose logo from library',
        'admin.close': 'Close',
        'admin.noImagesInLibrary': 'No images in media library yet. Upload a logo file above.',
        // Public contact page
        'contact.heroTitle': 'Get In Touch',
        'contact.heroSubtitle': "Have questions? We'd love to hear from you. Send us a message!",
        'contact.sendMessage': 'Send us a Message',
        'contact.contactInfo': 'Contact Information',
        'contact.findUs': 'Find Us',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.hotline': 'Hotline',
        'contact.address': 'Address',
        'contact.mapPlaceholder': 'Add your address or an embed URL in Company profile to show the map.',
        'contact.fullName': 'Full Name',
        'contact.yourEmail': 'Email Address',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.thanks': 'Thank you for your message! We will get back to you soon.',
        'contact.followUs': 'Follow us',
        'contact.socialNavAria': 'Social media links',
        'contact.visitOurSocial': 'Visit our {{name}} (opens in new tab)'
    },
    'vi-VN': {
        'lang.english': 'Tiếng Anh (Mỹ)',
        'lang.vietnamese': 'Tiếng Việt',
        'lang.switchLanguage': 'Đổi ngôn ngữ',
        'lang.toggleToVietnamese': 'Chuyển sang Tiếng Việt',
        'lang.toggleToEnglish': 'Chuyển sang Tiếng Anh',
        // Public nav
        'nav.home': 'Trang chủ',
        'nav.about': 'Giới thiệu',
        'nav.products': 'Sản phẩm',
        'nav.news': 'Tin tức',
        'nav.services': 'Dịch vụ',
        'nav.contact': 'Liên hệ',
        'nav.admin': 'Đăng nhập',
        'nav.tagline': 'Đưa bạn đến thành công',
        'nav.toggleMenu': 'Mở/đóng menu',
        // Public home
        'home.heroIntro': 'Với phương châm "Hiệu quả cao, chi phí thấp và phát triển bền vững", chúng tôi mỗi ngày đều nỗ lực để khẳng định năng lực và giữ vững niềm tin của khách hàng.',
        // Admin common
        'admin.panel': 'Bảng điều khiển',
        'admin.overview': 'Tổng quan',
        'admin.users': 'Người dùng',
        'admin.permissions': 'Phân quyền',
        'admin.productGroup': 'Sản phẩm & Dịch vụ',
        'admin.contents': 'Nội dung',
        'admin.settings': 'Cài đặt',
        'admin.permissionGroup': 'Phân quyền',
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
        'admin.expand': 'Mở rộng',
        'admin.expandSidebar': 'Mở rộng thanh bên',
        'admin.collapseSidebar': 'Thu gọn thanh bên',
        // Admin header
        'admin.dashboardTitle': 'Bảng điều khiển',
        'admin.dashboardWelcome': 'Chào mừng trở lại! Quản lý nội dung VULE ITS.',
        'admin.logout': 'Đăng xuất',
        'admin.userProfile': 'Hồ sơ người dùng',
        'admin.changePassword': 'Đổi mật khẩu',
        'admin.openUserMenu': 'Mở menu người dùng',
        'admin.changePasswordTitle': 'Đổi mật khẩu',
        'admin.currentPassword': 'Mật khẩu hiện tại',
        'admin.newPassword': 'Mật khẩu mới',
        'admin.confirmPassword': 'Xác nhận mật khẩu mới',
        'admin.cancel': 'Hủy',
        'admin.updatePassword': 'Cập nhật mật khẩu',
        'admin.passwordChanged': 'Đã cập nhật mật khẩu.',
        'admin.passwordMismatch': 'Mật khẩu mới không khớp.',
        'admin.passwordChangeError': 'Không thể đổi mật khẩu.',
        'admin.profileTitle': 'Hồ sơ của bạn',
        'admin.profileSubtitle': 'Email và vai trò chỉ xem. Bạn có thể đổi tên hiển thị trong khu vực quản trị.',
        'admin.profileEmail': 'Email',
        'admin.profileRole': 'Vai trò',
        'admin.profileDisplayName': 'Tên hiển thị',
        'admin.profileDisplayNamePlaceholder': 'Tùy chọn',
        'admin.saveChanges': 'Lưu thay đổi',
        'admin.saving': 'Đang lưu…',
        'admin.profileLoading': 'Đang tải hồ sơ…',
        'admin.profileLoadError': 'Không tải được hồ sơ.',
        'admin.profileSaved': 'Đã cập nhật hồ sơ.',
        'admin.profileSaveError': 'Không lưu được hồ sơ.',
        'admin.companyProfile': 'Hồ sơ công ty',
        'admin.companyProfileDesc': 'Thông tin tổ chức, logo, liên hệ và mạng xã hội (chỉ Quản trị viên).',
        'admin.companyName': 'Tên công ty',
        'admin.companyFullNameVi': 'Tên đầy đủ (Tiếng Việt)',
        'admin.companyFullNameEn': 'Tên đầy đủ (Tiếng Anh)',
        'admin.companySlogan': 'Khẩu hiệu',
        'admin.companyAddress': 'Địa chỉ',
        'admin.companyLogo': 'Logo',
        'admin.logoUrlHint': 'URL ảnh (https://… hoặc /đường/dẫn)',
        'admin.logoFromLibrary': 'Chọn từ thư viện',
        'admin.logoUploadFile': 'Tải ảnh lên',
        'admin.contactEmail': 'Email',
        'admin.contactPhone': 'Điện thoại',
        'admin.contactHotline': 'Hotline',
        'admin.mapEmbedUrl': 'Google Maps (URL nhúng)',
        'admin.mapEmbedHint': 'Tùy chọn. Trên Google Maps: Chia sẻ → Nhúng bản đồ → chỉ sao chép URL trong thuộc tính src của iframe. Để trống thì trang Liên hệ dùng Địa chỉ để hiển thị bản đồ.',
        'admin.socialLinks': 'Liên kết mạng xã hội',
        'admin.socialAdd': 'Thêm liên kết',
        'admin.socialType': 'Loại',
        'admin.socialUrl': 'URL',
        'admin.saveCompanyProfile': 'Lưu hồ sơ công ty',
        'admin.companyLoadError': 'Không tải được hồ sơ công ty.',
        'admin.companySaveError': 'Không lưu được.',
        'admin.companySaved': 'Đã lưu hồ sơ công ty.',
        'admin.uploading': 'Đang tải lên…',
        'admin.logoUploadSuccess': 'Đã tải logo lên',
        'admin.pickLogoTitle': 'Chọn logo từ thư viện',
        'admin.close': 'Đóng',
        'admin.noImagesInLibrary': 'Chưa có ảnh trong thư viện. Hãy tải logo lên phía trên.',
        'contact.heroTitle': 'Liên hệ',
        'contact.heroSubtitle': 'Bạn có câu hỏi? Chúng tôi rất muốn lắng nghe. Hãy gửi tin nhắn!',
        'contact.sendMessage': 'Gửi tin nhắn',
        'contact.contactInfo': 'Thông tin liên hệ',
        'contact.findUs': 'Tìm chúng tôi',
        'contact.email': 'Email',
        'contact.phone': 'Điện thoại',
        'contact.hotline': 'Hotline',
        'contact.address': 'Địa chỉ',
        'contact.mapPlaceholder': 'Thêm địa chỉ hoặc URL nhúng trong Hồ sơ công ty để hiển thị bản đồ.',
        'contact.fullName': 'Họ và tên',
        'contact.yourEmail': 'Địa chỉ email',
        'contact.subject': 'Chủ đề',
        'contact.message': 'Nội dung',
        'contact.send': 'Gửi',
        'contact.thanks': 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.',
        'contact.followUs': 'Theo dõi chúng tôi',
        'contact.socialNavAria': 'Liên kết mạng xã hội',
        'contact.visitOurSocial': 'Mở {{name}} (tab mới)'
    }
};
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'app_locale';
function LocaleProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en-US');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (typeof document !== 'undefined') document.documentElement.lang = locale;
    }, [
        locale
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            locale,
            setLocale: (next)=>setLocaleState(next),
            t: (key, vars)=>{
                const table = messagesByLocale[locale] ?? messagesByLocale['en-US'];
                let s = table[key] ?? messagesByLocale['en-US'][key] ?? key;
                if (vars) {
                    for (const [k, v] of Object.entries(vars)){
                        s = s.split(`{{${k}}}`).join(v);
                    }
                }
                return s;
            }
        }), [
        locale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/providers/LocaleProvider.tsx",
        lineNumber: 306,
        columnNumber: 10
    }, this);
}
function useLocale() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocaleContext);
    if (!ctx) {
        throw new Error('useLocale must be used inside LocaleProvider');
    }
    return ctx;
}
}),
"[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const DEFAULT_DURATION_MS = 5000;
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const idRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
        const timer = timersRef.current.get(id);
        if (timer) clearTimeout(timer);
        timersRef.current.delete(id);
    }, []);
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, opts)=>{
        const text = (message || '').trim() || '—';
        const id = ++idRef.current;
        const variant = opts?.variant ?? 'info';
        const duration = opts?.duration ?? DEFAULT_DURATION_MS;
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    message: text,
                    variant
                }
            ]);
        if (duration > 0) {
            const timer = setTimeout(()=>remove(id), duration);
            timersRef.current.set(id, timer);
        }
    }, [
        remove
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            timersRef.current.forEach((t)=>clearTimeout(t));
        };
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            push,
            success: (m, d)=>push(m, {
                    variant: 'success',
                    duration: d ?? DEFAULT_DURATION_MS
                }),
            error: (m, d)=>push(m, {
                    variant: 'error',
                    duration: d ?? DEFAULT_DURATION_MS
                }),
            info: (m, d)=>push(m, {
                    variant: 'info',
                    duration: d ?? DEFAULT_DURATION_MS
                })
        }), [
        push
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-[10000] flex flex-col gap-2 items-end pointer-events-none max-w-[min(420px,calc(100vw-2rem))]",
                "aria-live": "polite",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        className: `toast-pop pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md text-sm font-medium ${t.variant === 'success' ? 'bg-emerald-950/92 border-emerald-500/45 text-emerald-50' : t.variant === 'error' ? 'bg-red-950/92 border-red-500/45 text-red-50' : 'bg-[#14141c]/95 border-white/20 text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1 break-words text-left",
                                children: t.message
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>remove(t.id),
                                className: "shrink-0 opacity-70 hover:opacity-100 -mr-1 -mt-0.5 px-1 leading-none text-lg",
                                "aria-label": "Dismiss",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/WebPortal/vuleits-website/src/components/providers/ToastProvider.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
function useToast() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$WebPortal$2f$vuleits$2d$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return ctx;
}
}),
"[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/WebPortal/vuleits-website/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__339d5f35._.js.map