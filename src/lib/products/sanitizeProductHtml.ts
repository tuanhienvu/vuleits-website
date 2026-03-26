import sanitizeHtml from 'sanitize-html';

const allowedTags = [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2', 'h3', 'h4', 'img', 'pre', 'code', 'span', 'iframe'];
const allowedAttributes: Record<string, string[]> = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'loading'],
  code: ['class'],
  span: ['class'],
};

export function sanitizeProductBodyHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com', 'codesandbox.io', 'stackblitz.com'],
  });
}
