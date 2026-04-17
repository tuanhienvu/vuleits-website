import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const ACTIONS = new Set(['view', 'click_demo', 'share']);

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rate = await checkRateLimit(`product-analytics:${ip}`, 120, 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: { productId?: number; slug?: string; action?: string; userId?: number | null };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const action = String(body.action ?? '').trim();
  if (!ACTIONS.has(action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  let productId = typeof body.productId === 'number' ? body.productId : undefined;
  if (!productId && body.slug) {
    const p = await prisma.product.findFirst({
      where: { slug: String(body.slug).trim(), status: 'Active' },
      select: { id: true },
    });
    productId = p?.id;
  }
  if (!productId) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const userId = typeof body.userId === 'number' && body.userId > 0 ? body.userId : null;
  await prisma.$transaction(async (tx) => {
    await tx.productAnalytics.create({ data: { productId, userId, actionType: action } });
    if (action === 'view') await tx.product.update({ where: { id: productId }, data: { viewsCount: { increment: 1 } } });
    else if (action === 'click_demo') await tx.product.update({ where: { id: productId }, data: { demoClickCount: { increment: 1 } } });
  });

  return NextResponse.json({ ok: true });
}
