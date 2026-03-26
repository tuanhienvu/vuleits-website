import { NextResponse } from 'next/server';
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

export async function GET(req: Request) {
  const auth = await authorize(req, 'services.read');
  if (auth.error) return auth.error;

  const rows = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    ORDER BY \`order\` ASC, id ASC
  `;

  return NextResponse.json(
    rows.map((r) => ({
      id: Number(r.id),
      icon: r.icon,
      title: r.title,
      description: r.description,
      features: r.features,
      order: Number(r.order),
      isActive: Boolean(r.isActive),
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'services.create');
  if (auth.error) return auth.error;

  const body = await req.json();
  const icon = String((body as any).icon || '').trim();
  const title = String((body as any).title || '').trim();
  const description = String((body as any).description || '').trim();
  const order = (body as any).order === undefined || (body as any).order === null ? 0 : Number((body as any).order);
  const isActive = (body as any).isActive === undefined ? true : Boolean((body as any).isActive);

  let features: string | null = null;
  if ((body as any).features !== undefined && (body as any).features !== null) {
    if (Array.isArray((body as any).features)) {
      features = JSON.stringify(((body as any).features as unknown[]).map((x) => String(x)));
    } else if (typeof (body as any).features === 'string') {
      features = String((body as any).features);
    } else {
      features = JSON.stringify((body as any).features);
    }
  }

  if (!icon || !title || !description) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  await prisma.$executeRaw`
    INSERT INTO ServiceItem (icon, title, description, features, \`order\`, isActive, createdAt, updatedAt)
    VALUES (${icon}, ${title}, ${description}, ${features}, ${order}, ${isActive}, NOW(), NOW())
  `;

  const created = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    ORDER BY id DESC
    LIMIT 1
  `;

  const s = created[0];
  return NextResponse.json({
    ok: true,
    service: s
      ? { id: Number(s.id), icon: s.icon, title: s.title, description: s.description, features: s.features, order: Number(s.order), isActive: Boolean(s.isActive) }
      : null,
  });
}

