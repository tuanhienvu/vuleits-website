'use client';

import { useEffect, useState } from 'react';
import MarketingScripts from '@/components/marketing/MarketingScripts';
import { getConsent, type ConsentState } from '@/lib/marketing/consent';
import { setMarketingOverrides, type MarketingConfigOverrides } from '@/lib/marketing/config';

export default function MarketingManager() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [cfgReady, setCfgReady] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
    let cancelled = false;
    const loadRuntimeConfig = async () => {
      try {
        const res = await fetch('/api/marketing-config', { cache: 'no-store' });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as MarketingConfigOverrides;
        if (!cancelled) setMarketingOverrides(data);
      } catch {
        // keep env defaults
      } finally {
        if (!cancelled) setCfgReady(true);
      }
    };
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
