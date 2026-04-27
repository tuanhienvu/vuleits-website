import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

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

async function readGenericCategories(entity: Exclude<CategoryEntity, 'products'>): Promise<GenericCategoryRow[]> {
  const key = `admin.categories.${entity}`;
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  if (!setting?.value) return [];
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as GenericCategoryRow[];
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: rawEntity, id: rawId } = await params;
  const entity = normalizeEntity(rawEntity);
  if (!entity) return NextResponse.json({ error: 'Unsupported category entity' }, { status: 400 });

  const auth = await authorize(req, `${ENTITY_PERMISSIONS[entity]}.update`);
  if (auth.error) return auth.error;

  const id = Number(rawId);
  if (!Number.isFinite(id) || id <= 0) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const hasNameVi = Object.prototype.hasOwnProperty.call(body, 'nameVi');
  const nameVi = hasNameVi ? (typeof body.nameVi === 'string' ? body.nameVi.trim() : '') : undefined;
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);
  const baseSlug = typeof body.slug === 'string' && body.slug.trim() ? body.slug : name;
  let slug = slugify(baseSlug);
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!slug) slug = slugify(name);
  if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

  if (entity === 'products') {
    const existing = await prisma.productCategory.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const oldSlug = existing.slug;
    const clash = await prisma.productCategory.findFirst({ where: { slug, NOT: { id } } });
    if (clash) slug = `${slug}-${id}`;
    const updated = await prisma.productCategory.update({
      where: { id },
      data: { name, slug, sortOrder },
    });
    const viMap = await readProductCategoryNameViMap();
    const carried = viMap[oldSlug];
    if (oldSlug !== updated.slug) delete viMap[oldSlug];
    if (nameVi !== undefined) {
      if (nameVi && nameVi !== updated.name) viMap[updated.slug] = nameVi;
      else delete viMap[updated.slug];
    } else if (oldSlug !== updated.slug && carried) {
      viMap[updated.slug] = carried;
    }
    await writeProductCategoryNameViMap(viMap);
    return NextResponse.json({
      ok: true,
      category: {
        id: updated.id,
        name: updated.name,
        nameVi: viMap[updated.slug] || updated.name,
        slug: updated.slug,
        sortOrder: updated.sortOrder,
        isActive: true,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  }

  const rows = await readGenericCategories(entity);
  const idx = rows.findIndex((r) => Number(r.id) === id);
  if (idx < 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (rows.some((r, i) => i !== idx && r.slug === slug)) slug = `${slug}-${id}`;
  const current = rows[idx];
  const updatedCategory: GenericCategoryRow = {
    ...current,
    name,
    nameVi,
    slug,
    sortOrder,
    isActive,
    updatedAt: new Date().toISOString(),
  };
  const next = [...rows];
  next[idx] = updatedCategory;
  await writeGenericCategories(entity, next);
  return NextResponse.json({ ok: true, category: updatedCategory });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: rawEntity, id: rawId } = await params;
  const entity = normalizeEntity(rawEntity);
  if (!entity) return NextResponse.json({ error: 'Unsupported category entity' }, { status: 400 });

  const auth = await authorize(req, `${ENTITY_PERMISSIONS[entity]}.delete`);
  if (auth.error) return auth.error;

  const id = Number(rawId);
  if (!Number.isFinite(id) || id <= 0) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  if (entity === 'products') {
    const inUse = await prisma.product.count({ where: { categoryId: id } });
    if (inUse > 0) {
      return NextResponse.json({ error: 'Cannot delete: category is used by products' }, { status: 400 });
    }
    await prisma.productCategory.delete({ where: { id } }).catch(() => null);
    return NextResponse.json({ ok: true });
  }

  const rows = await readGenericCategories(entity);
  const next = rows.filter((r) => Number(r.id) !== id);
  if (next.length === rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await writeGenericCategories(entity, next);
  return NextResponse.json({ ok: true });
}
