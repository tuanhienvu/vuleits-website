import sanitizeHtml from 'sanitize-html';
import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';

function sanitizeImgSrc(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) return s;
  return sanitizePublicHttpUrl(s);
}

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'strike',
    'sub',
    'sup',
    'ul',
    'ol',
    'li',
    'blockquote',
    'div',
    'span',
    'hr',
    'a',
    'img',
    'pre',
    'code',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'loading', 'decoding', 'width', 'height'],
    pre: ['class'],
    code: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href || '';
      const isExternal = /^https?:\/\//i.test(href);
      return {
        tagName,
        attribs: {
          ...attribs,
          rel: isExternal ? 'noopener noreferrer' : attribs.rel,
          target: isExternal ? '_blank' : attribs.target,
        },
      };
    },
    img: (tagName, attribs) => {
      const safeSrc = sanitizeImgSrc(String(attribs.src ?? ''));
      if (!safeSrc) return { tagName: 'img', attribs: {} };
      return {
        tagName,
        attribs: {
          ...attribs,
          src: safeSrc,
          loading: 'lazy',
          decoding: 'async',
        },
      };
    },
  },
};

export function sanitizeNewsContentHtml(raw: string): string {
  const s = raw.trim();
  if (!s) return '';
  return sanitizeHtml(s, OPTIONS);
}
