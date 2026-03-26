'use client';

import { useEffect, useState } from 'react';
import CompanySocialLinks, { type PublicSocialLink } from '@/components/CompanySocialLinks';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const { companyName } = useCompanyBranding();
  const [socialLinks, setSocialLinks] = useState<PublicSocialLink[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/company/contact');
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
            {/* ==================== FOOTER LINKS AREA ==================== */}
            <div className="flex gap-6 flex-wrap justify-center md:justify-start text-sm">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-white hover:text-white/80 transition-colors">About</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }} className="text-white hover:text-white/80 transition-colors">Privacy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('terms'); }} className="text-white hover:text-white/80 transition-colors">Terms</a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">Sitemap</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className="text-white hover:text-white/80 transition-colors">Contact</a>
            </div>

            {socialLinks.length > 0 ? (
              <div className="flex justify-center md:flex-1 md:min-w-0">
                <CompanySocialLinks links={socialLinks} listClassName="justify-center" />
              </div>
            ) : null}

            {/* ==================== COPYRIGHT & INFO AREA ==================== */}
            <div className="text-white text-sm text-center md:text-right md:shrink-0">
              <p>
                &copy; {new Date().getFullYear()}{' '}
                <span className="font-zcool tracking-wide">{companyName}</span>
                . All rights reserved.
              </p>
              {/* <p className="text-white/70">Powered by modern web technologies</p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
