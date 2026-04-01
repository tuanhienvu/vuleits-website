import { getMarketingConfig } from '@/lib/marketing/config';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void };
    _ztr?: (...args: unknown[]) => void;
  }
}

export function trackLead(value = 0, currency = 'USD'): void {
  const marketingConfig = getMarketingConfig();
  if (marketingConfig.google.enabled && marketingConfig.google.gtagId) {
    const label = marketingConfig.google.leadConversionLabel;
    if (label) {
      window.gtag?.('event', 'conversion', {
        send_to: `${marketingConfig.google.gtagId}/${label}`,
        value,
        currency,
      });
    } else {
      window.gtag?.('event', 'generate_lead', { value, currency });
    }
  }
  if (marketingConfig.meta.enabled) {
    window.fbq?.('track', 'Lead', { value, currency });
  }
  if (marketingConfig.tiktok.enabled) {
    window.ttq?.track?.('SubmitForm', { value, currency });
  }
}

export function trackPurchase(value: number, currency = 'USD'): void {
  const marketingConfig = getMarketingConfig();
  if (marketingConfig.google.enabled && marketingConfig.google.gtagId) {
    const label = marketingConfig.google.purchaseConversionLabel;
    if (label) {
      window.gtag?.('event', 'conversion', {
        send_to: `${marketingConfig.google.gtagId}/${label}`,
        value,
        currency,
      });
    } else {
      window.gtag?.('event', 'purchase', { value, currency });
    }
  }
  if (marketingConfig.meta.enabled) {
    window.fbq?.('track', 'Purchase', { value, currency });
  }
  if (marketingConfig.tiktok.enabled) {
    window.ttq?.track?.('CompletePayment', { value, currency });
  }
}
