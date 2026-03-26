import sanitizeHtml from 'sanitize-html';

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
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
    'a',
    'ul',
    'ol',
    'li',
    'h2',
    'h3',
    'h4',
    'blockquote',
    'div',
    'span',
    'hr',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
  },
  allowedStyles: {
    p: { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] },
    h2: { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] },
    h3: { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] },
    h4: { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] },
    div: { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] },
  },
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
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
};

export function sanitizeAboutIntroBodyHtml(raw: string): string {
  const s = raw.trim();
  if (!s) return '';
  return sanitizeHtml(s, OPTIONS);
}
