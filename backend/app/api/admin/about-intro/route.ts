import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import {
  ABOUT_INTRO_SETTING_KEY,
  parseAboutIntroJson,
  serializeAboutIntroPayload,
  type AboutIntroPayload,
} from '@/lib/aboutIntroSetting';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const row = await prisma.siteSetting.findUnique({ where: { key: ABOUT_INTRO_SETTING_KEY } });
  const payload = parseAboutIntroJson(row?.value ?? null);
  return NextResponse.json(payload);
}

export async function PUT(req: Request) {
  const auth = await authorize(req, 'aboutTeam.update');
  if (auth.error) return auth.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const bodyEnRaw = typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 20000).trim() : '';
  const bodyViRaw = typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000).trim() : '';

  const payload: AboutIntroPayload = {
    titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : '',
    titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : '',
    bodyEn: bodyEnRaw ? sanitizeAboutIntroBodyHtml(bodyEnRaw) : '',
    bodyVi: bodyViRaw ? sanitizeAboutIntroBodyHtml(bodyViRaw) : '',
    heroImageUrl: typeof o.heroImageUrl === 'string' ? o.heroImageUrl.slice(0, 2048) : '',
    heroImageAltEn: typeof o.heroImageAltEn === 'string' ? o.heroImageAltEn.slice(0, 200) : '',
    heroImageAltVi: typeof o.heroImageAltVi === 'string' ? o.heroImageAltVi.slice(0, 200) : '',
  };

  await prisma.siteSetting.upsert({
    where: { key: ABOUT_INTRO_SETTING_KEY },
    create: { key: ABOUT_INTRO_SETTING_KEY, value: serializeAboutIntroPayload(payload) },
    update: { value: serializeAboutIntroPayload(payload) },
  });

  return NextResponse.json({ ok: true, ...payload });
}
