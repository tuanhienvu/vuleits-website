'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { publicNavSectionId, publicSectionHref } from '@/lib/navigation/publicNavSection';
import { useLocale } from '@/components/providers/LocaleProvider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { useHospitalityFeatures } from '@/hooks/useHospitalityFeatures';

/**
 * Woox Travel–style public navigation: light bar, amber accents, mobile sheet.
 * Extend `navItems` or `publicNavSection.ts` when adding routes.
 */
export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const currentPage = publicNavSectionId(pathname);
  const { t } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const { features } = useHospitalityFeatures();
  const tagline = slogan || t('nav.tagline');

  const navItems = [
    { id: 'home', label: t('nav.home') },
    ...(features.navStaysEnabled ? [{ id: 'stays', label: t('nav.stays') }] : []),
    ...(features.navBookEnabled ? [{ id: 'book', label: t('nav.book') }] : []),
    { id: 'products', label: t('nav.products') },
    { id: 'about', label: t('nav.about') },
    { id: 'news', label: t('nav.news') },
    ...(features.navServicesEnabled ? [{ id: 'services', label: t('nav.services') }] : []),
    { id: 'contact', label: t('nav.contact') },
  ];

  const linkClass = (id: string) =>
    `relative pb-1 text-sm font-medium transition-colors md:text-base ${
      currentPage === id ? 'text-amber-700' : 'text-slate-700 hover:text-amber-600'
    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-amber-500 after:transition-transform after:duration-300 ${
      currentPage === id ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="woox-container">
        <nav role="navigation" className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            prefetch={false}
            onClick={() => setMobileOpen(false)}
            className="flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={t('nav.home')}
          >
            <BrandingLogo src={logoSrc} alt={`${companyName} logo`} sizes="48px" className="h-11 w-11 shrink-0" priority />
            <div className="hidden min-w-0 sm:block">
              <h2 className="woox-brand-title truncate text-lg font-semibold leading-tight text-slate-900 md:text-xl">
                {companyName}
              </h2>
              <p className="truncate text-xs text-amber-800/90 md:text-sm">{tagline}</p>
            </div>
          </Link>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={t('nav.toggleMenu')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden items-center gap-5 lg:flex lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={publicSectionHref(item.id)}
                prefetch={false}
                aria-current={currentPage === item.id ? 'page' : undefined}
                className={linkClass(item.id)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              prefetch={false}
              className="text-sm font-medium text-slate-600 transition hover:text-amber-700 md:text-base"
            >
              {t('nav.admin')}
            </Link>
            <LocaleSwitcher className="rounded-lg border border-slate-200 bg-white p-1 text-slate-800 hover:bg-slate-50" />
          </div>
        </nav>

        {mobileOpen ? (
          <div className="border-t border-slate-100 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.id + '-m'}
                  href={publicSectionHref(item.id)}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3 py-3 text-base font-medium ${
                    currentPage === item.id ? 'bg-amber-50 text-amber-900' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin/login"
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50"
              >
                {t('nav.admin')}
              </Link>
              <div className="px-2 pt-2">
                <LocaleSwitcher className="w-full justify-start rounded-lg border border-slate-200 bg-white p-2" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
