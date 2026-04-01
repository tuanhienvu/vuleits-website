import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const auth = await authorize(req, 'contacts.read');
  if (auth.error) return auth.error;

  const newCount = await prisma.contact.count({ where: { status: 'New' } });
  return NextResponse.json({ newCount });
}
