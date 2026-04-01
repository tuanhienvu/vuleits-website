import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

const STATUSES = ['New', 'Read', 'Replied', 'Archived'] as const;

export async function GET(req: Request) {
  const auth = await authorize(req, 'contacts.read');
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const q = String(searchParams.get('q') ?? '').trim();
  const status = String(searchParams.get('status') ?? '').trim();
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 25) || 25, 1), 100);
  const skip = Math.max(Number(searchParams.get('skip') ?? 0) || 0, 0);

  const where: Prisma.ContactWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { subject: { contains: q } },
      { message: { contains: q } },
    ];
  }
  if (status && (STATUSES as readonly string[]).includes(status)) {
    where.status = status;
  }

  const total = await prisma.contact.count({ where });
  const rows = await prisma.contact.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take,
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      phone: true,
      message: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({
    total,
    items: rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      phone: r.phone,
      message: r.message,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}
