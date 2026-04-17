'use client';

import { useEffect, useState } from 'react';
import MarketingScripts from '@/components/marketing/MarketingScripts';
import { getConsent, type ConsentState } from '@/lib/marketing/consent';
import { setMarketingOverrides, type MarketingConfigOverrides } from '@/lib/marketing/config';
import { apiPath } from '@/lib/apiRoutes';

type MarketingCachePayload = { ts: number; data: MarketingConfigOverrides };
const MARKETING_CACHE_KEY = 'vuleits:marketing-config-cache:v1';
const MARKETING_TTL_MS = 5 * 60 * 1000;

export default function MarketingManager() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [cfgReady, setCfgReady] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
    let cancelled = false;
    const loadRuntimeConfig = async () => {
      try {
        const res = await fetch(apiPath('marketing-config'));
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as MarketingConfigOverrides;
        if (!cancelled) {
          setMarketingOverrides(data);
          try {
            const payload: MarketingCachePayload = { ts: Date.now(), data };
            window.localStorage.setItem(MARKETING_CACHE_KEY, JSON.stringify(payload));
          } catch {
            // ignore storage errors
          }
        }
      } catch {
        // keep env defaults
      } finally {
        if (!cancelled) setCfgReady(true);
      }
    };
    try {
      const raw = window.localStorage.getItem(MARKETING_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as MarketingCachePayload;
        if (Date.now() - cached.ts < MARKETING_TTL_MS && cached.data) {
          setMarketingOverrides(cached.data);
          setCfgReady(true);
        }
      }
    } catch {
      // ignore cache parse/storage errors
    }
    void loadRuntimeConfig();
    const onConsentUpdated = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsent(detail);
    };
    const onConfigUpdated = () => {
      void loadRuntimeConfig();
    };
    window.addEventListener('vuleits-consent-updated', onConsentUpdated);
    window.addEventListener('vuleits-marketing-config-updated', onConfigUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener('vuleits-consent-updated', onConsentUpdated);
      window.removeEventListener('vuleits-marketing-config-updated', onConfigUpdated);
    };
  }, []);

  const enabledByConsent = Boolean(consent?.marketing);
  if (!cfgReady) return null;
  return <MarketingScripts enabledByConsent={enabledByConsent} />;
}
