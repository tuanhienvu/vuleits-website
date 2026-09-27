import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getHospitalityFeaturesFromSettings } from '@/lib/hospitalityFeatures';
import { computeStayAmountUsd, hasBlockedDateInRange } from '@/lib/hospitalityPricing';

function toDateOrNull(value: unknown): Date | null {
  const raw = typeof value === 'string' ? value : '';
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toPositiveInt(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

export async function GET(req: Request) {
  const features = await getHospitalityFeaturesFromSettings(prisma);
  if (!features.bookingEnabled) {
    return NextResponse.json({ error: 'Booking module is currently disabled.' }, { status: 403 });
  }

  const url = new URL(req.url);
  const email = String(url.searchParams.get('email') ?? '').trim().toLowerCase();
  const bookingRef = String(url.searchParams.get('bookingRef') ?? '').trim().toUpperCase();

  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 });
  }

  const where = bookingRef
    ? { guestEmail: email, bookingRef }
    : { guestEmail: email };

  const bookings = await prisma.hospitalityBooking.findMany({
    where,
    include: { room: true, payments: { orderBy: { createdAt: 'desc' } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(
    bookings.map((b) => ({
      bookingRef: b.bookingRef,
      status: b.status,
      guestName: b.guestName,
      guestEmail: b.guestEmail,
      checkInDate: b.checkInDate.toISOString(),
      checkOutDate: b.checkOutDate.toISOString(),
      guests: b.guests,
      nights: b.nights,
      amountUsd: Number(b.amountUsd),
      room: {
        name: b.room.name,
        type: b.room.type,
        shortDesc: b.room.shortDesc,
        nightPriceUsd: Number(b.room.nightPriceUsd),
      },
      latestPayment:
        b.payments[0]
          ? {
              paymentRef: b.payments[0].paymentRef,
              status: b.payments[0].status,
              provider: b.payments[0].provider,
              amountUsd: Number(b.payments[0].amountUsd),
            }
          : null,
      createdAt: b.createdAt.toISOString(),
    })),
  );
}

export async function POST(req: Request) {
  const features = await getHospitalityFeaturesFromSettings(prisma);
  if (!features.bookingEnabled) {
    return NextResponse.json({ error: 'Booking module is currently disabled.' }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const roomId = Number(body.roomId);
  const guestName = String(body.guestName ?? '').trim();
  const guestEmail = String(body.guestEmail ?? '').trim().toLowerCase();
  const guestPhone = String(body.guestPhone ?? '').trim() || null;
  const guestNote = String(body.customerNote ?? '').trim() || null;
  const guests = toPositiveInt(body.guests, 1);
  const checkIn = toDateOrNull(body.checkInDate);
  const checkOut = toDateOrNull(body.checkOutDate);

  if (!Number.isFinite(roomId)) return NextResponse.json({ error: 'Invalid roomId' }, { status: 400 });
  if (!guestName || !guestEmail) return NextResponse.json({ error: 'Missing guest info' }, { status: 400 });
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    return NextResponse.json({ error: 'Invalid check-in/check-out dates' }, { status: 400 });
  }

  const room = await prisma.hospitalityRoom.findUnique({ where: { id: roomId } });
  if (!room || !room.isActive) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  if (guests > room.maxGuests) {
    return NextResponse.json({ error: `This room allows up to ${room.maxGuests} guests` }, { status: 400 });
  }

  const overlappingCount = await prisma.hospitalityBooking.count({
    where: {
      roomId,
      status: { in: ['PENDING', 'CONFIRMED', 'PENDING_PAYMENT', 'PAID'] },
      checkInDate: { lt: checkOut },
      checkOutDate: { gt: checkIn },
    },
  });
  if (overlappingCount >= room.totalUnits) {
    return NextResponse.json({ error: 'No available unit for selected dates' }, { status: 409 });
  }

  const blockedDates = await prisma.hospitalityBlockedDate.findMany({
    where: {
      roomId,
      blockedDate: { gte: checkIn, lt: checkOut },
    },
    select: { blockedDate: true },
  });
  if (hasBlockedDateInRange(checkIn, checkOut, blockedDates)) {
    return NextResponse.json({ error: 'Selected dates include blocked dates.' }, { status: 409 });
  }

  const ratePeriods = await prisma.hospitalityRatePeriod.findMany({
    where: {
      roomId,
      isActive: true,
      startDate: { lte: checkOut },
      endDate: { gte: checkIn },
    },
    select: { startDate: true, endDate: true, nightlyUsd: true, isActive: true },
  });
  const { nights, amountUsd } = computeStayAmountUsd(
    Number(room.nightPriceUsd),
    checkIn,
    checkOut,
    ratePeriods,
  );
  const bookingRef = `BK-${randomUUID().slice(0, 8).toUpperCase()}`;

  const booking = await prisma.hospitalityBooking.create({
    data: {
      bookingRef,
      roomId: room.id,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      nights,
      amountUsd,
      status: 'PENDING',
      customerNote: guestNote,
    },
  });

  return NextResponse.json({
    ok: true,
    bookingRef: booking.bookingRef,
    status: booking.status,
    amountUsd: Number(booking.amountUsd),
    nights: booking.nights,
  });
}
