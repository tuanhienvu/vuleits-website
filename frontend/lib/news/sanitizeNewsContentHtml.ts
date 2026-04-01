import sanitizeHtml from 'sanitize-html';
import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';

function sanitizeImgSrc(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  // Allow same-site relative paths
  if (s.startsWith('/') && !s.startsWith('//') && s.length <= 2048) return s;
  // Allow only public http(s) URLs
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
    // Embedded source/code support
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
      const srcRaw = String(attribs.src ?? '');
      const safeSrc = sanitizeImgSrc(srcRaw);
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
  // Block <script>/<style> by not allowing those tags.
  // Allow embedded source/code inside <pre><code>.
  return sanitizeHtml(s, OPTIONS);
}

