import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ABOUT_INTRO_SETTING_KEY, parseAboutIntroJson, toPublicIntro } from '@/lib/aboutIntroSetting';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') === 'vi-VN' ? 'vi-VN' : 'en-US';

  const row = await prisma.siteSetting.findUnique({ where: { key: ABOUT_INTRO_SETTING_KEY } });
  const payload = parseAboutIntroJson(row?.value ?? null);
  const publicIntro = toPublicIntro(payload, locale);

  return NextResponse.json(publicIntro, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
