import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { MARKETING_CONFIG_SETTING_KEY, parseMarketingConfigJson } from '@/lib/marketingConfig';

export async function GET(req: Request) {
  const auth = await authorize(req, 'uiTexts.read');
  if (auth.error) return auth.error;

  const row = await prisma.siteSetting.findUnique({ where: { key: MARKETING_CONFIG_SETTING_KEY } });
  return NextResponse.json(parseMarketingConfigJson(row?.value ?? null));
}

export async function PUT(req: Request) {
  const auth = await authorize(req, 'uiTexts.update');
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = parseMarketingConfigJson(JSON.stringify(body));

  await prisma.siteSetting.upsert({
    where: { key: MARKETING_CONFIG_SETTING_KEY },
    create: { key: MARKETING_CONFIG_SETTING_KEY, value: JSON.stringify(payload) },
    update: { value: JSON.stringify(payload) },
  });

  return NextResponse.json({ ok: true, config: payload });
}
