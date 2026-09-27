'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CompanySocialLinks, { type PublicSocialLink } from '@/components/CompanySocialLinks';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { useLocale } from '@/components/providers/LocaleProvider';
import { apiPath } from '@/lib/apiRoutes';

/** Official Ministry of Industry and Trade online registration badge. */
const BO_CONG_THUONG_LOGO = '/images/logobocongthuong.webp';
const BO_CONG_THUONG_PORTAL_URL = 'https://online.gov.vn/';

/** Shared interactive style for footer text links (legal, nav). */
const footerLinkClass =
  'inline-block rounded-sm py-0.5 -my-0.5 text-[color:var(--text-primary)] transition-all duration-200 ease-out ' +
  'hover:text-[color:var(--link-color)] hover:-translate-y-0.5 hover:underline underline-offset-[5px] decoration-2 ' +
  'hover:decoration-[color:var(--link-color)] active:translate-y-0 active:transition-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--link-color)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]';

export default function Footer() {
  const { companyName } = useCompanyBranding();
  const { t, locale } = useLocale();
  const [socialLinks, setSocialLinks] = useState<PublicSocialLink[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('company/contact'));
        const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
        if (cancelled || !data || typeof data !== 'object') return;
        const raw = data.socialLinks;
        if (!Array.isArray(raw)) return;
        const next: PublicSocialLink[] = raw
          .map((row) => {
            if (!row || typeof row !== 'object') return null;
            const r = row as Record<string, unknown>;
            const url = typeof r.url === 'string' ? r.url.trim() : '';
            const type = typeof r.type === 'string' ? r.type : 'other';
            if (!url) return null;
            return { type, url } as PublicSocialLink;
          })
          .filter((x): x is PublicSocialLink => x != null);
        setSocialLinks(next);
      } catch {
        if (!cancelled) setSocialLinks([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="relative z-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="glass p-6 rounded-2xl mb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-start">
              <Link href="/about" prefetch={false} className={footerLinkClass}>
                {t('nav.about')}
              </Link>
              <Link href="/privacy" prefetch={false} className={footerLinkClass}>
                {locale === 'vi-VN' ? 'Bảo mật' : 'Privacy'}
              </Link>
              <Link href="/terms" prefetch={false} className={footerLinkClass}>
                {locale === 'vi-VN' ? 'Điều khoản' : 'Terms'}
              </Link>
              <Link href="/cookies" prefetch={false} className={footerLinkClass}>
                {t('footer.cookiesPolicy')}
              </Link>
              <Link href="/contact" prefetch={false} className={footerLinkClass}>
                {t('nav.contact')}
              </Link>
            </div>

            <div className="flex justify-center">
              {socialLinks.length > 0 ? (
                <CompanySocialLinks links={socialLinks} listClassName="justify-center" />
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-start gap-3 text-left text-sm text-[color:var(--text-primary)]">
              <a
                href={BO_CONG_THUONG_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 rounded-sm bg-white px-2 py-1 transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--link-color)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                aria-label={
                  locale === 'vi-VN'
                    ? 'Thông báo đăng ký với Bộ Công Thương'
                    : 'Registered with the Ministry of Industry and Trade (Vietnam)'
                }
              >
                <Image
                  src={BO_CONG_THUONG_LOGO}
                  alt={
                    locale === 'vi-VN'
                      ? 'Thông báo đăng ký với Bộ Công Thương'
                      : 'Registered with the Ministry of Industry and Trade (Vietnam)'
                  }
                  width={160}
                  height={61}
                  sizes="(max-width: 640px) 120px, 160px"
                  className="h-auto w-[120px] object-contain sm:w-[140px] md:w-[160px]"
                />
              </a>
              <p className="min-w-0">
                &copy; {new Date().getFullYear()}{' '}
                <span className="font-zcool tracking-wide">{companyName}</span>
                {locale === 'vi-VN' ? '. Bảo lưu mọi quyền.' : '. All rights reserved.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
