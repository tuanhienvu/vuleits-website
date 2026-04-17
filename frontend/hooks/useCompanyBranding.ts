'use client';

import { useEffect, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';

export type CompanyBrandingPayload = {
  companyName: string;
  slogan: string;
  logoUrl: string;
};

export const DEFAULT_BRAND_LOGO = '/favicon.ico';
export const FALLBACK_COMPANY_NAME = 'VULE ITS';

const EMPTY_BRANDING: CompanyBrandingPayload = { companyName: '', slogan: '', logoUrl: '' };
let brandingCache: CompanyBrandingPayload | null = null;
let brandingRequest: Promise<CompanyBrandingPayload> | null = null;

async function loadCompanyBranding(): Promise<CompanyBrandingPayload> {
  if (brandingCache) return brandingCache;
  if (!brandingRequest) {
    brandingRequest = (async () => {
      try {
        const res = await fetch(apiPath('company/branding'), { cache: 'no-store' });
        if (!res.ok) return EMPTY_BRANDING;
        const j = (await res.json()) as Record<string, unknown>;
        const rawLogo = typeof j.logoUrl === 'string' ? j.logoUrl : '';
        return {
          companyName: typeof j.companyName === 'string' ? j.companyName : '',
          slogan: typeof j.slogan === 'string' ? j.slogan : '',
          logoUrl: normalizePublicAssetUrlForBrowser(rawLogo),
        };
      } catch {
        return EMPTY_BRANDING;
      }
    })();
  }
  const loaded = await brandingRequest;
  brandingCache = loaded;
  return loaded;
}

export function useCompanyBranding() {
  const [payload, setPayload] = useState<CompanyBrandingPayload | null>(brandingCache);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const loaded = await loadCompanyBranding();
      if (!cancelled) setPayload(loaded);
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
