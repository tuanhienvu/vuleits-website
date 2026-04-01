export const MARKETING_CONFIG_SETTING_KEY = 'marketing_config';

export type MarketingConfigPayload = {
  enabled: boolean;
  google: {
    enabled: boolean;
    gtagId: string;
    ga4Id: string;
    leadConversionLabel: string;
    purchaseConversionLabel: string;
  };
  meta: { enabled: boolean; pixelId: string };
  tiktok: { enabled: boolean; pixelId: string };
  zalo: { enabled: boolean; pixelId: string; scriptUrl: string };
};

const emptyConfig: MarketingConfigPayload = {
  enabled: false,
  google: { enabled: false, gtagId: '', ga4Id: '', leadConversionLabel: '', purchaseConversionLabel: '' },
  meta: { enabled: false, pixelId: '' },
  tiktok: { enabled: false, pixelId: '' },
  zalo: { enabled: false, pixelId: '', scriptUrl: '' },
};

function readBool(v: unknown, fallback: boolean): boolean {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const x = v.trim().toLowerCase();
    if (x === 'true' || x === '1' || x === 'yes' || x === 'on') return true;
    if (x === 'false' || x === '0' || x === 'no' || x === 'off') return false;
  }
  return fallback;
}

function readStr(v: unknown, max = 400): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export function parseMarketingConfigJson(raw: string | null | undefined): MarketingConfigPayload {
  if (!raw) return { ...emptyConfig };
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const google = (data.google as Record<string, unknown> | undefined) ?? {};
    const meta = (data.meta as Record<string, unknown> | undefined) ?? {};
    const tiktok = (data.tiktok as Record<string, unknown> | undefined) ?? {};
    const zalo = (data.zalo as Record<string, unknown> | undefined) ?? {};
    return {
      enabled: readBool(data.enabled, false),
      google: {
        enabled: readBool(google.enabled, false),
        gtagId: readStr(google.gtagId, 120),
        ga4Id: readStr(google.ga4Id, 120),
        leadConversionLabel: readStr(google.leadConversionLabel, 180),
        purchaseConversionLabel: readStr(google.purchaseConversionLabel, 180),
      },
      meta: {
        enabled: readBool(meta.enabled, false),
        pixelId: readStr(meta.pixelId, 180),
      },
      tiktok: {
        enabled: readBool(tiktok.enabled, false),
        pixelId: readStr(tiktok.pixelId, 180),
      },
      zalo: {
        enabled: readBool(zalo.enabled, false),
        pixelId: readStr(zalo.pixelId, 180),
        scriptUrl: readStr(zalo.scriptUrl, 2048),
      },
    };
  } catch {
    return { ...emptyConfig };
  }
}
