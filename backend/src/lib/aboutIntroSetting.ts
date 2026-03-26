import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';

export const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';

export function sanitizeHeroImageSrc(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) {
    if (/["'<>\s]/.test(s)) return null;
    return s;
  }
  return sanitizePublicHttpUrl(s);
}

export type AboutIntroPayload = {
  titleEn: string;
  titleVi: string;
  bodyEn: string;
  bodyVi: string;
  heroImageUrl: string;
  heroImageAltEn: string;
  heroImageAltVi: string;
};

export type AboutIntroPublic = {
  title: string;
  bodyHtml: string;
  paragraphs: string[];
  heroImageUrl: string | null;
  heroImageAlt: string;
};

const DEFAULT: AboutIntroPayload = {
  titleEn: 'About Our Vision',
  titleVi: 'Tam nhin cua chung toi',
  bodyEn: 'We build intuitive digital experiences.',
  bodyVi: 'Chung toi xay dung trai nghiem so truc quan.',
  heroImageUrl: '',
  heroImageAltEn: '',
  heroImageAltVi: '',
};

export function defaultAboutIntroPayload(): AboutIntroPayload {
  return { ...DEFAULT };
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

function introBodyLooksLikeHtml(raw: string): boolean {
  const t = raw.trim();
  if (!t) return false;
  return /<[a-z][\s\S]*>/i.test(t);
}

export function parseAboutIntroJson(raw: string | null | undefined): AboutIntroPayload {
  const base = defaultAboutIntroPayload();
  if (!raw?.trim()) return base;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : base.titleEn,
      titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : base.titleVi,
      bodyEn: typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 20000) : base.bodyEn,
      bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 20000) : base.bodyVi,
      heroImageUrl: typeof o.heroImageUrl === 'string' ? o.heroImageUrl.slice(0, 2048) : base.heroImageUrl,
      heroImageAltEn: typeof o.heroImageAltEn === 'string' ? o.heroImageAltEn.slice(0, 200) : base.heroImageAltEn,
      heroImageAltVi: typeof o.heroImageAltVi === 'string' ? o.heroImageAltVi.slice(0, 200) : base.heroImageAltVi,
    };
  } catch {
    return base;
  }
}

export function toPublicIntro(payload: AboutIntroPayload, locale: string): AboutIntroPublic {
  const vi = locale === 'vi-VN';
  const title = (vi ? payload.titleVi : payload.titleEn).trim() || (vi ? DEFAULT.titleVi : DEFAULT.titleEn);
  const body = vi ? payload.bodyVi : payload.bodyEn;
  let bodyHtml = '';
  let paragraphs: string[] = [];
  if (introBodyLooksLikeHtml(body)) bodyHtml = body.trim();
  else {
    paragraphs = splitParagraphs(body);
    if (paragraphs.length === 0) paragraphs = splitParagraphs(vi ? DEFAULT.bodyVi : DEFAULT.bodyEn);
  }
  const heroImageUrl = sanitizeHeroImageSrc(payload.heroImageUrl);
  const altRaw = (vi ? payload.heroImageAltVi : payload.heroImageAltEn).trim().slice(0, 200);
  const heroImageAlt = heroImageUrl ? altRaw || (vi ? 'Hinh minh hoa' : 'Illustration') : '';
  return { title, bodyHtml, paragraphs, heroImageUrl, heroImageAlt };
}

export function serializeAboutIntroPayload(p: AboutIntroPayload): string {
  return JSON.stringify({
    titleEn: p.titleEn.trim(),
    titleVi: p.titleVi.trim(),
    bodyEn: p.bodyEn.trim(),
    bodyVi: p.bodyVi.trim(),
    heroImageUrl: p.heroImageUrl.trim(),
    heroImageAltEn: p.heroImageAltEn.trim(),
    heroImageAltVi: p.heroImageAltVi.trim(),
  });
}
