import { prisma } from '@/lib/prisma';

type DefinitionsEntity = 'services' | 'news' | 'medias' | 'banners';
type AssignmentsEntity = 'services' | 'banners';

export type ManagedCategory = {
  id: number;
  name: string;
  nameVi?: string | null;
  slug: string;
  sortOrder: number;
  isActive: boolean;
};

type AssignmentMap = Record<string, string>;

function categoryDefsKey(entity: DefinitionsEntity) {
  return `admin.categories.${entity}`;
}

function assignmentKey(entity: AssignmentsEntity) {
  return `admin.categoryAssignments.${entity}`;
}

export async function getManagedCategories(
  entity: DefinitionsEntity,
  locale?: 'en-US' | 'vi-VN',
): Promise<ManagedCategory[]> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: categoryDefsKey(entity) } });
  if (!setting?.value) return [];
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => item as Partial<ManagedCategory>)
      .filter((x) => typeof x.name === 'string' && typeof x.slug === 'string')
      .map((x, idx) => ({
        id: Number(x.id) || idx + 1,
        name: locale === 'vi-VN' ? String(x.nameVi ?? x.name ?? '') : String(x.name),
        nameVi: typeof x.nameVi === 'string' ? x.nameVi : null,
        slug: String(x.slug),
        sortOrder: Number.isFinite(Number(x.sortOrder)) ? Number(x.sortOrder) : 0,
        isActive: x.isActive === undefined ? true : Boolean(x.isActive),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function getCategoryAssignments(entity: AssignmentsEntity): Promise<AssignmentMap> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: assignmentKey(entity) } });
  if (!setting?.value) return {};
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: AssignmentMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v !== 'string') continue;
      const id = Number(k);
      if (!Number.isFinite(id) || id <= 0) continue;
      out[String(id)] = v;
    }
    return out;
  } catch {
    return {};
  }
}

async function writeCategoryAssignments(entity: AssignmentsEntity, map: AssignmentMap) {
  await prisma.siteSetting.upsert({
    where: { key: assignmentKey(entity) },
    update: { value: JSON.stringify(map), updatedAt: new Date() },
    create: { key: assignmentKey(entity), value: JSON.stringify(map) },
  });
}

export async function setCategoryAssignment(entity: AssignmentsEntity, itemId: number, categorySlug: string | null) {
  const map = await getCategoryAssignments(entity);
  const key = String(itemId);
  if (categorySlug && categorySlug.trim()) map[key] = categorySlug.trim();
  else delete map[key];
  await writeCategoryAssignments(entity, map);
}

export async function deleteCategoryAssignment(entity: AssignmentsEntity, itemId: number) {
  const map = await getCategoryAssignments(entity);
  delete map[String(itemId)];
  await writeCategoryAssignments(entity, map);
}

