import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'users.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, roleId: true, isActive: true, isProtected: true } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'users.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  const body = await req.json();
  const data: any = {};
  if (body.password) data.password = await bcrypt.hash(body.password, 10);
  if (body.roleId) data.roleId = body.roleId;
  if (typeof body.isActive === 'boolean') data.isActive = body.isActive;

  const user = await prisma.user.update({ where: { id }, data });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'users.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (user.isProtected) return NextResponse.json({ error: 'Cannot delete protected user' }, { status: 403 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
