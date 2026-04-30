import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  COOKIE_POLICY_SETTING_KEY,
  defaultCookiePolicyPayload,
  parseLegalPageJson,
  toPublicLegalPage,
} from '@/lib/legalPageSetting';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') === 'vi-VN' ? 'vi-VN' : 'en-US';
  const row = await prisma.siteSetting.findUnique({ where: { key: COOKIE_POLICY_SETTING_KEY } });
  const payload = row?.value
    ? parseLegalPageJson(row.value, 'cookie')
    : defaultCookiePolicyPayload();
  const raw = toPublicLegalPage(payload, locale);
  return NextResponse.json(
    {
      ...raw,
      bodyHtml: sanitizeAboutIntroBodyHtml(raw.bodyHtml),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}
