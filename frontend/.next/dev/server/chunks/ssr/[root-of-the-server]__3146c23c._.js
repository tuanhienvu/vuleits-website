module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/frontend/lib/locale/defaultMessages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Built-in UI strings for en-US / vi-VN. Admins can override via Dashboard → UI text (stored in DB).
 * When adding keys here, run `npx prisma db push` if schema unchanged; new keys are available immediately.
 */ __turbopack_context__.s([
    "UI_LOCALES",
    ()=>UI_LOCALES,
    "allUiMessageKeys",
    ()=>allUiMessageKeys,
    "defaultMessagesByLocale",
    ()=>defaultMessagesByLocale
]);
const defaultMessagesByLocale = {
    'en-US': {
        'lang.english': 'English (US)',
        'lang.vietnamese': 'Vietnamese',
        'lang.switchLanguage': 'Switch language',
        'lang.toggleToVietnamese': 'Switch to Vietnamese',
        'lang.toggleToEnglish': 'Switch to English',
        'theme.switchToLight': 'Switch to light mode',
        'theme.switchToDark': 'Switch to dark mode',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.products': 'Products',
        'nav.news': 'News',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.admin': 'Login',
        'nav.tagline': 'Bring Your Success',
        'nav.toggleMenu': 'Toggle menu',
        'home.heroIntro': 'With the motto "High efficiency, low cost, and sustainable development," we are striving every day to prove ourselves and maintain the trust and confidence of our customers.',
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
        'admin.aboutUs': 'About Us',
        'admin.privacyPolicy': 'Privacy Policy',
        'admin.termsOfService': 'Terms of Service',
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
        'admin.aboutUsPageSubtitle': 'Vision, intro copy, and hero image for the public About page. Separate paragraphs with a blank line.',
        'admin.aboutUsLoadError': 'Failed to load About intro',
        'admin.aboutUsSaved': 'About intro saved',
        'admin.aboutUsTitleEn': 'Title (English)',
        'admin.aboutUsTitleVi': 'Title (Vietnamese)',
        'admin.aboutUsBodyEn': 'Body (English)',
        'admin.aboutUsBodyVi': 'Body (Vietnamese)',
        'admin.aboutUsBodyHint': 'Plain text or safe HTML (headings, lists, links).',
        'admin.aboutUsHeroUrl': 'Hero image URL',
        'admin.aboutUsHeroAltEn': 'Hero image alt (English)',
        'admin.aboutUsHeroAltVi': 'Hero image alt (Vietnamese)',
        'admin.aboutUsNoPermission': 'You do not have permission to view this section.',
        'admin.aboutUsLoading': 'Loading…',
        'admin.overviewQuickLinks': 'Quick links',
        'admin.overviewEditAboutUs': 'About Us — vision & intro',
        'admin.overviewLoadingData': 'Loading dashboard data…',
        'admin.uiMessages': 'UI text & translations',
        'admin.uiMessagesHelp': 'Override copy for the public site and admin. Clear a field and save to restore the built-in default. Use search to find keys (e.g. nav.home, contact.send).',
        'admin.uiMessagesSearch': 'Search keys or text…',
        'admin.uiMessagesBackupTitle': 'Backup & Excel',
        'admin.uiMessagesExportExcel': 'Export Excel',
        'admin.uiMessagesImportExcel': 'Import Excel',
        'admin.uiMessagesImportLoad': 'Load Excel',
        'admin.uiMessagesImportSave': 'Import',
        'admin.uiMessagesViewTable': 'Table',
        'admin.uiMessagesViewCards': 'Cards',
        'admin.uiMessagesExcelHelp': 'Use columns key, en-US, and vi-VN (same as an export from this screen). Only rows with known keys are applied. After editing offline, load the file into the editor or apply it directly to the server.',
        'admin.uiMessagesOverridesHint': '{{count}} values differ from built-in defaults',
        'admin.uiMessagesExportDone': 'Spreadsheet download started.',
        'admin.uiMessagesImportEditorDone': 'Loaded into the editor. Click Save to write to the server.',
        'admin.uiMessagesImportServerDone': 'Translation data updated on the server.',
        'admin.uiMessagesLoadError': 'Could not load translation data.',
        'admin.uiMessagesSaveDone': 'Translation data saved.',
        'admin.uiMessagesSaveError': 'Could not save translation data.',
        'admin.uiMessagesImportBadLayout': 'This file needs headers for the message key, English (en-US), and Vietnamese (vi-VN). Export a template from here first.',
        'admin.uiMessagesImportNoRows': 'No valid data rows found.',
        'admin.uiMessagesImportSkippedUnknown': 'Skipped {{count}} unknown keys.',
        'admin.uiMessagesSave': 'Save Data',
        'admin.uiMessagesNeedUpdate': 'You need UI text update permission to save or import to the server.',
        'admin.uiMessagesFilterSection': 'Section',
        'admin.uiMessagesFilterSectionAll': 'All sections',
        'admin.uiMessagesFilterStatus': 'Keys',
        'admin.uiMessagesFilterStatusAll': 'All keys',
        'admin.uiMessagesFilterStatusCustom': 'Customized only',
        'admin.uiMessagesFilterStatusDefault': 'Built-in default only',
        'admin.uiMessagesRowsPerPage': 'Rows per page',
        'admin.uiMessagesRowsAll': 'All',
        'admin.uiMessagesShowing': 'Showing {{from}}–{{to}} of {{total}}',
        'admin.uiMessagesPrev': 'Previous',
        'admin.uiMessagesNext': 'Next',
        'admin.uiMessagesClearFilters': 'Reset filters',
        'admin.uiMessagesNoMatches': 'No keys match the current filters. Try another section or reset filters.',
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
        'theme.switchToLight': 'Chuyển sang giao diện sáng',
        'theme.switchToDark': 'Chuyển sang giao diện tối',
        'nav.home': 'Trang chủ',
        'nav.about': 'Giới thiệu',
        'nav.products': 'Sản phẩm',
        'nav.news': 'Tin tức',
        'nav.services': 'Dịch vụ',
        'nav.contact': 'Liên hệ',
        'nav.admin': 'Đăng nhập',
        'nav.tagline': 'Đưa bạn đến thành công',
        'nav.toggleMenu': 'Mở/đóng menu',
        'home.heroIntro': 'Với phương châm "Hiệu quả cao, chi phí thấp và phát triển bền vững", chúng tôi mỗi ngày đều nỗ lực để khẳng định năng lực và giữ vững niềm tin của khách hàng.',
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
        'admin.aboutUs': 'Giới thiệu',
        'admin.privacyPolicy': 'Chính sách bảo mật',
        'admin.termsOfService': 'Điều khoản dịch vụ',
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
        'admin.aboutUsPageSubtitle': 'Tầm nhìn, nội dung giới thiệu và ảnh hero cho trang Giới thiệu công khai. Ngăn cách đoạn bằng một dòng trống.',
        'admin.aboutUsLoadError': 'Không tải được nội dung Giới thiệu',
        'admin.aboutUsSaved': 'Đã lưu nội dung Giới thiệu',
        'admin.aboutUsTitleEn': 'Tiêu đề (Tiếng Anh)',
        'admin.aboutUsTitleVi': 'Tiêu đề (Tiếng Việt)',
        'admin.aboutUsBodyEn': 'Nội dung (Tiếng Anh)',
        'admin.aboutUsBodyVi': 'Nội dung (Tiếng Việt)',
        'admin.aboutUsBodyHint': 'Văn bản thuần hoặc HTML an toàn (tiêu đề, danh sách, liên kết).',
        'admin.aboutUsHeroUrl': 'URL ảnh hero',
        'admin.aboutUsHeroAltEn': 'Mô tả ảnh hero (Tiếng Anh)',
        'admin.aboutUsHeroAltVi': 'Mô tả ảnh hero (Tiếng Việt)',
        'admin.aboutUsNoPermission': 'Bạn không có quyền xem mục này.',
        'admin.aboutUsLoading': 'Đang tải…',
        'admin.overviewQuickLinks': 'Liên kết nhanh',
        'admin.overviewEditAboutUs': 'Giới thiệu — tầm nhìn & nội dung',
        'admin.overviewLoadingData': 'Đang tải dữ liệu bảng điều khiển…',
        'admin.uiMessages': 'Chữ giao diện & bản dịch',
        'admin.uiMessagesHelp': 'Ghi đè nội dung trang công khai và admin. Xóa nội dung ô và lưu để khôi phục mặc định. Tìm theo khóa (vd: nav.home, contact.send).',
        'admin.uiMessagesSearch': 'Tìm khóa hoặc nội dung…',
        'admin.uiMessagesBackupTitle': 'Sao lưu & Excel',
        'admin.uiMessagesExportExcel': 'Xuất Excel',
        'admin.uiMessagesImportExcel': 'Nhập Excel',
        'admin.uiMessagesImportLoad': 'Tải Excel',
        'admin.uiMessagesImportSave': 'Nhập',
        'admin.uiMessagesViewTable': 'Bảng',
        'admin.uiMessagesViewCards': 'Thẻ',
        'admin.uiMessagesExcelHelp': 'Cột: key, en-US, vi-VN (giống file xuất từ đây). Chỉ áp dụng dòng có khóa đã biết. Sau khi sửa ngoại tuyến, tải vào trình sửa hoặc áp dụng thẳng lên máy chủ.',
        'admin.uiMessagesOverridesHint': '{{count}} giá trị khác bản mặc định',
        'admin.uiMessagesExportDone': 'Đã bắt đầu tải file bảng tính.',
        'admin.uiMessagesImportEditorDone': 'Đã tải vào trình sửa. Nhấn Lưu để ghi lên máy chủ.',
        'admin.uiMessagesImportServerDone': 'Đã cập nhật dữ liệu bản dịch trên máy chủ.',
        'admin.uiMessagesLoadError': 'Không tải được dữ liệu bản dịch.',
        'admin.uiMessagesSaveDone': 'Đã lưu dữ liệu bản dịch.',
        'admin.uiMessagesSaveError': 'Không lưu được dữ liệu bản dịch.',
        'admin.uiMessagesImportBadLayout': 'File cần tiêu đề cột cho khóa, tiếng Anh (en-US) và tiếng Việt (vi-VN). Hãy xuất mẫu từ đây trước.',
        'admin.uiMessagesImportNoRows': 'Không có dòng dữ liệu hợp lệ.',
        'admin.uiMessagesImportSkippedUnknown': 'Đã bỏ qua {{count}} khóa không xác định.',
        'admin.uiMessagesSave': 'Lưu dữ liệu',
        'admin.uiMessagesNeedUpdate': 'Bạn cần quyền cập nhật chữ giao diện để lưu hoặc nhập lên máy chủ.',
        'admin.uiMessagesFilterSection': 'Nhóm',
        'admin.uiMessagesFilterSectionAll': 'Tất cả nhóm',
        'admin.uiMessagesFilterStatus': 'Khóa',
        'admin.uiMessagesFilterStatusAll': 'Tất cả khóa',
        'admin.uiMessagesFilterStatusCustom': 'Chỉ đã tùy chỉnh',
        'admin.uiMessagesFilterStatusDefault': 'Chỉ mặc định gốc',
        'admin.uiMessagesRowsPerPage': 'Số dòng / trang',
        'admin.uiMessagesRowsAll': 'Tất cả',
        'admin.uiMessagesShowing': 'Hiển thị {{from}}–{{to}} / {{total}}',
        'admin.uiMessagesPrev': 'Trước',
        'admin.uiMessagesNext': 'Sau',
        'admin.uiMessagesClearFilters': 'Xóa bộ lọc',
        'admin.uiMessagesNoMatches': 'Không có khóa phù hợp bộ lọc. Thử nhóm khác hoặc xóa bộ lọc.',
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
const UI_LOCALES = [
    'en-US',
    'vi-VN'
];
const allUiMessageKeys = Object.keys(defaultMessagesByLocale['en-US']);
}),
"[project]/frontend/components/providers/LocaleProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/locale/defaultMessages.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'app_locale';
function parseOverridesPayload(data) {
    if (data === null || typeof data !== 'object' || Array.isArray(data)) return {};
    const root = data;
    const out = {};
    for (const loc of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_LOCALES"]){
        const block = root[loc];
        if (block !== null && typeof block === 'object' && !Array.isArray(block)) {
            out[loc] = {
                ...block
            };
        }
    }
    return out;
}
function resolveString(locale, key, defaults, overrides) {
    const o = overrides?.[locale]?.[key];
    if (o !== undefined && o !== null && String(o).trim() !== '') return String(o);
    return defaults[locale][key] ?? defaults['en-US'][key] ?? key;
}
function LocaleProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en-US');
    const [overrides, setOverrides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const refreshUiMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await fetch('/api/ui-messages', {
                cache: 'no-store'
            });
            if (!res.ok) return;
            const data = await res.json();
            setOverrides(parseOverridesPayload(data));
        } catch  {
        // keep built-in defaults
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = requestAnimationFrame(()=>{
            void refreshUiMessages();
        });
        return ()=>cancelAnimationFrame(id);
    }, [
        refreshUiMessages
    ]);
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
            refreshUiMessages,
            t: (key, vars)=>{
                let s = resolveString(locale, key, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"], overrides);
                if (vars) {
                    for (const [k, v] of Object.entries(vars)){
                        s = s.split(`{{${k}}}`).join(v);
                    }
                }
                return s;
            }
        }), // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshUiMessages is useCallback([]) stable
    [
        locale,
        overrides
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/providers/LocaleProvider.tsx",
        lineNumber: 107,
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
"[project]/frontend/components/providers/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const STORAGE_KEY = 'vuleits-theme';
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function applyThemeClass(mode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    root.style.colorScheme = mode;
}
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((mode)=>{
        // Force dark mode only. (Light-mode UI was causing readability regressions.)
        void mode;
        setThemeState('dark');
        applyThemeClass('dark');
        try {
            localStorage.setItem(STORAGE_KEY, 'dark');
        } catch  {
        // ignore
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        try {
            // Always apply dark mode (ignore persisted preference).
            setThemeState('dark');
            applyThemeClass('dark');
        } catch  {
            applyThemeClass('dark');
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onStorage = (e)=>{
            // Ignore storage events so light mode can't re-activate.
            if (e.key !== STORAGE_KEY) return;
            void e;
        };
        window.addEventListener('storage', onStorage);
        return ()=>window.removeEventListener('storage', onStorage);
    }, []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Light mode toggle is disabled; keep dark.
        setTheme('dark');
    }, [
        theme,
        setTheme
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            theme,
            setTheme,
            toggleTheme,
            mounted
        }), [
        theme,
        setTheme,
        toggleTheme,
        mounted
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/providers/ThemeProvider.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
function useTheme() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return ctx;
}
}),
"[project]/frontend/components/providers/ToastProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const DEFAULT_DURATION_MS = 5000;
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const idRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
        const timer = timersRef.current.get(id);
        if (timer) clearTimeout(timer);
        timersRef.current.delete(id);
    }, []);
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, opts)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timers = timersRef.current;
        return ()=>{
            timers.forEach((t)=>clearTimeout(t));
        };
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-[10000] flex flex-col gap-2 items-end pointer-events-none max-w-[min(420px,calc(100vw-2rem))]",
                "aria-live": "polite",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        className: `toast-pop pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md text-sm font-medium ${t.variant === 'success' ? 'bg-emerald-950/92 border-emerald-500/45 text-emerald-50' : t.variant === 'error' ? 'bg-red-950/92 border-red-500/45 text-red-50' : 'bg-[#14141c]/95 border-white/20 text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1 break-words text-left",
                                children: t.message
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>remove(t.id),
                                className: "shrink-0 opacity-70 hover:opacity-100 -mr-1 -mt-0.5 px-1 leading-none text-lg",
                                "aria-label": "Dismiss",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function useToast() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return ctx;
}
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
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
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactDOM; //# sourceMappingURL=react-dom.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/head-manager-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].HeadManagerContext; //# sourceMappingURL=head-manager-context.js.map
}),
"[project]/node_modules/next/dist/client/set-attributes-from-props.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setAttributesFromProps", {
    enumerable: true,
    get: function() {
        return setAttributesFromProps;
    }
});
const DOMAttributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    noModule: 'noModule'
};
const ignoreProps = [
    'onLoad',
    'onReady',
    'dangerouslySetInnerHTML',
    'children',
    'onError',
    'strategy',
    'stylesheets'
];
function isBooleanScriptAttribute(attr) {
    return [
        'async',
        'defer',
        'noModule'
    ].includes(attr);
}
function setAttributesFromProps(el, props) {
    for (const [p, value] of Object.entries(props)){
        if (!props.hasOwnProperty(p)) continue;
        if (ignoreProps.includes(p)) continue;
        // we don't render undefined props to the DOM
        if (value === undefined) {
            continue;
        }
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr)) {
            // Correctly assign boolean script attributes
            // https://github.com/vercel/next.js/pull/20748
            ;
            el[attr] = !!value;
        } else {
            el.setAttribute(attr, String(value));
        }
        // Remove falsy non-zero boolean attributes so they are correctly interpreted
        // (e.g. if we set them to false, this coerces to the string "false", which the browser interprets as true)
        if (value === false || el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr) && (!value || value === 'false')) {
            // Call setAttribute before, as we need to set and unset the attribute to override force async:
            // https://html.spec.whatwg.org/multipage/scripting.html#script-force-async
            el.setAttribute(attr, '');
            el.removeAttribute(attr);
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=set-attributes-from-props.js.map
}),
"[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cancelIdleCallback: null,
    requestIdleCallback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map
}),
"[project]/node_modules/next/dist/client/script.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleClientScriptLoad: null,
    initScriptLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    handleClientScriptLoad: function() {
        return handleClientScriptLoad;
    },
    initScriptLoader: function() {
        return initScriptLoader;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/head-manager-context.js [app-ssr] (ecmascript)");
const _setattributesfromprops = __turbopack_context__.r("[project]/node_modules/next/dist/client/set-attributes-from-props.js [app-ssr] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)");
const ScriptCache = new Map();
const LoadCache = new Set();
const insertStylesheets = (stylesheets)=>{
    // Case 1: Styles for afterInteractive/lazyOnload with appDir injected via handleClientScriptLoad
    //
    // Using ReactDOM.preinit to feature detect appDir and inject styles
    // Stylesheets might have already been loaded if initialized with Script component
    // Re-inject styles here to handle scripts loaded via handleClientScriptLoad
    // ReactDOM.preinit handles dedup and ensures the styles are loaded only once
    if (_reactdom.default.preinit) {
        stylesheets.forEach((stylesheet)=>{
            _reactdom.default.preinit(stylesheet, {
                as: 'style'
            });
        });
        return;
    }
    // Case 2: Styles for afterInteractive/lazyOnload with pages injected via handleClientScriptLoad
    //
    // We use this function to load styles when appdir is not detected
    // TODO: Use React float APIs to load styles once available for pages dir
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const loadScript = (props)=>{
    const { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = '', strategy = 'afterInteractive', onError, stylesheets } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    /** Execute after the script first loaded */ const afterLoad = ()=>{
        // Run onReady for the first time after load event
        if (onReady) {
            onReady();
        }
        // add cacheKey to LoadCache when load successfully
        LoadCache.add(cacheKey);
    };
    const el = document.createElement('script');
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener('load', function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
            afterLoad();
        });
        el.addEventListener('error', function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
        afterLoad();
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        afterLoad();
    } else if (src) {
        el.src = src;
        // do not add cacheKey into LoadCache for remote script here
        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
        ScriptCache.set(src, loadPromise);
    }
    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
    if (strategy === 'worker') {
        el.setAttribute('type', 'text/partytown');
    }
    el.setAttribute('data-nscript', strategy);
    // Load styles associated with this script
    if (stylesheets) {
        insertStylesheets(stylesheets);
    }
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy = 'afterInteractive' } = props;
    if (strategy === 'lazyOnload') {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === 'complete') {
        (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
    } else {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute('src');
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
/**
 * Load a third-party scripts in an optimized way.
 *
 * Read more: [Next.js Docs: `next/script`](https://nextjs.org/docs/app/api-reference/components/script)
 */ function Script(props) {
    const { id, src = '', onLoad = ()=>{}, onReady = null, strategy = 'afterInteractive', onError, stylesheets, ...restProps } = props;
    // Context is available only during SSR
    let { updateScripts, scripts, getIsSsr, appDir, nonce } = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    // if a nonce is explicitly passed to the script tag, favor that over the automatic handling
    nonce = restProps.nonce || nonce;
    /**
   * - First mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
   *      Once the script is loaded, the onLoad and onReady will be called by then
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   *
   * - Second mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
   *      onReady is called, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. The script is already loaded, loadScript bails out
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   */ const hasOnReadyEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        const cacheKey = id || src;
        if (!hasOnReadyEffectCalled.current) {
            // Run onReady if script has loaded before but component is re-mounted
            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
                onReady();
            }
            hasOnReadyEffectCalled.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    const hasLoadScriptEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!hasLoadScriptEffectCalled.current) {
            if (strategy === 'afterInteractive') {
                loadScript(props);
            } else if (strategy === 'lazyOnload') {
                loadLazyScript(props);
            }
            hasLoadScriptEffectCalled.current = true;
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === 'beforeInteractive' || strategy === 'worker') {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                {
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError,
                    ...restProps,
                    nonce
                }
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript({
                ...props,
                nonce
            });
        }
    }
    // For the app directory, we need React Float to preload these scripts.
    if (appDir) {
        // Injecting stylesheets here handles beforeInteractive and worker scripts correctly
        // For other strategies injecting here ensures correct stylesheet order
        // ReactDOM.preinit handles loading the styles in the correct order,
        // also ensures the stylesheet is loaded only once and in a consistent manner
        //
        // Case 1: Styles for beforeInteractive/worker with appDir - handled here
        // Case 2: Styles for beforeInteractive/worker with pages dir - Not handled yet
        // Case 3: Styles for afterInteractive/lazyOnload with appDir - handled here
        // Case 4: Styles for afterInteractive/lazyOnload with pages dir - handled in insertStylesheets function
        if (stylesheets) {
            stylesheets.forEach((styleSrc)=>{
                _reactdom.default.preinit(styleSrc, {
                    as: 'style'
                });
            });
        }
        // Before interactive scripts need to be loaded by Next.js' runtime instead
        // of native <script> tags, because they no longer have `defer`.
        if (strategy === 'beforeInteractive') {
            if (!src) {
                // For inlined scripts, we put the content in `children`.
                if (restProps.dangerouslySetInnerHTML) {
                    // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
                    delete restProps.dangerouslySetInnerHTML;
                }
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            0,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            } else {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            src,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            }
        } else if (strategy === 'afterInteractive') {
            if (src) {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
            }
        }
    }
    return null;
}
Object.defineProperty(Script, '__nextScript', {
    value: true
});
const _default = Script;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3146c23c._.js.map