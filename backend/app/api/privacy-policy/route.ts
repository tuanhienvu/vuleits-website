import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  PRIVACY_POLICY_SETTING_KEY,
  defaultPrivacyPolicyPayload,
  parseLegalPageJson,
  toPublicLegalPage,
} from '@/lib/legalPageSetting';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') === 'vi-VN' ? 'vi-VN' : 'en-US';
  const row = await prisma.siteSetting.findUnique({ where: { key: PRIVACY_POLICY_SETTING_KEY } });
  const payload = row?.value
    ? parseLegalPageJson(row.value, 'privacy')
    : defaultPrivacyPolicyPayload();
  const raw = toPublicLegalPage(payload, locale);
  return NextResponse.json(
    {
      ...raw,
      bodyHtml: sanitizeAboutIntroBodyHtml(raw.bodyHtml),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}

