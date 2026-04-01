import { getMarketingConfig } from '@/lib/marketing/config';

export function googleBootstrapScript(): string {
  const marketingConfig = getMarketingConfig();
  const ids = [marketingConfig.google.gtagId, marketingConfig.google.ga4Id].filter(Boolean);
  const configLines = ids.map((id) => `gtag('config', '${id}');`).join('\n');
  return `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\nwindow.gtag = gtag;\ngtag('js', new Date());\n${configLines}`;
}
