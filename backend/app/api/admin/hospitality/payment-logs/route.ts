import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const { searchParams } = new URL(req.url);
  const provider = String(searchParams.get('provider') || '').trim().toLowerCase();
  const status = String(searchParams.get('status') || '').trim().toUpperCase();
  const rows = await prisma.hospitalityPayment.findMany({
    where: {
      ...(provider ? { provider } : {}),
      ...(status ? { status: status as never } : {}),
    },
    include: {
      booking: {
        select: {
          bookingRef: true,
          guestName: true,
          guestEmail: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return NextResponse.json({
    items: rows.map((p) => ({
      id: p.id,
      paymentRef: p.paymentRef,
      provider: p.provider,
      status: p.status,
      amountUsd: Number(p.amountUsd),
      currency: p.currency,
      providerTxnId: p.providerTxnId,
      paidAt: p.paidAt ? p.paidAt.toISOString() : null,
      createdAt: p.createdAt.toISOString(),
      booking: p.booking,
    })),
  });
}
