'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en-US' | 'vi-VN';

type Messages = Record<string, string>;

const messagesByLocale: Record<Locale, Messages> = {
  'en-US': {
    'lang.english': 'English (US)',
    'lang.vietnamese': 'Vietnamese',

    // Public nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.news': 'News',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.tagline': 'Bring Your Success',
    'nav.toggleMenu': 'Toggle menu',

    // Admin common
    'admin.panel': 'Admin Panel',
    'admin.overview': 'Overview',
    'admin.users': 'Users',
    'admin.permissions': 'Permissions',
    'admin.productGroup': 'Product Group',
    'admin.contents': 'Contents',
    'admin.settings': 'Settings',
    'admin.permissionGroup': 'Permission',
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
    'admin.expandSidebar': 'Expand sidebar',
    'admin.collapseSidebar': 'Collapse sidebar',

    // Admin header
    'admin.dashboardTitle': 'Admin Dashboard',
    'admin.dashboardWelcome': 'Welcome back! Manage your VULE ITS content.',
    'admin.logout': 'Logout',
  },
  'vi-VN': {
    'lang.english': 'Tiếng Anh (Mỹ)',
    'lang.vietnamese': 'Tiếng Việt',

    // Public nav
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.products': 'Sản phẩm',
    'nav.news': 'Tin tức',
    'nav.services': 'Dịch vụ',
    'nav.contact': 'Liên hệ',
    'nav.admin': 'Quản trị',
    'nav.tagline': 'Đưa bạn đến thành công',
    'nav.toggleMenu': 'Mở/đóng menu',

    // Admin common
    'admin.panel': 'Bảng quản trị',
    'admin.overview': 'Tổng quan',
    'admin.users': 'Người dùng',
    'admin.permissions': 'Phân quyền',
    'admin.productGroup': 'Nhóm sản phẩm',
    'admin.contents': 'Nội dung',
    'admin.settings': 'Cài đặt',
    'admin.permissionGroup': 'Quyền hạn',
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
    'admin.expandSidebar': 'Mở rộng thanh bên',
    'admin.collapseSidebar': 'Thu gọn thanh bên',

    // Admin header
    'admin.dashboardTitle': 'Bảng điều khiển',
    'admin.dashboardWelcome': 'Chào mừng trở lại! Quản lý nội dung VULE ITS.',
    'admin.logout': 'Đăng xuất',
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'app_locale';

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
      t: (key) => {
        const table = messagesByLocale[locale] ?? messagesByLocale['en-US'];
        return table[key] ?? messagesByLocale['en-US'][key] ?? key;
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

