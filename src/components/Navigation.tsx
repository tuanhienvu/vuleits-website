'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  // ==================== STATE MANAGEMENT ==================== 
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { t } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const tagline = slogan || t('nav.tagline');

  // ==================== NAVIGATION ITEMS CONFIG ====================
  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'products', label: t('nav.products') },
    { id: 'news', label: t('nav.news') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  // ==================== MAIN RENDER ==================== 
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav role="navigation" className="glass flex items-center justify-between p-4 my-4 rounded-2xl relative">
          {/* ==================== LOGO & BRANDING AREA [SEARCH: LOGO, BRANDING] ==================== */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              setMobileOpen(false);
            }}
            className="flex items-center gap-4 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={t('nav.home')}
          >
            <BrandingLogo
              src={logoSrc}
              alt={`${companyName} logo`}
              sizes="48px"
              className="w-12 h-12 shrink-0"
              priority
            />
            <div className="hidden lg:block min-w-0">
              <h2 className="text-white font-semibold text-xl leading-tight font-zcool tracking-wide truncate">
                {companyName}
              </h2>
              <p className="text-white/70 text-sm font-zcool tracking-wide truncate">{tagline}</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          {/* ==================== MOBILE MENU TOGGLE BUTTON [SEARCH: MOBILE, TOGGLE] ==================== */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t('nav.toggleMenu')}
              className="pt-2 pb-2 px-4 pr-4 rounded-md bg-white/10 text-white"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* ==================== DESKTOP NAVIGATION MENU AREA [SEARCH: DESKTOP, NAVLINKS] ==================== */}
          <div className="hidden lg:flex gap-4 md:gap-6 items-center">
            {/* ========== NAVIGATION LINKS ========== */}
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                aria-current={currentPage === item.id ? 'page' : undefined}
                className={`text-white font-medium transition-all duration-300 pb-2 text-sm md:text-base ${
                  currentPage === item.id
                    ? 'border-b-2 border-white'
                    : 'hover:border-b-2 hover:border-white/50'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* ========== ADMIN LOGIN BUTTON (same style as nav links) ========== */}
            <button
              type="button"
              onClick={() => router.push('/admin/login')}
              className="text-white font-medium transition-all duration-300 pb-2 text-sm md:text-base hover:border-b-2 hover:border-white/50"
            >
              {t('nav.admin')}
            </button>

            <LocaleSwitcher className="text-white px-2 py-1.5 rounded-lg text-sm hover:bg-white/10" />
          </div>

          {/* ==================== MOBILE MENU PANEL [SEARCH: MOBILE, MENU, DROPDOWN] ==================== */}
          {mobileOpen && (
            <div className="lg:hidden absolute left-4 right-4 top-full mt-2 bg-[#071024]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex flex-col gap-3">
                {/* ========== MOBILE NAVIGATION LINKS ========== */}
                {navItems.map((item) => (
                  <a
                    key={item.id + '-m'}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.id);
                      setMobileOpen(false);
                    }}
                    className={`text-white font-medium transition-all duration-200 py-2 px-3 rounded ${
                      currentPage === item.id ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                {/* ========== MOBILE ADMIN BUTTON (same style as nav links) ========== */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push('/admin/login');
                  }}
                  className="w-full text-left text-white font-medium transition-all duration-200 py-2 px-3 rounded hover:bg-white/5"
                >
                  {t('nav.admin')}
                </button>
                <LocaleSwitcher className="w-full text-white px-3 py-2 rounded-lg text-sm hover:bg-white/10 justify-start" />
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
