'use client';

import { useEffect, useState } from 'react';
import { acceptAllConsent, getConsent, rejectMarketingConsent } from '@/lib/marketing/consent';
import { getMarketingConfig } from '@/lib/marketing/config';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function ConsentBanner() {
  const marketingConfig = getMarketingConfig();
  const [visible, setVisible] = useState(() => marketingConfig.enabled && getConsent() == null);
  const { t } = useLocale();

  useEffect(() => {
    if (!marketingConfig.enabled) return;
    const onOpen = () => setVisible(true);
    window.addEventListener('vuleits-consent-open', onOpen);
    return () => window.removeEventListener('vuleits-consent-open', onOpen);
  }, [marketingConfig.enabled]);

  if (!marketingConfig.enabled || !visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-1000">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur">
        <p className="text-sm text-white/90">
          {t('marketing.consentMessage')}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-white/90"
            onClick={() => {
              acceptAllConsent();
              setVisible(false);
            }}
          >
            {t('marketing.acceptAll')}
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/35 text-white px-3 py-2 text-sm hover:bg-white/10"
            onClick={() => {
              rejectMarketingConsent();
              setVisible(false);
            }}
          >
            {t('marketing.rejectMarketing')}
          </button>
        </div>
      </div>
    </div>
  );
}
