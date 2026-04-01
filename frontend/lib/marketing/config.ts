export type MarketingConfig = {
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

export type MarketingConfigOverrides = Partial<{
  enabled: boolean;
  google: Partial<MarketingConfig['google']>;
  meta: Partial<MarketingConfig['meta']>;
  tiktok: Partial<MarketingConfig['tiktok']>;
  zalo: Partial<MarketingConfig['zalo']>;
}>;

function env(name: string): string {
  return (process.env[name] || '').trim();
}

function envBool(name: string, fallback = false): boolean {
  const raw = env(name).toLowerCase();
  if (!raw) return fallback;
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

const envMarketingConfig: MarketingConfig = {
  enabled: envBool('NEXT_PUBLIC_MARKETING_ENABLED', false),
  google: {
    enabled: envBool('NEXT_PUBLIC_GOOGLE_ENABLED', false),
    gtagId: env('NEXT_PUBLIC_GTAG_ID'),
    ga4Id: env('NEXT_PUBLIC_GA4_ID'),
    leadConversionLabel: env('NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL'),
    purchaseConversionLabel: env('NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL'),
  },
  meta: {
    enabled: envBool('NEXT_PUBLIC_META_ENABLED', false),
    pixelId: env('NEXT_PUBLIC_META_PIXEL_ID'),
  },
  tiktok: {
    enabled: envBool('NEXT_PUBLIC_TIKTOK_ENABLED', false),
    pixelId: env('NEXT_PUBLIC_TIKTOK_PIXEL_ID'),
  },
  zalo: {
    enabled: envBool('NEXT_PUBLIC_ZALO_ENABLED', false),
    pixelId: env('NEXT_PUBLIC_ZALO_PIXEL_ID'),
    scriptUrl: env('NEXT_PUBLIC_ZALO_SCRIPT_URL'),
  },
};

let runtimeOverrides: MarketingConfigOverrides | null = null;

export function setMarketingOverrides(overrides: MarketingConfigOverrides | null): void {
  runtimeOverrides = overrides;
}

export function getMarketingConfig(): MarketingConfig {
  if (!runtimeOverrides) return envMarketingConfig;
  return {
    enabled: runtimeOverrides.enabled ?? envMarketingConfig.enabled,
    google: {
      ...envMarketingConfig.google,
      ...(runtimeOverrides.google ?? {}),
    },
    meta: {
      ...envMarketingConfig.meta,
      ...(runtimeOverrides.meta ?? {}),
    },
    tiktok: {
      ...envMarketingConfig.tiktok,
      ...(runtimeOverrides.tiktok ?? {}),
    },
    zalo: {
      ...envMarketingConfig.zalo,
      ...(runtimeOverrides.zalo ?? {}),
    },
  };
}

export function canLoadGoogle(): boolean {
  const cfg = getMarketingConfig();
  return cfg.enabled && cfg.google.enabled && !!cfg.google.gtagId;
}
export function canLoadMeta(): boolean {
  const cfg = getMarketingConfig();
  return cfg.enabled && cfg.meta.enabled && !!cfg.meta.pixelId;
}
export function canLoadTiktok(): boolean {
  const cfg = getMarketingConfig();
  return cfg.enabled && cfg.tiktok.enabled && !!cfg.tiktok.pixelId;
}
export function canLoadZalo(): boolean {
  const cfg = getMarketingConfig();
  return cfg.enabled && cfg.zalo.enabled && !!cfg.zalo.pixelId;
}
