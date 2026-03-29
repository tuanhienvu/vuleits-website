'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en-US' | 'vi-VN';

type Messages = Record<string, string>;

// --- Message catalogs (en-US, vi-VN): all UI copy for t() ---

const messagesByLocale: Record<Locale, Messages> = {
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
    'home.heroIntro':
      'With the motto "High efficiency, low cost, and sustainable development," we are striving every day to prove ourselves and maintain the trust and confidence of our customers.',

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
    'admin.aboutUs': 'About Us',
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
    'admin.mapEmbedHint':
      'Optional. In Google Maps: Share → Embed a map → copy only the iframe src URL. If empty, the Contact page map uses your Address.',
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

    'admin.aboutUsPageSubtitle':
      'Vision, intro copy, and hero image for the public About page. Separate paragraphs with a blank line.',
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
    'contact.visitOurSocial': 'Visit our {{name}} (opens in new tab)',
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
    'home.heroIntro':
      'Với phương châm "Hiệu quả cao, chi phí thấp và phát triển bền vững", chúng tôi mỗi ngày đều nỗ lực để khẳng định năng lực và giữ vững niềm tin của khách hàng.',

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
    'admin.aboutUs': 'Giới thiệu',
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
    'admin.mapEmbedHint':
      'Tùy chọn. Trên Google Maps: Chia sẻ → Nhúng bản đồ → chỉ sao chép URL trong thuộc tính src của iframe. Để trống thì trang Liên hệ dùng Địa chỉ để hiển thị bản đồ.',
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

    'admin.aboutUsPageSubtitle':
      'Tầm nhìn, nội dung giới thiệu và ảnh hero cho trang Giới thiệu công khai. Ngăn cách đoạn bằng một dòng trống.',
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
    'contact.visitOurSocial': 'Mở {{name}} (tab mới)',
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'app_locale';

// --- LocaleProvider: localStorage + document.lang + t() interpolation ---

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en-US');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved === 'en-US' || saved === 'vi-VN') {
      // Persisted locale is only available after mount; avoids SSR/localStorage mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage after first paint
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, locale);
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (next) => setLocaleState(next),
      t: (key, vars) => {
        const table = messagesByLocale[locale] ?? messagesByLocale['en-US'];
        let s = table[key] ?? messagesByLocale['en-US'][key] ?? key;
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            s = s.split(`{{${k}}}`).join(v);
          }
        }
        return s;
      },
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return ctx;
}

