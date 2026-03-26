import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COMPANY_PROFILE_SETTING_KEY, parseCompanyProfileJson, SOCIAL_PLATFORM_IDS, type SocialPlatformId } from '@/lib/companyProfileTypes';
import { resolvePublicMapEmbedSrc } from '@/lib/googleMapsEmbed';
import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';

function isSocialPlatformId(s: string): s is SocialPlatformId {
  return (SOCIAL_PLATFORM_IDS as readonly string[]).includes(s);
}

export async function GET() {
  const row = await prisma.siteSetting.findUnique({ where: { key: COMPANY_PROFILE_SETTING_KEY } });
  const profile = parseCompanyProfileJson(row?.value ?? null);
  const mapEmbedSrc = resolvePublicMapEmbedSrc(profile.mapEmbedUrl, profile.address);
  const socialLinks = profile.socialLinks
    .map((l) => {
      const url = sanitizePublicHttpUrl(l.url);
      if (!url) return null;
      const type = isSocialPlatformId(l.type) ? l.type : 'other';
      return { type, url };
    })
    .filter((x): x is { type: SocialPlatformId; url: string } => x != null);

  return NextResponse.json(
    {
      companyName: profile.companyName.trim(),
      fullNameVi: profile.fullNameVi.trim(),
      fullNameEn: profile.fullNameEn.trim(),
      address: profile.address.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      hotline: profile.hotline.trim(),
      mapEmbedSrc,
      socialLinks,
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}
