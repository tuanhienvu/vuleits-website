/**
 * Nitro-style hover (animated conic border + glow). Pair with globals.css:
 * `nitro-card-shell` + `nitro-theme-*` on the outer wrapper, `nitro-card-inner` on content.
 */
export const NITRO_THEME = {
  /** /products listing — emerald-led */
  products: 'nitro-theme-products',
  /** Featured product tiles — stronger emerald / gold */
  productsFeatured: 'nitro-theme-products-featured',
  /** Trending tiles — amber-led */
  productsTrending: 'nitro-theme-products-trending',
  /** Product detail related row — matches detail emerald accent */
  detail: 'nitro-theme-detail',
  /** /services */
  services: 'nitro-theme-services',
  /** /news, news carousels, related articles */
  news: 'nitro-theme-news',
  /** Home feature grid */
  home: 'nitro-theme-home',
  /** About stats & team cards */
  about: 'nitro-theme-about',
  /** Contact columns */
  contact: 'nitro-theme-contact',
  /** Admin dashboard metric cards */
  admin: 'nitro-theme-admin',
} as const;

export type NitroTheme = keyof typeof NITRO_THEME;

/** Outer animated ring wrapper */
export function nitroShell(theme: NitroTheme, ...extra: (string | false | undefined)[]): string {
  return ['nitro-card-shell', 'group', NITRO_THEME[theme], ...extra.filter(Boolean) as string[]].join(' ');
}

/** Inner surface (add `glass`, borders, padding as needed) */
export function nitroInner(...extra: (string | false | undefined)[]): string {
  return ['nitro-card-inner', ...extra.filter(Boolean) as string[]].join(' ');
}
