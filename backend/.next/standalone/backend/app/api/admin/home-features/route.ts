import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorizeAny } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';

export async function GET(req: Request) {
  const auth = await authorizeAny(req, ['homeFeatures.read', 'banners.read']);
  if ('error' in auth) return auth.error;

  const list = await prisma.homeFeature.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const auth = await authorizeAny(req, ['homeFeatures.create', 'banners.create']);
  if ('error' in auth) return auth.error;

  const body = jsonObjectBody(await req.json());
  const icon = String(body.icon ?? '').trim();
  const title = String(body.title ?? '').trim();
  const description = String(body.description ?? '').trim();
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);

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

