import { NextResponse } from 'next/server';
import {
  restoreFromEncryptedBackup,
  restoreFromEncryptedBuffer,
} from '@/lib/systemMaintenance';
import { authorize } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;

  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const passphrase = String(form.get('passphrase') ?? '').trim();
    const file = form.get('file');
    if (!passphrase) {
      return NextResponse.json({ error: 'Missing passphrase.' }, { status: 400 });
    }
    if (file instanceof Blob) {
      const buf = Buffer.from(await file.arrayBuffer());
      await restoreFromEncryptedBuffer(buf, passphrase);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'Missing backup file.' }, { status: 400 });
  }

  const body = (await req.json().catch(() => ({}))) as { fileName?: string; passphrase?: string };
  const fileName = (body.fileName || '').trim();
  const passphrase = (body.passphrase || '').trim();
  if (!fileName || !passphrase) {
    return NextResponse.json({ error: 'Missing fileName or passphrase.' }, { status: 400 });
  }
  await restoreFromEncryptedBackup(fileName, passphrase);
  return NextResponse.json({ ok: true });
}
