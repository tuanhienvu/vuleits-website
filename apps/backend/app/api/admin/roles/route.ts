import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const auth = await authorize(req, 'roles.read');
  if (auth.error) return auth.error;

  const roles = await prisma.role.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(roles);
}

