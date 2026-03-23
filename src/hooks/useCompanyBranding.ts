'use client';

import { useEffect, useState } from 'react';

export type CompanyBrandingPayload = {
  companyName: string;
  slogan: string;
  logoUrl: string;
};

export const DEFAULT_BRAND_LOGO = '/Logo.jpg';
export const FALLBACK_COMPANY_NAME = 'VULE ITS';

export function useCompanyBranding() {
  const [payload, setPayload] = useState<CompanyBrandingPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/company/branding');
        if (!res.ok || cancelled) return;
        const j = (await res.json()) as Record<string, unknown>;
        if (cancelled) return;
        setPayload({
          companyName: typeof j.companyName === 'string' ? j.companyName : '',
          slogan: typeof j.slogan === 'string' ? j.slogan : '',
          logoUrl: typeof j.logoUrl === 'string' ? j.logoUrl : '',
        });
      } catch {
        if (!cancelled) setPayload({ companyName: '', slogan: '', logoUrl: '' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const logoSrc = (payload?.logoUrl || '').trim() || DEFAULT_BRAND_LOGO;
  const companyName = (payload?.companyName || '').trim() || FALLBACK_COMPANY_NAME;
  const slogan = (payload?.slogan || '').trim();

  return { logoSrc, companyName, slogan, loaded: payload !== null };
}
