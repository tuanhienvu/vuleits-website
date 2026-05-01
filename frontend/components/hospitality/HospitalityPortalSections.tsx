'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';
import { useHospitalityFeatures } from '@/hooks/useHospitalityFeatures';

type Room = {
  id: number;
  name: string;
  slug: string;
  type: 'HOTEL' | 'VILLA' | 'RESORT' | 'HOMESTAY';
  shortDesc: string;
  details: string;
  nightPriceUsd: number;
  maxGuests: number;
  totalUnits: number;
  availableUnits: number;
  amenities: unknown;
  coverImageUrl: string | null;
};

type BookingView = {
  bookingRef: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'PENDING_PAYMENT' | 'PAID';
  guestName: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  nights: number;
  amountUsd: number;
  room: { name: string; type: string; shortDesc: string; nightPriceUsd: number };
  latestPayment: { paymentRef: string; status: string; provider: string; amountUsd: number } | null;
  createdAt: string;
};

export default function HospitalityPortalSections() {
  const router = useRouter();
  const { features, ready } = useHospitalityFeatures();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupRef, setLookupRef] = useState('');
  const [bookings, setBookings] = useState<BookingView[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId],
  );

  if (!ready) return null;

  async function findAvailability() {
    setMessage(null);
    if (!checkInDate || !checkOutDate) {
      setMessage('Please choose check-in and check-out dates.');
      return;
    }
    const qs = new URLSearchParams({ checkIn: checkInDate, checkOut: checkOutDate }).toString();
    const res = await fetch(`${apiPath('hospitality/rooms')}?${qs}`);
    if (!res.ok) {
      setMessage('Failed to load room availability.');
      return;
    }
    const data = (await res.json()) as Room[];
    setRooms(data);
    if (data.length > 0) setSelectedRoomId(data[0].id);
  }

  async function createBooking() {
    setMessage(null);
    if (!selectedRoomId) {
      setMessage('Please select a room.');
      return;
    }
    const payload = {
      roomId: selectedRoomId,
      guestName,
      guestEmail,
      guestPhone,
      guests: Number(guests) || 1,
      checkInDate,
      checkOutDate,
    };
    const res = await fetch(apiPath('hospitality/bookings'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { error?: string; bookingRef?: string };
    if (!res.ok) {
      setMessage(json.error ?? 'Failed to create booking.');
      return;
    }
    setLookupEmail(guestEmail);
    setLookupRef(json.bookingRef ?? '');
    setMessage(`Booking created successfully. Reference: ${json.bookingRef ?? ''}`);
    await lookupBookings(guestEmail, json.bookingRef ?? '');
    if (json.bookingRef) {
      router.push(`/booking/confirmation?ref=${encodeURIComponent(json.bookingRef)}`);
    }
  }

  async function lookupBookings(email?: string, bookingRef?: string) {
    setMessage(null);
    const finalEmail = (email ?? lookupEmail).trim().toLowerCase();
    if (!finalEmail) {
      setMessage('Please enter your booking email to view dashboard.');
      return;
    }
    const params = new URLSearchParams({ email: finalEmail });
    const finalRef = (bookingRef ?? lookupRef).trim();
    if (finalRef) params.set('bookingRef', finalRef);
    const res = await fetch(`${apiPath('hospitality/bookings')}?${params.toString()}`);
    if (!res.ok) {
      setMessage('Failed to load customer dashboard.');
      return;
    }
    const data = (await res.json()) as BookingView[];
    setBookings(data);
  }

  async function cancelBooking(bookingRef: string) {
    const res = await fetch(apiPath(`hospitality/bookings/${bookingRef}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel', guestEmail: lookupEmail }),
    });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      setMessage(json.error ?? 'Failed to cancel booking.');
      return;
    }
    await lookupBookings();
  }

  async function payNow(bookingRef: string) {
    const intentRes = await fetch(apiPath('hospitality/payments'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingRef, guestEmail: lookupEmail, provider: 'mock' }),
    });
    const intentJson = (await intentRes.json()) as { error?: string; paymentRef?: string };
    if (!intentRes.ok || !intentJson.paymentRef) {
      setMessage(intentJson.error ?? 'Failed to create payment.');
      return;
    }
    const confirmRes = await fetch(apiPath('hospitality/payments/confirm'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentRef: intentJson.paymentRef, guestEmail: lookupEmail }),
    });
    const confirmJson = (await confirmRes.json()) as { error?: string };
    if (!confirmRes.ok) {
      setMessage(confirmJson.error ?? 'Payment confirmation failed.');
      return;
    }
    setMessage(`Payment completed for booking ${bookingRef}.`);
    await lookupBookings();
  }

  return (
    <section className="mt-10 space-y-8">
      <div className="woox-card border-amber-100/80 bg-gradient-to-br from-white to-amber-50/40 p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Hospitality</p>
        <h2 className="woox-brand-title mt-2 text-3xl text-slate-900 md:text-4xl">Stay in curated hotel &amp; villa spaces</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Woox Travel–inspired layout: visual-first discovery, then the same booking APIs you already run in production.
        </p>
      </div>

      {features.bookingEnabled && features.bookingCalendarEnabled ? (
        <section id="hospitality-booking" className="woox-card scroll-mt-28">
          <h3 className="text-2xl font-semibold text-slate-900">Booking calendar</h3>
          <p className="mt-2 text-slate-600">Select dates, guests, and room class — availability comes from your backend.</p>
          <div className="mt-5 grid grid-cols-1 items-end gap-3 md:grid-cols-4">
            <label className="woox-label text-slate-600">
              Check-in
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="woox-input mt-1"
              />
            </label>
            <label className="woox-label text-slate-600">
              Check-out
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="woox-input mt-1"
              />
            </label>
            <label className="woox-label text-slate-600">
              Guests
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="woox-input mt-1"
              />
            </label>
            <button type="button" onClick={findAvailability} className="woox-btn-primary w-full justify-center md:w-auto">
              Find availability
            </button>
          </div>

          {rooms.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedRoomId === room.id
                      ? 'border-amber-400 bg-amber-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-amber-200'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">{room.type}</p>
                  <h4 className="mt-1 text-lg font-semibold text-slate-900">{room.name}</h4>
                  <p className="mt-1 text-sm text-slate-600">{room.shortDesc}</p>
                  <p className="mt-3 font-semibold text-slate-900">${room.nightPriceUsd} / night</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Available units: {room.availableUnits} / {room.totalUnits}
                  </p>
                </button>
              ))}
            </div>
          ) : null}

          {selectedRoom ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="text-lg font-semibold text-slate-900">Complete reservation for {selectedRoom.name}</h4>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="woox-input"
                  placeholder="Guest full name"
                />
                <input
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="woox-input"
                  placeholder="Guest email"
                />
                <input
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="woox-input"
                  placeholder="Phone (optional)"
                />
              </div>
              <button type="button" onClick={createBooking} className="woox-btn-primary mt-4">
                Reserve now
              </button>
            </div>
          ) : null}
        </section>
      ) : null}

      {features.bookingEnabled && features.customerDashboardEnabled ? (
        <section className="woox-card">
          <h3 className="text-2xl font-semibold text-slate-900">Customer dashboard</h3>
          <p className="mt-2 text-slate-600">Track status, cancel, or pay — same endpoints as before.</p>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <input
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="woox-input md:col-span-2"
              placeholder="Booking email"
            />
            <input
              value={lookupRef}
              onChange={(e) => setLookupRef(e.target.value)}
              className="woox-input"
              placeholder="Booking ref (optional)"
            />
            <button type="button" onClick={() => void lookupBookings()} className="woox-btn-primary justify-center">
              View bookings
            </button>
          </div>

          {bookings.length > 0 ? (
            <div className="mt-5 space-y-3">
              {bookings.map((booking) => (
                <div key={booking.bookingRef} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">
                      {booking.room.name} ({booking.room.type})
                    </p>
                    <p className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600">{booking.status}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Ref: {booking.bookingRef} | {new Date(booking.checkInDate).toLocaleDateString()} -{' '}
                    {new Date(booking.checkOutDate).toLocaleDateString()} | ${booking.amountUsd}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {booking.status !== 'CANCELLED' && booking.status !== 'PAID' ? (
                      <button
                        type="button"
                        onClick={() => void cancelBooking(booking.bookingRef)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-800 hover:bg-red-100"
                      >
                        Cancel booking
                      </button>
                    ) : null}
                    {features.paymentEnabled &&
                    (features.paymentProviders.stripe ||
                      features.paymentProviders.paypal ||
                      features.paymentProviders.localGateway) &&
                    (booking.status === 'PENDING' || booking.status === 'PENDING_PAYMENT' || booking.status === 'CONFIRMED') ? (
                      <button
                        type="button"
                        onClick={() => void payNow(booking.bookingRef)}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
                      >
                        Pay now
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : features.bookingEnabled ? (
        <section className="woox-card border-amber-200 bg-amber-50/50">
          <h3 className="text-xl font-semibold text-slate-900">Customer dashboard is currently disabled</h3>
          <p className="mt-2 text-slate-600">Enable Customer Dashboard in admin → portal settings to show reservation tracking.</p>
        </section>
      ) : (
        <section className="woox-card border-amber-200 bg-amber-50/50">
          <h3 className="text-xl font-semibold text-slate-900">Booking module is currently disabled</h3>
          <p className="mt-2 text-slate-600">Enable online booking in admin → hospitality settings to show the reservation flow.</p>
        </section>
      )}

      {!features.guestStoriesEnabled ? null : (
        <section className="woox-card">
          <h3 className="text-2xl font-semibold text-slate-900">Guest stories</h3>
          <p className="mt-2 text-slate-600">
            “Beautiful wellness stay with botanical interiors and excellent concierge support.” — Recent guest feedback.
          </p>
        </section>
      )}

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
