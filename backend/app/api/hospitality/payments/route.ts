import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getHospitalityFeaturesFromSettings } from '@/lib/hospitalityFeatures';

export async function POST(req: Request) {
  const features = await getHospitalityFeaturesFromSettings(prisma);
  if (!features.bookingEnabled || !features.paymentEnabled) {
    return NextResponse.json({ error: 'Payment module is currently disabled.' }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const bookingRef = String(body.bookingRef ?? '').trim().toUpperCase();
  const guestEmail = String(body.guestEmail ?? '').trim().toLowerCase();
  const provider = String(body.provider ?? 'mock').trim().slice(0, 80) || 'mock';
  const key = provider.toLowerCase();
  const providerAllowed =
    key === 'stripe'
      ? features.paymentProviders.stripe
      : key === 'paypal'
        ? features.paymentProviders.paypal
        : features.paymentProviders.localGateway;

  if (!bookingRef || !guestEmail) {
    return NextResponse.json({ error: 'bookingRef and guestEmail are required' }, { status: 400 });
  }
  if (!providerAllowed) {
    return NextResponse.json({ error: `Payment provider "${provider}" is currently disabled.` }, { status: 403 });
  }

  const booking = await prisma.hospitalityBooking.findUnique({ where: { bookingRef } });
  if (!booking || booking.guestEmail !== guestEmail) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }
  if (booking.status === 'CANCELLED') {
    return NextResponse.json({ error: 'Cancelled booking cannot be paid' }, { status: 409 });
  }

  const paymentRef = `PAY-${randomUUID().slice(0, 8).toUpperCase()}`;
  const payment = await prisma.hospitalityPayment.create({
    data: {
      bookingId: booking.id,
      paymentRef,
      provider,
      amountUsd: booking.amountUsd,
      currency: 'USD',
      status: 'PENDING',
    },
  });

  await prisma.hospitalityBooking.update({
    where: { id: booking.id },
    data: { status: 'PENDING_PAYMENT' },
  });

  if (key === 'stripe') {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secret) {
      return NextResponse.json(
        { error: 'Stripe is enabled but STRIPE_SECRET_KEY is not configured.' },
        { status: 500 },
      );
    }
    const amountCents = Math.max(1, Math.round(Number(booking.amountUsd) * 100));
    const params = new URLSearchParams();
    params.set('amount', String(amountCents));
    params.set('currency', 'usd');
    params.set('automatic_payment_methods[enabled]', 'true');
    params.set('metadata[paymentRef]', payment.paymentRef);
    params.set('metadata[bookingRef]', booking.bookingRef);
    const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const stripeJson = (await stripeRes.json().catch(() => ({}))) as {
      id?: string;
      client_secret?: string;
      error?: { message?: string };
    };
    if (!stripeRes.ok || !stripeJson.id) {
      return NextResponse.json(
        { error: stripeJson.error?.message || 'Stripe payment intent creation failed.' },
        { status: 502 },
      );
    }
    await prisma.hospitalityPayment.update({
      where: { id: payment.id },
      data: { providerTxnId: stripeJson.id },
    });
    return NextResponse.json({
      ok: true,
      paymentRef: payment.paymentRef,
      status: payment.status,
      provider: 'stripe',
      providerTxnId: stripeJson.id,
      clientSecret: stripeJson.client_secret ?? null,
    });
  }

  return NextResponse.json({
    ok: true,
    paymentRef: payment.paymentRef,
    status: payment.status,
    checkoutUrl: `/payments/mock-checkout?paymentRef=${encodeURIComponent(payment.paymentRef)}`,
  });
}
