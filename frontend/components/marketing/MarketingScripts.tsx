'use client';

import Script from 'next/script';
import { canLoadGoogle, canLoadMeta, canLoadTiktok, canLoadZalo, getMarketingConfig } from '@/lib/marketing/config';
import { googleBootstrapScript } from '@/lib/marketing/providers/google';
import { metaBootstrapScript } from '@/lib/marketing/providers/meta';
import { tiktokBootstrapScript } from '@/lib/marketing/providers/tiktok';
import { zaloBootstrapScript } from '@/lib/marketing/providers/zalo';

export default function MarketingScripts({ enabledByConsent }: { enabledByConsent: boolean }) {
  const marketingConfig = getMarketingConfig();
  if (!enabledByConsent || !marketingConfig.enabled) return null;

  return (
    <>
      {canLoadGoogle() ? (
        <>
          <Script
            id="vuleits-google-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(marketingConfig.google.gtagId)}`}
            strategy="afterInteractive"
          />
          <Script id="vuleits-google-init" strategy="afterInteractive">
            {googleBootstrapScript()}
          </Script>
        </>
      ) : null}

      {canLoadMeta() ? (
        <Script id="vuleits-meta-init" strategy="afterInteractive">
          {metaBootstrapScript()}
        </Script>
      ) : null}

      {canLoadTiktok() ? (
        <Script id="vuleits-tiktok-init" strategy="afterInteractive">
          {tiktokBootstrapScript()}
        </Script>
      ) : null}

      {canLoadZalo() ? (
        <>
          {marketingConfig.zalo.scriptUrl ? (
            <Script id="vuleits-zalo-src" src={marketingConfig.zalo.scriptUrl} strategy="afterInteractive" />
          ) : null}
          <Script id="vuleits-zalo-init" strategy="afterInteractive">
            {zaloBootstrapScript()}
          </Script>
        </>
      ) : null}
    </>
  );
}
