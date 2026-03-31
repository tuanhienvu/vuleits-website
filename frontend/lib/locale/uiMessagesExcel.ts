import {
  allUiMessageKeys,
  defaultMessagesByLocale,
  UI_LOCALES,
  type Locale,
} from '@/lib/locale/defaultMessages';

export type UiMessagesDraft = Record<string, Record<Locale, string>>;

/** First row of exported files; import accepts these and common aliases. */
export const UI_MESSAGES_EXCEL_HEADERS = ['key', 'en-US', 'vi-VN'] as const;

const MAX_IMPORT_ROWS = 4000;

function normHeaderCell(raw: unknown): string {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ');
}

function findColumnIndex(headers: unknown[], predicate: (norm: string) => boolean): number {
  for (let i = 0; i < headers.length; i++) {
    const n = normHeaderCell(headers[i]);
    if (n && predicate(n)) return i;
  }
  return -1;
}

function isKeyHeader(n: string): boolean {
  return n === 'key' || n === 'message key' || n === 'message_key' || n === 'messagekey';
}

function isEnHeader(n: string): boolean {
  return n === 'en-us' || n === 'en_us' || n === 'english' || n === 'english (us)';
}

function isViHeader(n: string): boolean {
  return n === 'vi-vn' || n === 'vi_vn' || n === 'vietnamese' || n === 'vietnamese (vn)';
}

function cellToString(v: unknown): string {
  if (v === undefined || v === null) return '';
  if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  return String(v);
}

export type UiMessagesImportPatch = Record<string, Partial<Record<Locale, string>>>;

export function draftToAoA(draft: UiMessagesDraft, keys: readonly string[]): string[][] {
  const rows: string[][] = [[...UI_MESSAGES_EXCEL_HEADERS]];
  for (const key of keys) {
    rows.push([
      key,
      draft[key]?.['en-US'] ?? '',
      draft[key]?.['vi-VN'] ?? '',
    ]);
  }
  return rows;
}

/**
 * Parse first sheet as array-of-arrays (from xlsx.utils.sheet_to_json(s, { header: 1 })).
 * Only keys in validKeys are applied; others listed in unknownKeys.
 */
export function parseTranslationSheet(
  aoa: unknown[][],
  validKeys: Set<string>,
): { patch: UiMessagesImportPatch; unknownKeys: string[]; appliedRows: number } {
  const unknownKeys: string[] = [];
  const patch: UiMessagesImportPatch = {};
  if (!aoa.length) return { patch, unknownKeys, appliedRows: 0 };

  const headerRow = aoa[0] ?? [];
  const ik = findColumnIndex(headerRow, isKeyHeader);
  const ien = findColumnIndex(headerRow, isEnHeader);
  const ivi = findColumnIndex(headerRow, isViHeader);
  if (ik < 0 || ien < 0 || ivi < 0) {
    return { patch, unknownKeys, appliedRows: 0 };
  }

  let appliedRows = 0;
  for (let r = 1; r < aoa.length && appliedRows < MAX_IMPORT_ROWS; r++) {
    const row = aoa[r];
    if (!Array.isArray(row)) continue;
    const key = cellToString(row[ik]).trim();
    if (!key) continue;
    if (!validKeys.has(key)) {
      unknownKeys.push(key);
      continue;
    }
    const en = cellToString(row[ien]);
    const vi = cellToString(row[ivi]);
    patch[key] = { 'en-US': en, 'vi-VN': vi };
    appliedRows++;
  }

  return { patch, unknownKeys, appliedRows };
}

export function mergeDraftWithPatch(prev: UiMessagesDraft, patch: UiMessagesImportPatch): UiMessagesDraft {
  const next: UiMessagesDraft = { ...prev };
  for (const [key, locs] of Object.entries(patch)) {
    if (!locs) continue;
    const base: Record<Locale, string> = {
      'en-US': prev[key]?.['en-US'] ?? '',
      'vi-VN': prev[key]?.['vi-VN'] ?? '',
    };
    for (const loc of UI_LOCALES) {
      if (Object.prototype.hasOwnProperty.call(locs, loc)) {
        base[loc] = locs[loc] ?? '';
      }
    }
    next[key] = base;
  }
  return next;
}

export function buildSaveEntries(
  draft: UiMessagesDraft,
  keys: readonly string[],
): { locale: Locale; key: string; value: string }[] {
  const entries: { locale: Locale; key: string; value: string }[] = [];
  for (const key of keys) {
    for (const loc of UI_LOCALES) {
      const current = (draft[key]?.[loc] ?? '').trim();
      const def = (defaultMessagesByLocale[loc][key] ?? '').trim();
      if (current === def) {
        entries.push({ locale: loc, key, value: '' });
      } else {
        entries.push({ locale: loc, key, value: draft[key]?.[loc] ?? '' });
      }
    }
  }
  return entries;
}
