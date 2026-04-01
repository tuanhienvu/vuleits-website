import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

const meSelect = {
  id: true,
  email: true,
  displayName: true,
  roleId: true,
  role: { select: { name: true } },
} as const;

/** Current session user for admin UI. */
export async function GET(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: meSelect,
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(user);
}

/** Update own display name only. */
export async function PATCH(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as { displayName?: unknown };
  const displayName =
    body.displayName == null || body.displayName === ''
      ? null
      : String(body.displayName).trim().slice(0, 150) || null;

  const user = await prisma.user.update({
    where: { id: auth.user.id },
    data: { displayName },
    select: meSelect,
  });

  return NextResponse.json(user);
}

