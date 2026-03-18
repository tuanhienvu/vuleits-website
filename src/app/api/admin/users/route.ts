import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const auth = await authorize(req, 'users.read');
  if (auth.error) return auth.error;

  const list = await prisma.user.findMany({ select: { id: true, email: true, roleId: true, isActive: true, isProtected: true } });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'users.create');
  if (auth.error) return auth.error;

  const body = await req.json();
  const { email, password, roleId } = body;
  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'User exists' }, { status: 409 });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash, roleId: roleId || 2, isActive: true } });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
