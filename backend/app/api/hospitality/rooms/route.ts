import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getHospitalityFeaturesFromSettings } from '@/lib/hospitalityFeatures';
import { computeStayAmountUsd, hasBlockedDateInRange } from '@/lib/hospitalityPricing';

function parseIsoDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(req: Request) {
  const features = await getHospitalityFeaturesFromSettings(prisma);
  if (!features.bookingEnabled) {
    return NextResponse.json({ error: 'Booking module is currently disabled.' }, { status: 403 });
  }

  const url = new URL(req.url);
  const checkIn = parseIsoDate(url.searchParams.get('checkIn'));
  const checkOut = parseIsoDate(url.searchParams.get('checkOut'));

  const rooms = await prisma.hospitalityRoom.findMany({
    where: { isActive: true },
    orderBy: [{ type: 'asc' }, { nightPriceUsd: 'asc' }],
    include: {
      ratePeriods: {
        where: checkIn && checkOut ? { isActive: true, startDate: { lte: checkOut }, endDate: { gte: checkIn } } : { isActive: true },
        select: { startDate: true, endDate: true, nightlyUsd: true, isActive: true },
      },
      blockedDates: {
        where: checkIn && checkOut ? { blockedDate: { gte: checkIn, lt: checkOut } } : undefined,
        select: { blockedDate: true },
      },
    },
  });

  let reservedByRoomId = new Map<number, number>();
  if (checkIn && checkOut && checkOut > checkIn) {
    const overlapping = await prisma.hospitalityBooking.groupBy({
      by: ['roomId'],
      where: {
        status: { in: ['PENDING', 'CONFIRMED', 'PENDING_PAYMENT', 'PAID'] },
        checkInDate: { lt: checkOut },
        checkOutDate: { gt: checkIn },
      },
      _count: { _all: true },
    });
    reservedByRoomId = new Map(overlapping.map((row) => [row.roomId, row._count._all]));
  }

  const payload = rooms.map((room) => {
    const blockedByDate = checkIn && checkOut ? hasBlockedDateInRange(checkIn, checkOut, room.blockedDates) : false;
    const reserved = reservedByRoomId.get(room.id) ?? 0;
    const availableUnits = blockedByDate ? 0 : Math.max(0, room.totalUnits - reserved);
    const quote =
      checkIn && checkOut
        ? computeStayAmountUsd(Number(room.nightPriceUsd), checkIn, checkOut, room.ratePeriods)
        : null;
    return {
      id: room.id,
      name: room.name,
      slug: room.slug,
      type: room.type,
      shortDesc: room.shortDesc,
      details: room.details,
      nightPriceUsd: Number(room.nightPriceUsd),
      maxGuests: room.maxGuests,
      totalUnits: room.totalUnits,
      availableUnits,
      blockedByDate,
      quotedAmountUsd: quote?.amountUsd ?? null,
      quotedNights: quote?.nights ?? null,
      amenities: room.amenities,
      coverImageUrl: room.coverImageUrl,
      galleryImageUrls: Array.isArray(room.galleryImageUrls) ? room.galleryImageUrls : [],
    };
  });

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
  });
}
