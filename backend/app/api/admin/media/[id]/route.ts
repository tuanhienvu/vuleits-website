import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { removePublicUploadFile, resolveUploadsRoot } from '@/lib/publicUploads';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'media.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const media = await prisma.media.findUnique({
    where: { id },
    select: { filename: true, folder: true },
  });

  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Delete file under uploads root: `{UPLOADS_ROOT}/{folder}/{filename}`
  try {
    const fsPath = path.join(resolveUploadsRoot(), media.folder, media.filename);
    await removePublicUploadFile(fsPath);
  } catch {
    // If file removal fails, still delete DB row.
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

