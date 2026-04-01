/** Collapse HTML to plain text for length / empty checks (admin forms). */
export function richTextAsPlain(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isRichTextEmpty(html: string): boolean {
  return richTextAsPlain(html).length === 0;
}
