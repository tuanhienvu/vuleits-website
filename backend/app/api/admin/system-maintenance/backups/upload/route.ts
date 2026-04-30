import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { saveUploadedBackupFile } from '@/lib/systemMaintenance';

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.create');
  if (auth.error) return auth.error;

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Expected multipart/form-data.' }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: 'Missing file.' }, { status: 400 });
  }

  const originalName = typeof (file as File).name === 'string' ? (file as File).name : 'backup.enc';
  const buf = Buffer.from(await file.arrayBuffer());

  try {
    const fileName = await saveUploadedBackupFile(originalName, buf);
    return NextResponse.json({ ok: true, fileName });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
