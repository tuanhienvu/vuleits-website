import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { enforceUsersModuleAccess } from '@/lib/adminUsersModule';

export async function GET(req: Request) {
  const auth = await authorize(req, 'users.read');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const roles = await prisma.role.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(roles);
}

