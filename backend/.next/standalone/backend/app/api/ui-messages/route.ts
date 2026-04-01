import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * Public: all UI message overrides grouped by locale (merged with code defaults on the client).
 */
export async function GET() {
  const rows = await prisma.uiMessage.findMany({
    select: { locale: true, messageKey: true, value: true },
  });

  const out: Record<string, Record<string, string>> = { 'en-US': {}, 'vi-VN': {} };
  for (const r of rows) {
    if (r.locale !== 'en-US' && r.locale !== 'vi-VN') continue;
    out[r.locale]![r.messageKey] = r.value;
  }

  return NextResponse.json(out, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
