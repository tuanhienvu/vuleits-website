import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

export async function GET() {
  const list = await prisma.homeFeature.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    select: { id: true, icon: true, title: true, description: true },
  });

  return NextResponse.json(
    (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      description: sanitizeAboutIntroBodyHtml(item.description ?? ''),
    })),
  );
}

