/** Persist SPA section on `/` so browser back from detail routes restores the correct view. */

export const PUBLIC_SECTION_STORAGE_KEY = 'vuleits:lastPublicSection';

export const PUBLIC_SECTION_IDS = [
  'home',
  'about',
  'services',
  'products',
  'news',
  'contact',
  'privacy',
  'terms',
] as const;

export type PublicSectionId = (typeof PUBLIC_SECTION_IDS)[number];

export function isPublicSectionId(v: string): v is PublicSectionId {
  return (PUBLIC_SECTION_IDS as readonly string[]).includes(v);
}
