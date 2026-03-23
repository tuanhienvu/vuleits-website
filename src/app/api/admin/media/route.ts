import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { PublicUploadError, removePublicUploadFile, savePublicUpload } from '@/lib/publicUploads';

/** List media (requires media.read). Default: images only (library pickers). Use imagesOnly=0 for all MIME types. */
export async function GET(req: Request) {
  const auth = await authorize(req, 'media.read');
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const take = Math.min(200, Math.max(1, Number(searchParams.get('take')) || 80));
  const imagesOnly = searchParams.get('imagesOnly') !== '0';

  const list = await prisma.media.findMany({
    where: imagesOnly ? { mimeType: { startsWith: 'image/' } } : {},
    orderBy: { createdAt: 'desc' },
    take,
    select: { id: true, url: true, filename: true, mimeType: true, folder: true, createdAt: true },
  });

  return NextResponse.json(list);
}

/** Upload a file into `public/uploads/{folder}/` and create a Media row (requires media.create). */
export async function POST(req: Request) {
  const auth = await authorize(req, 'media.create');
  if (auth.error) return auth.error;

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const folderField = formData.get('folder');
  const subfolder = typeof folderField === 'string' ? folderField : 'library';

  const buf = Buffer.from(await file.arrayBuffer());

  let saved;
  try {
    saved = await savePublicUpload({
      subfolder,
      buffer: buf,
      mimeType: file.type,
    });
  } catch (e) {
    if (e instanceof PublicUploadError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    }
    throw e;
  }

  try {
    const media = await prisma.media.create({
      data: {
        filename: saved.filename,
        mimeType: file.type,
        size: buf.length,
        folder: saved.folder,
        url: saved.publicUrl,
        uploadedById: auth.user.id,
      },
      select: { id: true, url: true, filename: true, mimeType: true, folder: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, media });
  } catch {
    await removePublicUploadFile(saved.fsPath);
    return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 });
  }
}
