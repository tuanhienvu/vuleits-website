import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const auth = await authorize(req, 'homeFeatures.read');
  if (auth.error) return auth.error;

  const list = await prisma.homeFeature.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'homeFeatures.create');
  if (auth.error) return auth.error;

  const body = await req.json();
  const icon = String((body as any).icon || '').trim();
  const title = String((body as any).title || '').trim();
  const description = String((body as any).description || '').trim();
  const order = (body as any).order === undefined || (body as any).order === null ? 0 : Number((body as any).order);
  const isActive = (body as any).isActive === undefined ? true : Boolean((body as any).isActive);

  if (!icon || !title || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (!Number.isFinite(order)) {
    return NextResponse.json({ error: 'Invalid order' }, { status: 400 });
  }

  const created = await prisma.homeFeature.create({
    data: { icon, title, description, order, isActive },
  });

  return NextResponse.json({ ok: true, feature: created });
}

