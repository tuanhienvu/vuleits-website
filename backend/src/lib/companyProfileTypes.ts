export const COMPANY_PROFILE_SETTING_KEY = 'company_profile';
export const SOCIAL_PLATFORM_IDS = ['facebook', 'youtube', 'instagram', 'tiktok', 'twitter', 'linkedin', 'telegram', 'github', 'website', 'other'] as const;
export type SocialPlatformId = (typeof SOCIAL_PLATFORM_IDS)[number];

export interface CompanySocialLink {
  type: SocialPlatformId;
  url: string;
}

export interface CompanyProfileData {
  companyName: string;
  fullNameVi: string;
  fullNameEn: string;
  slogan: string;
  address: string;
  logoUrl: string;
  logoMediaId: number | null;
  email: string;
  email2: string;
  phone: string;
  hotline: string;
  mapEmbedUrl: string;
  socialLinks: CompanySocialLink[];
}

export function defaultCompanyProfile(): CompanyProfileData {
  return {
    companyName: '',
    fullNameVi: '',
    fullNameEn: '',
    slogan: '',
    address: '',
    logoUrl: '',
    logoMediaId: null,
    email: '',
    email2: '',
    phone: '',
    hotline: '',
    mapEmbedUrl: '',
    socialLinks: [],
  };
}

function isSocialPlatform(v: string): v is SocialPlatformId {
  return (SOCIAL_PLATFORM_IDS as readonly string[]).includes(v);
}

export function parseCompanyProfileJson(raw: string | null | undefined): CompanyProfileData {
  const base = defaultCompanyProfile();
  if (!raw) return base;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const linksRaw = o.socialLinks;
    const socialLinks: CompanySocialLink[] = Array.isArray(linksRaw)
      ? linksRaw
          .map((item) => {
            if (!item || typeof item !== 'object') return null;
            const r = item as Record<string, unknown>;
            const url = typeof r.url === 'string' ? r.url.trim() : '';
            if (!url) return null;
            const t = typeof r.type === 'string' ? r.type : 'other';
            return { type: isSocialPlatform(t) ? t : 'other', url } satisfies CompanySocialLink;
          })
          .filter((x): x is CompanySocialLink => x != null)
          .slice(0, 30)
      : [];
    return {
      companyName: typeof o.companyName === 'string' ? o.companyName.slice(0, 200) : base.companyName,
      fullNameVi: typeof o.fullNameVi === 'string' ? o.fullNameVi.slice(0, 500) : base.fullNameVi,
      fullNameEn: typeof o.fullNameEn === 'string' ? o.fullNameEn.slice(0, 500) : base.fullNameEn,
      slogan: typeof o.slogan === 'string' ? o.slogan.slice(0, 300) : base.slogan,
      address: typeof o.address === 'string' ? o.address.slice(0, 1000) : base.address,
      logoUrl: typeof o.logoUrl === 'string' ? o.logoUrl.slice(0, 2048) : base.logoUrl,
      logoMediaId:
        typeof o.logoMediaId === 'number' && Number.isFinite(o.logoMediaId)
          ? Math.floor(o.logoMediaId)
          : o.logoMediaId === null
            ? null
            : base.logoMediaId,
      email: typeof o.email === 'string' ? o.email.slice(0, 320) : base.email,
      email2: typeof o.email2 === 'string' ? o.email2.slice(0, 320) : base.email2,
      phone: typeof o.phone === 'string' ? o.phone.slice(0, 64) : base.phone,
      hotline: typeof o.hotline === 'string' ? o.hotline.slice(0, 64) : base.hotline,
      mapEmbedUrl: typeof o.mapEmbedUrl === 'string' ? o.mapEmbedUrl.trim().slice(0, 2048) : base.mapEmbedUrl,
      socialLinks,
    };
  } catch {
    return base;
  }
}
