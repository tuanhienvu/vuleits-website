'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { publicNavSectionId, publicSectionHref } from '@/lib/navigation/publicNavSection';
import { useLocale } from '@/components/providers/LocaleProvider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const currentPage = publicNavSectionId(pathname);
  const { t } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const tagline = slogan || t('nav.tagline');

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'products', label: t('nav.products') },
    { id: 'news', label: t('nav.news') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav
          role="navigation"
          className="glass flex items-center justify-between p-4 my-4 rounded-2xl relative transition-colors duration-200"
        >
          <Link
            href="/"
            prefetch={false}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-4 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)]/30"
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
              <h2 className="font-semibold text-xl leading-tight font-zcool tracking-wide truncate text-[color:var(--text-primary)]">
                {companyName}
              </h2>
              <p className="nav-brand-slogan text-sm font-zcool tracking-wide truncate text-[color:var(--brand-accent)]">
                {tagline}
              </p>
            </div>
          </Link>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={t('nav.toggleMenu')}
              className={`uiverse-mobile-menu-btn ${mobileOpen ? 'is-open' : ''}`}
            >
              <span className="uiverse-mobile-menu-lines" aria-hidden="true">
                <span className="uiverse-mobile-menu-line top" />
                <span className="uiverse-mobile-menu-line mid" />
                <span className="uiverse-mobile-menu-line bot" />
              </span>
            </button>
          </div>

          <div className="hidden lg:flex gap-4 md:gap-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={publicSectionHref(item.id)}
                prefetch={false}
                aria-current={currentPage === item.id ? 'page' : undefined}
                className={`relative font-medium pb-2 text-sm md:text-base text-[color:var(--text-primary)] transition-colors duration-300 after:pointer-events-none after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-(--nav-active-border) after:transition-transform after:duration-300 after:ease-out ${
                  currentPage === item.id
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/admin/login"
              prefetch={false}
              className="relative cursor-pointer font-medium pb-2 text-sm md:text-base text-[color:var(--text-primary)] transition-colors duration-300 after:pointer-events-none after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-(--nav-active-border) after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              {t('nav.admin')}
            </Link>

            <LocaleSwitcher className="px-2 py-1.5 rounded-lg text-sm border border-[color:var(--locale-switch-border)] bg-[color:var(--locale-switch-bg)] hover:bg-[color:var(--locale-switch-bg-hover)]" />
          </div>

          {mobileOpen && (
            <div className="lg:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl p-4 backdrop-blur-md border border-[color:var(--mobile-nav-panel-border)] bg-[color:var(--mobile-nav-panel-bg)]">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.id + '-m'}
                    href={publicSectionHref(item.id)}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className={`font-medium transition-all duration-200 py-2 px-3 rounded-lg border text-[color:var(--text-primary)] ${
                      currentPage === item.id
                        ? 'bg-[color:color-mix(in_srgb,var(--text-primary)_12%,transparent)] border-[color:color-mix(in_srgb,var(--text-primary)_22%,transparent)]'
                        : 'bg-transparent border-transparent hover:bg-[color:color-mix(in_srgb,var(--text-primary)_8%,transparent)] hover:border-[color:color-mix(in_srgb,var(--text-primary)_14%,transparent)] active:scale-[0.99]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/admin/login"
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full cursor-pointer text-left font-medium transition-all duration-200 py-2 px-3 rounded-lg border border-transparent text-[color:var(--text-primary)] hover:bg-[color:color-mix(in_srgb,var(--text-primary)_8%,transparent)] hover:border-[color:color-mix(in_srgb,var(--text-primary)_14%,transparent)] active:scale-[0.99]"
                >
                  {t('nav.admin')}
                </Link>
                <LocaleSwitcher className="w-full px-3 py-2 rounded-lg text-sm border border-[color:var(--locale-switch-border)] bg-[color:var(--locale-switch-bg)] hover:bg-[color:var(--locale-switch-bg-hover)] justify-start" />
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
