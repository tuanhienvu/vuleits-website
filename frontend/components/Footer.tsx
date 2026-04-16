'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CompanySocialLinks, { type PublicSocialLink } from '@/components/CompanySocialLinks';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { openConsentPreferences } from '@/lib/marketing/consent';
import { useLocale } from '@/components/providers/LocaleProvider';
import { apiPath } from '@/lib/apiRoutes';

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-6 flex-wrap justify-center md:justify-start text-sm">
              <Link
                href="/about"
                prefetch={false}
                className="text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/privacy"
                prefetch={false}
                className="text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {locale === 'vi-VN' ? 'Bảo mật' : 'Privacy'}
              </Link>
              <Link
                href="/terms"
                prefetch={false}
                className="text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {locale === 'vi-VN' ? 'Điều khoản' : 'Terms'}
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openConsentPreferences();
                }}
                className="text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {t('footer.manageCookies')}
              </a>
              <Link
                href="/contact"
                prefetch={false}
                className="text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {t('nav.contact')}
              </Link>
            </div>

            {socialLinks.length > 0 ? (
              <div className="flex justify-center md:flex-1 md:min-w-0">
                <CompanySocialLinks links={socialLinks} listClassName="justify-center" />
              </div>
            ) : null}

            <div className="text-sm text-center md:text-right md:shrink-0 text-[color:var(--text-primary)]">
              <p>
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
