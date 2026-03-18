import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

type ServiceRow = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string | null;
  order: number;
  isActive: number | boolean;
};

function normalizeFeatures(input: unknown): string | null {
  if (input === undefined || input === null) return null;
  if (Array.isArray(input)) return JSON.stringify(input.map((x) => String(x)));
  if (typeof input === 'string') {
    // allow either JSON string or newline separated list
    const s = input.trim();
    if (!s) return JSON.stringify([]);
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return JSON.stringify(parsed.map((x) => String(x)));
    } catch {
      // fallthrough
    }
    const lines = s
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter(Boolean);
    return JSON.stringify(lines);
  }
  return JSON.stringify(input);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.manage');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const rows = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    WHERE id = ${id}
    LIMIT 1
  `;
  const service = rows[0];
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
    id: Number(service.id),
    icon: service.icon,
    title: service.title,
    description: service.description,
    features: service.features,
    order: Number(service.order),
    isActive: Boolean(service.isActive),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.manage');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const data: {
    icon?: string;
    title?: string;
    description?: string;
    features?: string | null;
    order?: number;
    isActive?: boolean;
  } = {};

  if (body.icon !== undefined) data.icon = String(body.icon || '').trim();
  if (body.title !== undefined) data.title = String(body.title || '').trim();
  if (body.description !== undefined) data.description = String(body.description || '').trim();
  if (body.features !== undefined) data.features = normalizeFeatures(body.features);
  if (body.order !== undefined) data.order = Number(body.order);
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);

  if (data.icon !== undefined && !data.icon) return NextResponse.json({ error: 'Icon is required' }, { status: 400 });
  if (data.title !== undefined && !data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (data.description !== undefined && !data.description) return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const currentRows = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    WHERE id = ${id}
    LIMIT 1
  `;
  const current = currentRows[0];
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const nextIcon = data.icon ?? current.icon;
  const nextTitle = data.title ?? current.title;
  const nextDescription = data.description ?? current.description;
  const nextFeatures = data.features === undefined ? current.features : data.features;
  const nextOrder = data.order ?? current.order;
  const nextIsActive = data.isActive ?? Boolean(current.isActive);

  await prisma.$executeRaw`
    UPDATE ServiceItem
    SET icon = ${nextIcon},
        title = ${nextTitle},
        description = ${nextDescription},
        features = ${nextFeatures},
        \`order\` = ${nextOrder},
        isActive = ${nextIsActive},
        updatedAt = NOW()
    WHERE id = ${id}
  `;

  const updatedRows = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    WHERE id = ${id}
    LIMIT 1
  `;
  const updated = updatedRows[0];
  return NextResponse.json({
    ok: true,
    service: updated
      ? {
          id: Number(updated.id),
          icon: updated.icon,
          title: updated.title,
          description: updated.description,
          features: updated.features,
          order: Number(updated.order),
          isActive: Boolean(updated.isActive),
        }
      : null,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.manage');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.$executeRaw`DELETE FROM ServiceItem WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

