import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';

/** Web path prefix (served from `public/uploads`). */
export const UPLOADS_PUBLIC_BASE = '/uploads';

/** Default cap for generic uploads (images, PDF, short video). */
export const DEFAULT_MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

const SEGMENT = /^[a-z0-9][a-z0-9_-]{0,62}$/i;

/**
 * Normalizes a relative subpath under `public/uploads` (e.g. `company`, `library`, `news/2025`).
 * Rejects `..`, empty segments, and invalid characters. Creates no directories by itself.
 */
export function normalizeUploadSubfolder(input: string | null | undefined, fallback = 'general'): string {
  const s = (input || '').trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  if (!s) return fallback;
  const parts = s.split('/').filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (p === '.' || p === '..' || !SEGMENT.test(p)) return fallback;
    out.push(p.toLowerCase());
  }
  if (out.length === 0) return fallback;
  const joined = out.join('/');
  if (joined.length > 120) return fallback;
  return joined;
}

export function extensionForMime(mimeType: string): string | null {
  const base = mimeType.toLowerCase().split(';')[0].trim();
  return MIME_TO_EXT[base] ?? null;
}

export class PublicUploadError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message);
    this.name = 'PublicUploadError';
  }
}

export type SavedPublicUpload = {
  filename: string;
  publicUrl: string;
  fsPath: string;
  folder: string;
};

/**
 * Writes a file under `public/uploads/{folder}/` (mkdir -p). Returns public URL and absolute path.
 */
export async function savePublicUpload(params: {
  subfolder: string;
  buffer: Buffer;
  mimeType: string;
  maxBytes?: number;
}): Promise<SavedPublicUpload> {
  const folder = normalizeUploadSubfolder(params.subfolder);
  const max = params.maxBytes ?? DEFAULT_MAX_UPLOAD_BYTES;
  if (params.buffer.byteLength > max) {
    const mb = Math.max(1, Math.round(max / (1024 * 1024)));
    throw new PublicUploadError(`File too large (max ${mb}MB)`, 413);
  }
  const ext = extensionForMime(params.mimeType);
  if (!ext) {
    throw new PublicUploadError('Unsupported file type', 415);
  }

  const filename = `${Date.now()}-${randomBytes(5).toString('hex')}.${ext}`;
  const root = path.join(process.cwd(), 'public', 'uploads');
  const dir = path.join(root, ...folder.split('/'));
  await mkdir(dir, { recursive: true });
  const fsPath = path.join(dir, filename);
  await writeFile(fsPath, params.buffer);

  const publicUrl = `${UPLOADS_PUBLIC_BASE}/${folder}/${filename}`;
  return { filename, publicUrl, fsPath, folder };
}

export async function removePublicUploadFile(fsPath: string): Promise<void> {
  await unlink(fsPath).catch(() => {});
}
