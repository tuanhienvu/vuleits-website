import { NextResponse } from 'next/server';
import { getPublicProductBySlug } from '@/lib/products/publicProductDetail';
import { parseLocaleQuery } from '@/lib/i18nContent';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, ctx: Ctx) {
  const { slug: raw } = await ctx.params;
  const slug = decodeURIComponent(String(raw ?? '').trim());
  const locale = parseLocaleQuery(new URL(req.url).searchParams);
  const payload = await getPublicProductBySlug(slug, locale);
  if (!payload) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(payload);
}
