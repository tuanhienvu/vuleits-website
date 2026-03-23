import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';

export const ABOUT_INTRO_SETTING_KEY = 'about_page_intro';

/** Safe image src: https URL or same-site path starting with / (not //). */
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
  /** Paragraphs separated by a blank line (\\n\\n) */
  bodyEn: string;
  bodyVi: string;
  /** Shown in Home hero (right) and About intro; https or /uploads/... */
  heroImageUrl: string;
  heroImageAltEn: string;
  heroImageAltVi: string;
};

export type AboutIntroPublic = {
  title: string;
  paragraphs: string[];
  heroImageUrl: string | null;
  heroImageAlt: string;
};

const DEFAULT: AboutIntroPayload = {
  titleEn: 'About Our Vision',
  titleVi: 'Tầm nhìn của chúng tôi',
  bodyEn: `We believe in creating digital experiences that feel natural and intuitive. Our glass morphism design philosophy combines transparency, depth, and subtle animations to create interfaces that users love to interact with.

Founded in 2024, our team of designers and developers are passionate about pushing the boundaries of web design while maintaining accessibility and performance standards.

Every project we undertake is crafted with attention to detail, ensuring that form follows function while never compromising on aesthetic beauty.`,
  bodyVi: `Chúng tôi tin vào việc tạo ra trải nghiệm số tự nhiên và trực quan. Triết lý thiết kế glass morphism kết hợp độ trong suốt, chiều sâu và chuyển động tinh tế để mang lại giao diện người dùng yêu thích.

Được thành lập năm 2024, đội ngũ thiết kế và lập trình của chúng tôi luôn nỗ lực mở rộng giới hạn của thiết kế web, đồng thời đảm bảo khả năng tiếp cận và hiệu năng.

Mỗi dự án đều được chăm chút từng chi tiết, đảm bảo hình thức đi đôi với chức năng mà không hy sinh vẻ đẹp thẩm mỹ.`,
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
  let paragraphs = splitParagraphs(body);
  if (paragraphs.length === 0) {
    paragraphs = splitParagraphs(vi ? DEFAULT.bodyVi : DEFAULT.bodyEn);
  }
  const heroImageUrl = sanitizeHeroImageSrc(payload.heroImageUrl);
  const altRaw = (vi ? payload.heroImageAltVi : payload.heroImageAltEn).trim().slice(0, 200);
  const heroImageAlt = heroImageUrl ? altRaw || (vi ? 'Hình minh họa' : 'Illustration') : '';
  return { title, paragraphs, heroImageUrl, heroImageAlt };
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
