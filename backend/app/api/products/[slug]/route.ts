import { NextResponse } from 'next/server';
import { getPublicProductBySlug } from '@/lib/products/publicProductDetail';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug: raw } = await ctx.params;
  const slug = decodeURIComponent(String(raw ?? '').trim());
  const payload = await getPublicProductBySlug(slug);
  if (!payload) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(payload);
}
