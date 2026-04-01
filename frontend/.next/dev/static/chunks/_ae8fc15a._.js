(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/lib/locale/defaultMessages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        'admin.settingsNavAbout': 'About page',
        'admin.settingsNavCompany': 'Company Info',
        'admin.settingsNavSite': 'Legal & UI',
        'admin.redirecting': 'Redirecting…',
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
        'admin.contactInbox': 'Contact inbox',
        'admin.contactNewBanner': '{{count}} new contact message(s) — open inbox',
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
        'contact.sending': 'Sending…',
        'contact.submitError': 'Could not send your message. Please try again.',
        'contact.submitRateLimited': 'Too many attempts. Please wait and try again later.',
        'contact.submitNetworkError': 'Network error. Check your connection and try again.',
        'contact.followUs': 'Follow us',
        'contact.socialNavAria': 'Social media links',
        'contact.visitOurSocial': 'Visit our {{name}} (opens in new tab)',
        'footer.manageCookies': 'Manage cookies',
        'marketing.consentMessage': 'We use cookies and scripts for analytics and marketing (Google, Meta, TikTok, Zalo). You can accept all, or reject marketing tracking.',
        'marketing.acceptAll': 'Accept all',
        'marketing.rejectMarketing': 'Reject marketing',
        'admin.seoMarketing': 'SEO & Marketing',
        'admin.seoMarketingHelp': 'Manage tracking IDs and conversion labels without redeploying.',
        'admin.seoMarketingEnableGlobal': 'Enable marketing integrations globally',
        'admin.seoMarketingEnablePlatform': 'Enable this platform',
        'admin.seoMarketingPixelId': 'Pixel ID',
        'admin.seoMarketingLeadLabel': 'Google Ads lead conversion label',
        'admin.seoMarketingPurchaseLabel': 'Google Ads purchase conversion label',
        'admin.seoMarketingZaloScriptUrl': 'Zalo script URL (optional)',
        'admin.seoMarketingLoadError': 'Could not load SEO & Marketing settings.',
        'admin.seoMarketingSaveError': 'Could not save SEO & Marketing settings.',
        'admin.seoMarketingSaved': 'SEO & Marketing settings saved.'
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
        'admin.settingsNavAbout': 'Trang Giới thiệu',
        'admin.settingsNavCompany': 'Thông tin công ty',
        'admin.settingsNavSite': 'Pháp lý & giao diện',
        'admin.redirecting': 'Đang chuyển…',
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
        'admin.contactInbox': 'Hộp thư liên hệ',
        'admin.contactNewBanner': '{{count}} tin nhắn mới — mở hộp thư',
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
        'contact.sending': 'Đang gửi…',
        'contact.submitError': 'Không gửi được tin nhắn. Vui lòng thử lại.',
        'contact.submitRateLimited': 'Quá nhiều lần gửi. Vui lòng đợi rồi thử lại.',
        'contact.submitNetworkError': 'Lỗi mạng. Kiểm tra kết nối và thử lại.',
        'contact.followUs': 'Theo dõi chúng tôi',
        'contact.socialNavAria': 'Liên kết mạng xã hội',
        'contact.visitOurSocial': 'Mở {{name}} (tab mới)',
        'footer.manageCookies': 'Quản lý cookie',
        'marketing.consentMessage': 'Chúng tôi sử dụng cookie và script cho phân tích và tiếp thị (Google, Meta, TikTok, Zalo). Bạn có thể chấp nhận tất cả hoặc từ chối theo dõi tiếp thị.',
        'marketing.acceptAll': 'Chấp nhận tất cả',
        'marketing.rejectMarketing': 'Từ chối tiếp thị',
        'admin.seoMarketing': 'SEO & Marketing',
        'admin.seoMarketingHelp': 'Quản lý ID theo dõi và nhãn chuyển đổi mà không cần deploy lại.',
        'admin.seoMarketingEnableGlobal': 'Bật tích hợp marketing toàn cục',
        'admin.seoMarketingEnablePlatform': 'Bật nền tảng này',
        'admin.seoMarketingPixelId': 'Pixel ID',
        'admin.seoMarketingLeadLabel': 'Nhãn chuyển đổi lead của Google Ads',
        'admin.seoMarketingPurchaseLabel': 'Nhãn chuyển đổi purchase của Google Ads',
        'admin.seoMarketingZaloScriptUrl': 'URL script Zalo (tùy chọn)',
        'admin.seoMarketingLoadError': 'Không tải được thiết lập SEO & Marketing.',
        'admin.seoMarketingSaveError': 'Không lưu được thiết lập SEO & Marketing.',
        'admin.seoMarketingSaved': 'Đã lưu thiết lập SEO & Marketing.'
    }
};
const UI_LOCALES = [
    'en-US',
    'vi-VN'
];
const allUiMessageKeys = Object.keys(defaultMessagesByLocale['en-US']);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/providers/LocaleProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/locale/defaultMessages.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'app_locale';
function parseOverridesPayload(data) {
    if (data === null || typeof data !== 'object' || Array.isArray(data)) return {};
    const root = data;
    const out = {};
    for (const loc of __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UI_LOCALES"]){
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
    _s();
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en-US');
    const [overrides, setOverrides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const refreshUiMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LocaleProvider.useCallback[refreshUiMessages]": async ()=>{
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
        }
    }["LocaleProvider.useCallback[refreshUiMessages]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocaleProvider.useEffect": ()=>{
            const id = requestAnimationFrame({
                "LocaleProvider.useEffect.id": ()=>{
                    void refreshUiMessages();
                }
            }["LocaleProvider.useEffect.id"]);
            return ({
                "LocaleProvider.useEffect": ()=>cancelAnimationFrame(id)
            })["LocaleProvider.useEffect"];
        }
    }["LocaleProvider.useEffect"], [
        refreshUiMessages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocaleProvider.useEffect": ()=>{
            const saved = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem(STORAGE_KEY) : "TURBOPACK unreachable";
            if (saved === 'en-US' || saved === 'vi-VN') {
                setLocaleState(saved);
            }
        }
    }["LocaleProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocaleProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) window.localStorage.setItem(STORAGE_KEY, locale);
            if (typeof document !== 'undefined') document.documentElement.lang = locale;
        }
    }["LocaleProvider.useEffect"], [
        locale
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LocaleProvider.useMemo[value]": ()=>({
                locale,
                setLocale: ({
                    "LocaleProvider.useMemo[value]": (next)=>setLocaleState(next)
                })["LocaleProvider.useMemo[value]"],
                refreshUiMessages,
                t: ({
                    "LocaleProvider.useMemo[value]": (key, vars)=>{
                        let s = resolveString(locale, key, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$locale$2f$defaultMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMessagesByLocale"], overrides);
                        if (vars) {
                            for (const [k, v] of Object.entries(vars)){
                                s = s.split(`{{${k}}}`).join(v);
                            }
                        }
                        return s;
                    }
                })["LocaleProvider.useMemo[value]"]
            })
    }["LocaleProvider.useMemo[value]"], // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshUiMessages is useCallback([]) stable
    [
        locale,
        overrides
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/providers/LocaleProvider.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, this);
}
_s(LocaleProvider, "n8U9r8eHYxQ/LcYpSY5dFOq1610=");
_c = LocaleProvider;
function useLocale() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LocaleContext);
    if (!ctx) {
        throw new Error('useLocale must be used inside LocaleProvider');
    }
    return ctx;
}
_s1(useLocale, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "LocaleProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/providers/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const STORAGE_KEY = 'vuleits-theme';
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function applyThemeClass(mode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    root.style.colorScheme = mode;
}
function ThemeProvider({ children }) {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[setTheme]": (mode)=>{
            // Force dark mode only. (Light-mode UI was causing readability regressions.)
            void mode;
            setThemeState('dark');
            applyThemeClass('dark');
            try {
                localStorage.setItem(STORAGE_KEY, 'dark');
            } catch  {
            // ignore
            }
        }
    }["ThemeProvider.useCallback[setTheme]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            try {
                // Always apply dark mode (ignore persisted preference).
                setThemeState('dark');
                applyThemeClass('dark');
            } catch  {
                applyThemeClass('dark');
            }
        }
    }["ThemeProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const onStorage = {
                "ThemeProvider.useEffect.onStorage": (e)=>{
                    // Ignore storage events so light mode can't re-activate.
                    if (e.key !== STORAGE_KEY) return;
                    void e;
                }
            }["ThemeProvider.useEffect.onStorage"];
            window.addEventListener('storage', onStorage);
            return ({
                "ThemeProvider.useEffect": ()=>window.removeEventListener('storage', onStorage)
            })["ThemeProvider.useEffect"];
        }
    }["ThemeProvider.useEffect"], []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[toggleTheme]": ()=>{
            // Light mode toggle is disabled; keep dark.
            setTheme('dark');
        }
    }["ThemeProvider.useCallback[toggleTheme]"], [
        theme,
        setTheme
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThemeProvider.useMemo[value]": ()=>({
                theme,
                setTheme,
                toggleTheme,
                mounted
            })
    }["ThemeProvider.useMemo[value]"], [
        theme,
        setTheme,
        toggleTheme,
        mounted
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/providers/ThemeProvider.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
_s(ThemeProvider, "gjmTvuVfSSgJPHsi0Vwze1Dgw3Q=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return ctx;
}
_s1(useTheme, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/providers/ToastProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const DEFAULT_DURATION_MS = 5000;
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const idRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[remove]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[remove]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[remove]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[remove]"])
            }["ToastProvider.useCallback[remove]"]);
            const timer = timersRef.current.get(id);
            if (timer) clearTimeout(timer);
            timersRef.current.delete(id);
        }
    }["ToastProvider.useCallback[remove]"], []);
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[push]": (message, opts)=>{
            const text = (message || '').trim() || '—';
            const id = ++idRef.current;
            const variant = opts?.variant ?? 'info';
            const duration = opts?.duration ?? DEFAULT_DURATION_MS;
            setToasts({
                "ToastProvider.useCallback[push]": (prev)=>[
                        ...prev,
                        {
                            id,
                            message: text,
                            variant
                        }
                    ]
            }["ToastProvider.useCallback[push]"]);
            if (duration > 0) {
                const timer = setTimeout({
                    "ToastProvider.useCallback[push].timer": ()=>remove(id)
                }["ToastProvider.useCallback[push].timer"], duration);
                timersRef.current.set(id, timer);
            }
        }
    }["ToastProvider.useCallback[push]"], [
        remove
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastProvider.useEffect": ()=>{
            const timers = timersRef.current;
            return ({
                "ToastProvider.useEffect": ()=>{
                    timers.forEach({
                        "ToastProvider.useEffect": (t)=>clearTimeout(t)
                    }["ToastProvider.useEffect"]);
                }
            })["ToastProvider.useEffect"];
        }
    }["ToastProvider.useEffect"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ToastProvider.useMemo[value]": ()=>({
                push,
                success: ({
                    "ToastProvider.useMemo[value]": (m, d)=>push(m, {
                            variant: 'success',
                            duration: d ?? DEFAULT_DURATION_MS
                        })
                })["ToastProvider.useMemo[value]"],
                error: ({
                    "ToastProvider.useMemo[value]": (m, d)=>push(m, {
                            variant: 'error',
                            duration: d ?? DEFAULT_DURATION_MS
                        })
                })["ToastProvider.useMemo[value]"],
                info: ({
                    "ToastProvider.useMemo[value]": (m, d)=>push(m, {
                            variant: 'info',
                            duration: d ?? DEFAULT_DURATION_MS
                        })
                })["ToastProvider.useMemo[value]"]
            })
    }["ToastProvider.useMemo[value]"], [
        push
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-[10000] flex flex-col gap-2 items-end pointer-events-none max-w-[min(420px,calc(100vw-2rem))]",
                "aria-live": "polite",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        className: `toast-pop pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md text-sm font-medium ${t.variant === 'success' ? 'bg-emerald-950/92 border-emerald-500/45 text-emerald-50' : t.variant === 'error' ? 'bg-red-950/92 border-red-500/45 text-red-50' : 'bg-[#14141c]/95 border-white/20 text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1 break-words text-left",
                                children: t.message
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/providers/ToastProvider.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(ToastProvider, "JY8V23hqYn2Ve3+0M2Qre3XlqE4=");
_c = ToastProvider;
function useToast() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return ctx;
}
_s1(useToast, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canLoadGoogle",
    ()=>canLoadGoogle,
    "canLoadMeta",
    ()=>canLoadMeta,
    "canLoadTiktok",
    ()=>canLoadTiktok,
    "canLoadZalo",
    ()=>canLoadZalo,
    "getMarketingConfig",
    ()=>getMarketingConfig,
    "setMarketingOverrides",
    ()=>setMarketingOverrides
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function env(name) {
    return (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[name] || '').trim();
}
function envBool(name, fallback = false) {
    const raw = env(name).toLowerCase();
    if (!raw) return fallback;
    return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}
const envMarketingConfig = {
    enabled: envBool('NEXT_PUBLIC_MARKETING_ENABLED', false),
    google: {
        enabled: envBool('NEXT_PUBLIC_GOOGLE_ENABLED', false),
        gtagId: env('NEXT_PUBLIC_GTAG_ID'),
        ga4Id: env('NEXT_PUBLIC_GA4_ID'),
        leadConversionLabel: env('NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL'),
        purchaseConversionLabel: env('NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL')
    },
    meta: {
        enabled: envBool('NEXT_PUBLIC_META_ENABLED', false),
        pixelId: env('NEXT_PUBLIC_META_PIXEL_ID')
    },
    tiktok: {
        enabled: envBool('NEXT_PUBLIC_TIKTOK_ENABLED', false),
        pixelId: env('NEXT_PUBLIC_TIKTOK_PIXEL_ID')
    },
    zalo: {
        enabled: envBool('NEXT_PUBLIC_ZALO_ENABLED', false),
        pixelId: env('NEXT_PUBLIC_ZALO_PIXEL_ID'),
        scriptUrl: env('NEXT_PUBLIC_ZALO_SCRIPT_URL')
    }
};
let runtimeOverrides = null;
function setMarketingOverrides(overrides) {
    runtimeOverrides = overrides;
}
function getMarketingConfig() {
    if (!runtimeOverrides) return envMarketingConfig;
    return {
        enabled: runtimeOverrides.enabled ?? envMarketingConfig.enabled,
        google: {
            ...envMarketingConfig.google,
            ...runtimeOverrides.google ?? {}
        },
        meta: {
            ...envMarketingConfig.meta,
            ...runtimeOverrides.meta ?? {}
        },
        tiktok: {
            ...envMarketingConfig.tiktok,
            ...runtimeOverrides.tiktok ?? {}
        },
        zalo: {
            ...envMarketingConfig.zalo,
            ...runtimeOverrides.zalo ?? {}
        }
    };
}
function canLoadGoogle() {
    const cfg = getMarketingConfig();
    return cfg.enabled && cfg.google.enabled && !!cfg.google.gtagId;
}
function canLoadMeta() {
    const cfg = getMarketingConfig();
    return cfg.enabled && cfg.meta.enabled && !!cfg.meta.pixelId;
}
function canLoadTiktok() {
    const cfg = getMarketingConfig();
    return cfg.enabled && cfg.tiktok.enabled && !!cfg.tiktok.pixelId;
}
function canLoadZalo() {
    const cfg = getMarketingConfig();
    return cfg.enabled && cfg.zalo.enabled && !!cfg.zalo.pixelId;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/providers/google.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "googleBootstrapScript",
    ()=>googleBootstrapScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
;
function googleBootstrapScript() {
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    const ids = [
        marketingConfig.google.gtagId,
        marketingConfig.google.ga4Id
    ].filter(Boolean);
    const configLines = ids.map((id)=>`gtag('config', '${id}');`).join('\n');
    return `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\nwindow.gtag = gtag;\ngtag('js', new Date());\n${configLines}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/providers/meta.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metaBootstrapScript",
    ()=>metaBootstrapScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
;
function metaBootstrapScript() {
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', '${marketingConfig.meta.pixelId}');\nfbq('track', 'PageView');`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/providers/tiktok.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tiktokBootstrapScript",
    ()=>tiktokBootstrapScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
;
function tiktokBootstrapScript() {
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    return `!function (w, d, t) {\n  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];\n  ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];\n  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};\n  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);\n  ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';\n  ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};\n  ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};\n  var o=document.createElement('script');o.type='text/javascript';o.async=!0;o.src=r+'?sdkid='+e+'&lib='+t;\n  var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};\n  ttq.load('${marketingConfig.tiktok.pixelId}');\n  ttq.page();\n}(window, document, 'ttq');`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/providers/zalo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zaloBootstrapScript",
    ()=>zaloBootstrapScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
;
function zaloBootstrapScript() {
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    return `window.__vuleitsZaloPixelId='${marketingConfig.zalo.pixelId}';`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/marketing/MarketingScripts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketingScripts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$google$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/providers/google.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$meta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/providers/meta.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$tiktok$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/providers/tiktok.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$zalo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/providers/zalo.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function MarketingScripts({ enabledByConsent }) {
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    if (!enabledByConsent || !marketingConfig.enabled) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canLoadGoogle"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "vuleits-google-src",
                        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(marketingConfig.google.gtagId)}`,
                        strategy: "afterInteractive"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "vuleits-google-init",
                        strategy: "afterInteractive",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$google$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["googleBootstrapScript"])()
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : null,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canLoadMeta"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "vuleits-meta-init",
                strategy: "afterInteractive",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$meta$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaBootstrapScript"])()
            }, void 0, false, {
                fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this) : null,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canLoadTiktok"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "vuleits-tiktok-init",
                strategy: "afterInteractive",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$tiktok$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokBootstrapScript"])()
            }, void 0, false, {
                fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this) : null,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canLoadZalo"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    marketingConfig.zalo.scriptUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "vuleits-zalo-src",
                        src: marketingConfig.zalo.scriptUrl,
                        strategy: "afterInteractive"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "vuleits-zalo-init",
                        strategy: "afterInteractive",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$providers$2f$zalo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zaloBootstrapScript"])()
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/marketing/MarketingScripts.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : null
        ]
    }, void 0, true);
}
_c = MarketingScripts;
var _c;
__turbopack_context__.k.register(_c, "MarketingScripts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/marketing/consent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONSENT_KEY",
    ()=>CONSENT_KEY,
    "acceptAllConsent",
    ()=>acceptAllConsent,
    "getConsent",
    ()=>getConsent,
    "openConsentPreferences",
    ()=>openConsentPreferences,
    "rejectMarketingConsent",
    ()=>rejectMarketingConsent,
    "saveConsent",
    ()=>saveConsent
]);
const CONSENT_KEY = 'vuleits-consent-v1';
function getConsent() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function saveConsent(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('vuleits-consent-updated', {
        detail: state
    }));
}
function acceptAllConsent() {
    saveConsent({
        necessary: true,
        analytics: true,
        marketing: true,
        updatedAt: Date.now()
    });
}
function rejectMarketingConsent() {
    saveConsent({
        necessary: true,
        analytics: true,
        marketing: false,
        updatedAt: Date.now()
    });
}
function openConsentPreferences() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent('vuleits-consent-open'));
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/marketing/MarketingManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketingManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$marketing$2f$MarketingScripts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/marketing/MarketingScripts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/consent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function MarketingManager() {
    _s();
    const [consent, setConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cfgReady, setCfgReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketingManager.useEffect": ()=>{
            setConsent((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConsent"])());
            let cancelled = false;
            const loadRuntimeConfig = {
                "MarketingManager.useEffect.loadRuntimeConfig": async ()=>{
                    try {
                        const res = await fetch('/api/marketing-config', {
                            cache: 'no-store'
                        });
                        if (!res.ok || cancelled) return;
                        const data = await res.json();
                        if (!cancelled) (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMarketingOverrides"])(data);
                    } catch  {
                    // keep env defaults
                    } finally{
                        if (!cancelled) setCfgReady(true);
                    }
                }
            }["MarketingManager.useEffect.loadRuntimeConfig"];
            void loadRuntimeConfig();
            const onConsentUpdated = {
                "MarketingManager.useEffect.onConsentUpdated": (e)=>{
                    const detail = e.detail;
                    setConsent(detail);
                }
            }["MarketingManager.useEffect.onConsentUpdated"];
            const onConfigUpdated = {
                "MarketingManager.useEffect.onConfigUpdated": ()=>{
                    void loadRuntimeConfig();
                }
            }["MarketingManager.useEffect.onConfigUpdated"];
            window.addEventListener('vuleits-consent-updated', onConsentUpdated);
            window.addEventListener('vuleits-marketing-config-updated', onConfigUpdated);
            return ({
                "MarketingManager.useEffect": ()=>{
                    cancelled = true;
                    window.removeEventListener('vuleits-consent-updated', onConsentUpdated);
                    window.removeEventListener('vuleits-marketing-config-updated', onConfigUpdated);
                }
            })["MarketingManager.useEffect"];
        }
    }["MarketingManager.useEffect"], []);
    const enabledByConsent = Boolean(consent?.marketing);
    if (!cfgReady) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$marketing$2f$MarketingScripts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        enabledByConsent: enabledByConsent
    }, void 0, false, {
        fileName: "[project]/frontend/components/marketing/MarketingManager.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_s(MarketingManager, "yyFjeL0javYKR1dcNNFsQLS5ySU=");
_c = MarketingManager;
var _c;
__turbopack_context__.k.register(_c, "MarketingManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/marketing/ConsentBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConsentBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/consent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/marketing/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/providers/LocaleProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ConsentBanner() {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const marketingConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMarketingConfig"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsentBanner.useEffect": ()=>{
            if (!marketingConfig.enabled) return;
            setVisible((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConsent"])() == null);
            const onOpen = {
                "ConsentBanner.useEffect.onOpen": ()=>setVisible(true)
            }["ConsentBanner.useEffect.onOpen"];
            window.addEventListener('vuleits-consent-open', onOpen);
            return ({
                "ConsentBanner.useEffect": ()=>window.removeEventListener('vuleits-consent-open', onOpen)
            })["ConsentBanner.useEffect"];
        }
    }["ConsentBanner.useEffect"], []);
    if (!marketingConfig.enabled || !visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 left-4 right-4 z-1000",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-3xl rounded-2xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-white/90",
                    children: t('marketing.consentMessage')
                }, void 0, false, {
                    fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex flex-wrap gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-lg bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-white/90",
                            onClick: ()=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["acceptAllConsent"])();
                                setVisible(false);
                            },
                            children: t('marketing.acceptAll')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-lg border border-white/35 text-white px-3 py-2 text-sm hover:bg-white/10",
                            onClick: ()=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$marketing$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rejectMarketingConsent"])();
                                setVisible(false);
                            },
                            children: t('marketing.rejectMarketing')
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/marketing/ConsentBanner.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(ConsentBanner, "gBVFn2CZrtgIK3TJSadKfK5LejE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$providers$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = ConsentBanner;
var _c;
__turbopack_context__.k.register(_c, "ConsentBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/next/dist/client/script.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _setattributesfromprops = __turbopack_context__.r("[project]/node_modules/next/dist/client/set-attributes-from-props.js [app-client] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)");
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
    if (typeof window !== 'undefined') {
        let head = document.head;
        stylesheets.forEach((stylesheet)=>{
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = stylesheet;
            head.appendChild(link);
        });
    }
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
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/script.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/script.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ae8fc15a._.js.map