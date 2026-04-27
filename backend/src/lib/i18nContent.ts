/** Public + admin locale helpers for EN primary + optional VI overrides. */

export type PublicContentLocale = 'en-US' | 'vi-VN';
const DEFAULT_LOCALE: PublicContentLocale = process.env.DEFAULT_LOCALE === 'vi-VN' ? 'vi-VN' : 'en-US';

export function parseLocaleQuery(searchParams: URLSearchParams): PublicContentLocale {
  const raw = String(searchParams.get('locale') ?? '').trim();
  if (raw === 'en-US' || raw === 'vi-VN') return raw;
  return DEFAULT_LOCALE;
}

/** When `locale` is Vietnamese, prefer non-empty `vi`; otherwise use `en` (fallback to `vi` if `en` empty). */
export function pickLocalized(en: string | null | undefined, vi: string | null | undefined, locale: PublicContentLocale): string {
  const e = (en ?? '').trim();
  const v = (vi ?? '').trim();
  if (locale === 'vi-VN') {
    if (v) return v;
    return e || v;
  }
  return e || v;
}
