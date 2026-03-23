import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireCompanyProfileAdmin } from '@/lib/companyProfileAccess';
import { PublicUploadError, savePublicUpload } from '@/lib/publicUploads';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_BYTES = 5 * 1024 * 1024;
const SUBFOLDER = 'company';

export async function POST(req: Request) {
  const gate = await requireCompanyProfileAdmin(req);
  if ('error' in gate) return gate.error;

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP, or GIF images are allowed' }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());

  let saved;
  try {
    saved = await savePublicUpload({
      subfolder: SUBFOLDER,
      buffer: buf,
      mimeType: file.type,
      maxBytes: MAX_BYTES,
    });
  } catch (e) {
    if (e instanceof PublicUploadError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    }
    throw e;
  }

  const media = await prisma.media.create({
    data: {
      filename: saved.filename,
      mimeType: file.type,
      size: buf.length,
      folder: saved.folder,
      url: saved.publicUrl,
      uploadedById: gate.user.id,
    },
    select: { id: true, url: true },
  });

  return NextResponse.json({ ok: true, url: media.url, mediaId: media.id });
}
