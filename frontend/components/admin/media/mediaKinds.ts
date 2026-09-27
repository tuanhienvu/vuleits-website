/**
 * Media library MIME classification (aligned with backend `publicUploads` MIME_TO_EXT).
 *
 * Extend: add new kinds here and handle them in `MediaPreviewModal.tsx` (e.g. audio player).
 */

/** MIME types the backend accepts (magic-byte verified server-side). */
export const SERVER_SUPPORTED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'video/mp4',
  'video/webm',
]);

/** `accept` attribute for `<input type="file">` — hints the picker; server remains authoritative. */
export const FILE_INPUT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'application/pdf',
].join(',');

const EXT_FALLBACK: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
  webm: 'video/webm',
};

export function isImageMime(mime: string): boolean {
  return mime.toLowerCase().startsWith('image/');
}

export function isVideoMime(mime: string): boolean {
  return mime.toLowerCase().startsWith('video/');
}

export function isPdfMime(mime: string): boolean {
  return mime.toLowerCase() === 'application/pdf';
}

/**
 * Client-side guard before upload (reduces round-trips). Does not replace server validation.
 */
export function isLikelyUploadableFile(file: File): boolean {
  const mime = file.type?.trim().toLowerCase();
  if (mime && SERVER_SUPPORTED_MIMES.has(mime)) return true;
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext) return false;
  const guessed = EXT_FALLBACK[ext];
  return guessed != null && SERVER_SUPPORTED_MIMES.has(guessed);
}
