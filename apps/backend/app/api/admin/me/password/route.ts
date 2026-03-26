import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

const MIN_LEN = 8;

/** Change password for the signed-in admin (current password required). */
export async function POST(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as {
    currentPassword?: unknown;
    newPassword?: unknown;
  };
  const currentPassword = body.currentPassword == null ? '' : String(body.currentPassword);
  const newPassword = body.newPassword == null ? '' : String(body.newPassword);

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Current and new password are required' }, { status: 400 });
  }
  if (newPassword.length < MIN_LEN) {
    return NextResponse.json({ error: `New password must be at least ${MIN_LEN} characters` }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: { id: true, password: true, isActive: true },
  });
  if (!user?.isActive) {
    return NextResponse.json({ error: 'Account is inactive' }, { status: 403 });
  }

  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(newPassword, 10) },
  });

  return NextResponse.json({ ok: true });
}

