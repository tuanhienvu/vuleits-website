import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MARKETING_CONFIG_SETTING_KEY, parseMarketingConfigJson } from '@/lib/marketingConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  const row = await prisma.siteSetting.findUnique({ where: { key: MARKETING_CONFIG_SETTING_KEY } });
  const cfg = parseMarketingConfigJson(row?.value ?? null);
  return NextResponse.json(cfg, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
