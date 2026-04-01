import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resolveCompanyLogoDisplayUrl } from '@/lib/companyProfileBranding';
import {
  COMPANY_PROFILE_SETTING_KEY,
  defaultCompanyProfile,
  parseCompanyProfileJson,
  type CompanyProfileData,
} from '@/lib/companyProfileTypes';
import { requireCompanyProfileAdmin } from '@/lib/companyProfileAccess';
import { isAllowedGoogleMapsEmbedUrl } from '@/lib/googleMapsEmbed';

export async function GET(req: Request) {
  const gate = await requireCompanyProfileAdmin(req);
  if ('error' in gate) return gate.error;

  const row = await prisma.siteSetting.findUnique({ where: { key: COMPANY_PROFILE_SETTING_KEY } });
  const profile = parseCompanyProfileJson(row?.value ?? null);
  const logoDisplayUrl = await resolveCompanyLogoDisplayUrl(profile);

  return NextResponse.json({ profile, logoDisplayUrl });
}

function bodyToProfile(body: Record<string, unknown>): CompanyProfileData {
  const base = defaultCompanyProfile();
  const logoMediaRaw = body.logoMediaId;
  let logoMediaId: number | null = null;

  if (logoMediaRaw === null || logoMediaRaw === '') logoMediaId = null;
  else {
    const n = typeof logoMediaRaw === 'number' ? logoMediaRaw : Number(logoMediaRaw);
    if (Number.isFinite(n)) logoMediaId = Math.floor(n);
  }

  const merged = {
    ...base,
    companyName: typeof body.companyName === 'string' ? body.companyName.trim().slice(0, 200) : base.companyName,
    fullNameVi: typeof body.fullNameVi === 'string' ? body.fullNameVi.trim().slice(0, 500) : base.fullNameVi,
    fullNameEn: typeof body.fullNameEn === 'string' ? body.fullNameEn.trim().slice(0, 500) : base.fullNameEn,
    slogan: typeof body.slogan === 'string' ? body.slogan.trim().slice(0, 300) : base.slogan,
    address: typeof body.address === 'string' ? body.address.trim().slice(0, 1000) : base.address,
    logoUrl: typeof body.logoUrl === 'string' ? body.logoUrl.trim().slice(0, 2048) : base.logoUrl,
    logoMediaId,
    email: typeof body.email === 'string' ? body.email.trim().slice(0, 320) : base.email,
    email2: typeof body.email2 === 'string' ? body.email2.trim().slice(0, 320) : base.email2,
    phone: typeof body.phone === 'string' ? body.phone.trim().slice(0, 64) : base.phone,
    hotline: typeof body.hotline === 'string' ? body.hotline.trim().slice(0, 64) : base.hotline,
    mapEmbedUrl: typeof body.mapEmbedUrl === 'string' ? body.mapEmbedUrl.trim().slice(0, 2048) : base.mapEmbedUrl,
  };

  // Parse/sanitize against schema defaults (including socials normalization).
  return parseCompanyProfileJson(JSON.stringify({ ...merged, socialLinks: body.socialLinks ?? [] }));
}

export async function PUT(req: Request) {
  const gate = await requireCompanyProfileAdmin(req);
  if ('error' in gate) return gate.error;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const profile = bodyToProfile(body);

  if (profile.mapEmbedUrl.trim() && !isAllowedGoogleMapsEmbedUrl(profile.mapEmbedUrl)) {
    return NextResponse.json(
      { error: 'Invalid Google Maps embed URL. Use Share → Embed a map, or leave empty to use Address.' },
      { status: 400 },
    );
  }

  if (profile.logoMediaId != null) {
    const m = await prisma.media.findUnique({ where: { id: profile.logoMediaId } });
    if (!m) {
      return NextResponse.json({ error: 'Invalid logo media id' }, { status: 400 });
    }
  }

  await prisma.siteSetting.upsert({
    where: { key: COMPANY_PROFILE_SETTING_KEY },
    create: { key: COMPANY_PROFILE_SETTING_KEY, value: JSON.stringify(profile) },
    update: { value: JSON.stringify(profile) },
  });

  const logoDisplayUrl = await resolveCompanyLogoDisplayUrl(profile);
  return NextResponse.json({ ok: true, profile, logoDisplayUrl });
}

