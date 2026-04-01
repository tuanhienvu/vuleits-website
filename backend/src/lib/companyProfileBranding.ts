import { prisma } from '@/lib/prisma';
import { COMPANY_PROFILE_SETTING_KEY, parseCompanyProfileJson, type CompanyProfileData } from '@/lib/companyProfileTypes';

export async function resolveCompanyLogoDisplayUrl(data: CompanyProfileData): Promise<string> {
  if (data.logoMediaId != null) {
    const m = await prisma.media.findUnique({ where: { id: data.logoMediaId }, select: { url: true, mimeType: true } });
    if (m?.url && m.mimeType.startsWith('image/')) return m.url;
  }
  return (data.logoUrl || '').trim();
}

export type PublicCompanyBranding = {
  companyName: string;
  slogan: string;
  logoUrl: string;
};

export async function getPublicCompanyBranding(): Promise<PublicCompanyBranding> {
  const row = await prisma.siteSetting.findUnique({ where: { key: COMPANY_PROFILE_SETTING_KEY } });
  const profile = parseCompanyProfileJson(row?.value ?? null);
  const logoUrl = await resolveCompanyLogoDisplayUrl(profile);
  return {
    companyName: profile.companyName.trim(),
    slogan: profile.slogan.trim(),
    logoUrl,
  };
}
