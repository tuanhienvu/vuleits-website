import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { parseLocaleQuery } from '@/lib/i18nContent';

type CategoryEntity = 'products' | 'services' | 'news' | 'medias' | 'banners';
type PermissionFeature = 'products' | 'services' | 'news' | 'media' | 'banners';

type GenericCategoryRow = {
  id: number;
  name: string;
  nameVi?: string | null;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const ENTITY_PERMISSIONS: Record<CategoryEntity, PermissionFeature> = {
  products: 'products',
  services: 'services',
  news: 'news',
  medias: 'media',
  banners: 'banners',
};
const PRODUCT_CATEGORY_VI_KEY = 'admin.categories.products.nameViMap';

function normalizeEntity(raw: string): CategoryEntity | null {
  const key = raw.trim().toLowerCase();
  if (key === 'products') return 'products';
  if (key === 'services') return 'services';
  if (key === 'news') return 'news';
  if (key === 'medias' || key === 'media') return 'medias';
  if (key === 'banners') return 'banners';
  return null;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

function toGenericCategory(
  row: Partial<GenericCategoryRow> & Pick<GenericCategoryRow, 'name' | 'slug'>,
  fallbackId: number,
): GenericCategoryRow {
  const now = new Date().toISOString();
  return {
    id: Number(row.id) || fallbackId,
    name: String(row.name).trim(),
    nameVi: typeof row.nameVi === 'string' ? row.nameVi.trim() : null,
    slug: slugify(String(row.slug || row.name)) || `category-${fallbackId}`,
    sortOrder: Number.isFinite(Number(row.sortOrder)) ? Number(row.sortOrder) : 0,
    isActive: row.isActive === undefined ? true : Boolean(row.isActive),
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : now,
    updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : now,
  };
}

async function readGenericCategories(entity: Exclude<CategoryEntity, 'products'>): Promise<GenericCategoryRow[]> {
  const key = `admin.categories.${entity}`;
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  if (!setting?.value) return [];
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, idx) => toGenericCategory((item ?? {}) as Partial<GenericCategoryRow> & Pick<GenericCategoryRow, 'name' | 'slug'>, idx + 1))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

async function writeGenericCategories(entity: Exclude<CategoryEntity, 'products'>, rows: GenericCategoryRow[]): Promise<void> {
  const key = `admin.categories.${entity}`;
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: JSON.stringify(rows), updatedAt: new Date() },
    create: { key, value: JSON.stringify(rows) },
  });
}

async function readProductCategoryNameViMap(): Promise<Record<string, string>> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: PRODUCT_CATEGORY_VI_KEY } });
  if (!setting?.value) return {};
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      const key = String(k || '').trim();
      const value = typeof v === 'string' ? v.trim() : '';
      if (key && value) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

async function writeProductCategoryNameViMap(map: Record<string, string>): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key: PRODUCT_CATEGORY_VI_KEY },
    update: { value: JSON.stringify(map), updatedAt: new Date() },
    create: { key: PRODUCT_CATEGORY_VI_KEY, value: JSON.stringify(map) },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity: rawEntity } = await params;
  const entity = normalizeEntity(rawEntity);
  if (!entity) return NextResponse.json({ error: 'Unsupported category entity' }, { status: 400 });
  const locale = parseLocaleQuery(req.nextUrl.searchParams);

  const auth = await authorize(req, `${ENTITY_PERMISSIONS[entity]}.read`);
  if (auth.error) return auth.error;

  if (entity === 'products') {
    const rows = await prisma.productCategory.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
    const viMap = await readProductCategoryNameViMap();
    return NextResponse.json(
      rows.map((r) => ({
        id: r.id,
        name: locale === 'vi-VN' ? viMap[r.slug] || r.name : r.name,
        nameVi: viMap[r.slug] || null,
        slug: r.slug,
        sortOrder: r.sortOrder,
        isActive: true,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    );
  }

  const rows = await readGenericCategories(entity);
  return NextResponse.json(
    rows.map((row) => ({
      ...row,
      name: locale === 'vi-VN' ? row.nameVi || row.name : row.name,
    })),
  );
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity: rawEntity } = await params;
  const entity = normalizeEntity(rawEntity);
  if (!entity) return NextResponse.json({ error: 'Unsupported category entity' }, { status: 400 });

  const auth = await authorize(req, `${ENTITY_PERMISSIONS[entity]}.create`);
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const nameVi = typeof body.nameVi === 'string' ? body.nameVi.trim() : null;
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);
  const baseSlug = typeof body.slug === 'string' && body.slug.trim() ? body.slug : name;
  let slug = slugify(baseSlug);
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!slug) slug = slugify(name);
  if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

  if (entity === 'products') {
    const clash = await prisma.productCategory.findUnique({ where: { slug } });
    if (clash) slug = `${slug}-${Date.now()}`;
    const created = await prisma.productCategory.create({
      data: { name, slug, sortOrder },
    });
    const viMap = await readProductCategoryNameViMap();
    if (nameVi && nameVi !== created.name) viMap[created.slug] = nameVi;
    else delete viMap[created.slug];
    await writeProductCategoryNameViMap(viMap);
    return NextResponse.json({
      ok: true,
      category: {
        id: created.id,
        name: created.name,
        nameVi: viMap[created.slug] || created.name,
        slug: created.slug,
        sortOrder: created.sortOrder,
        isActive: true,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      },
    });
  }

  const current = await readGenericCategories(entity);
  if (current.some((x) => x.slug === slug)) slug = `${slug}-${Date.now()}`;
  const nextId = current.reduce((max, x) => Math.max(max, x.id), 0) + 1;
  const nowIso = new Date().toISOString();
  const category: GenericCategoryRow = {
    id: nextId,
    name,
    nameVi,
    slug,
    sortOrder,
    isActive,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  const updated = [...current, category].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  await writeGenericCategories(entity, updated);
  return NextResponse.json({ ok: true, category });
}
