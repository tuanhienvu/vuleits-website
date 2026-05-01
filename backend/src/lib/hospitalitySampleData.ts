import { prisma } from './prisma';

const sampleRooms = [
  {
    name: 'Botanical Forest Villa',
    slug: 'botanical-forest-villa',
    type: 'VILLA' as const,
    shortDesc: 'Private wellness villa with botanical courtyard and warm wood interiors.',
    details: 'A calming villa designed for long-stay wellness retreats.',
    nightPriceUsd: 320,
    maxGuests: 4,
    totalUnits: 3,
    amenities: ['Private Pool', 'Garden View', 'Breakfast Included', 'Spa Access', 'In-villa Yoga'],
    coverImageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1617104551722-3b2d51366456?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    name: 'Urban Wellness Hotel Suite',
    slug: 'urban-wellness-hotel-suite',
    type: 'HOTEL' as const,
    shortDesc: 'A serene suite for restorative stays and mindful workcation.',
    details: 'Includes a meditation nook, ergonomic workspace, and aromatherapy setup.',
    nightPriceUsd: 340,
    maxGuests: 2,
    totalUnits: 10,
    amenities: ['Sauna', 'Yoga Mat', 'Air Purifier', 'Healthy Mini Bar', 'City View'],
    coverImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1566669437685-56c1d0f1f35f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    name: 'Ocean Wellness Resort',
    slug: 'ocean-wellness-resort',
    type: 'RESORT' as const,
    shortDesc: 'Premium ocean-facing retreat for family and couple getaways.',
    details: 'Panoramic terrace, concierge service, and curated wellness activities.',
    nightPriceUsd: 420,
    maxGuests: 5,
    totalUnits: 5,
    amenities: ['Ocean View', 'Concierge', 'Sunrise Deck', 'Airport Pickup', 'Saltwater Pool'],
    coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    name: 'Green Garden Homestay',
    slug: 'green-garden-homestay',
    type: 'HOMESTAY' as const,
    shortDesc: 'Community-style homestay immersed in local culture and wellness routines.',
    details: 'Slow-living homestay with herbal garden and home-cooked healthy meals.',
    nightPriceUsd: 185,
    maxGuests: 3,
    totalUnits: 6,
    amenities: ['Garden Patio', 'Local Breakfast', 'Community Kitchen', 'Bike Rental', 'Mindful Walk Tours'],
    coverImageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
    ],
  },
];

export async function generateHospitalitySampleData() {
  for (const room of sampleRooms) {
    await prisma.hospitalityRoom.upsert({
      where: { slug: room.slug },
      create: room,
      update: { ...room, isActive: true },
    });
  }

  const generatedBookings = [];
  for (const room of await prisma.hospitalityRoom.findMany({ where: { slug: { in: sampleRooms.map((r) => r.slug) } } })) {
    const booking = await prisma.hospitalityBooking.create({
      data: {
        bookingRef: `SAMPLE-${room.slug.toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-6)}`,
        roomId: room.id,
        guestName: 'Sample Guest',
        guestEmail: 'guest.sample@vuleits-demo.com',
        guestPhone: '+84-900-000-999',
        checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        checkOutDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        guests: Math.min(room.maxGuests, 2),
        nights: 3,
        amountUsd: room.nightPriceUsd.mul(3),
        status: 'PENDING_PAYMENT',
      },
    });
    generatedBookings.push(booking);
  }

  for (const booking of generatedBookings.slice(0, 2)) {
    await prisma.hospitalityPayment.create({
      data: {
        bookingId: booking.id,
        paymentRef: `PAY-${booking.bookingRef}`,
        provider: 'mock',
        amountUsd: booking.amountUsd,
        currency: 'USD',
        status: 'PAID',
        paidAt: new Date(),
      },
    });
  }

  return {
    rooms: sampleRooms.length,
    bookings: generatedBookings.length,
    payments: Math.min(2, generatedBookings.length),
  };
}
