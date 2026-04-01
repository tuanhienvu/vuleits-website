import { getMarketingConfig } from '@/lib/marketing/config';

export function zaloBootstrapScript(): string {
  const marketingConfig = getMarketingConfig();
  return `window.__vuleitsZaloPixelId='${marketingConfig.zalo.pixelId}';`;
}
