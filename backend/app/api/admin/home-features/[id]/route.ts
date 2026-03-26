import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'homeFeatures.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const feature = await prisma.homeFeature.findUnique({ where: { id } });
  if (!feature) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(feature);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'homeFeatures.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const data: {
    icon?: string;
    title?: string;
    description?: string;
    order?: number;
    isActive?: boolean;
  } = {};

  if ((body as any).icon !== undefined) data.icon = String((body as any).icon || '').trim();
  if ((body as any).title !== undefined) data.title = String((body as any).title || '').trim();
  if ((body as any).description !== undefined) data.description = String((body as any).description || '').trim();
  if ((body as any).order !== undefined) data.order = Number((body as any).order);
  if ((body as any).isActive !== undefined) data.isActive = Boolean((body as any).isActive);

  if (data.icon !== undefined && !data.icon) return NextResponse.json({ error: 'Icon is required' }, { status: 400 });
  if (data.title !== undefined && !data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (data.description !== undefined && !data.description) return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const updated = await prisma.homeFeature.update({ where: { id }, data });
  return NextResponse.json({ ok: true, feature: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'homeFeatures.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.homeFeature.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

