'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';

type Room = { id: number; name: string; type: string; nightPriceUsd: number };
type Rate = { id: number; roomId: number; room: { name: string; type: string }; startDate: string; endDate: string; nightlyUsd: number; note: string | null };
type Blocked = { id: number; roomId: number; room: { name: string; type: string }; blockedDate: string; reason: string | null };
type PaymentLog = { id: number; paymentRef: string; provider: string; status: string; amountUsd: number; currency: string; createdAt: string; booking: { bookingRef: string; guestEmail: string } };

export default function HospitalityRevenueOpsPanel() {
  const { can } = useAdminPermissions();
  const canRead = can('maintenance', 'read');
  const canUpdate = can('maintenance', 'update');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [msg, setMsg] = useState('');
  const [formRate, setFormRate] = useState({ roomId: '', startDate: '', endDate: '', nightlyUsd: '', note: '' });
  const [formBlock, setFormBlock] = useState({ roomId: '', blockedDate: '', reason: '' });

  const load = useCallback(async () => {
    if (!canRead) return;
    const [roomsRes, ratesRes, blockedRes, paymentsRes] = await Promise.all([
      fetch(apiPath('admin/hospitality/rooms'), { credentials: 'include' }),
      fetch(apiPath('admin/hospitality/rate-periods'), { credentials: 'include' }),
      fetch(apiPath('admin/hospitality/blocked-dates'), { credentials: 'include' }),
      fetch(apiPath('admin/hospitality/payment-logs'), { credentials: 'include' }),
    ]);
    if (roomsRes.ok) setRooms(((await roomsRes.json()) as { rooms: Room[] }).rooms || []);
    if (ratesRes.ok) setRates(((await ratesRes.json()) as { items: Rate[] }).items || []);
    if (blockedRes.ok) setBlocked(((await blockedRes.json()) as { items: Blocked[] }).items || []);
    if (paymentsRes.ok) setPayments(((await paymentsRes.json()) as { items: PaymentLog[] }).items || []);
  }, [canRead]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!canRead) return null;

  return (
    <section className="glass p-6 rounded-2xl space-y-6">
      <h3 className="text-xl font-semibold text-white">Revenue & inventory operations</h3>
      {msg ? <p className="text-sm text-cyan-200">{msg}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <h4 className="font-medium text-white">Seasonal pricing</h4>
          <div className="grid grid-cols-2 gap-2">
            <select className="rounded bg-black/30 border border-white/20 p-2" value={formRate.roomId} onChange={(e) => setFormRate((s) => ({ ...s, roomId: e.target.value }))}>
              <option value="">Room</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <input type="number" placeholder="Nightly USD" className="rounded bg-black/30 border border-white/20 p-2" value={formRate.nightlyUsd} onChange={(e) => setFormRate((s) => ({ ...s, nightlyUsd: e.target.value }))} />
            <input type="date" className="rounded bg-black/30 border border-white/20 p-2" value={formRate.startDate} onChange={(e) => setFormRate((s) => ({ ...s, startDate: e.target.value }))} />
            <input type="date" className="rounded bg-black/30 border border-white/20 p-2" value={formRate.endDate} onChange={(e) => setFormRate((s) => ({ ...s, endDate: e.target.value }))} />
            <input placeholder="Note" className="col-span-2 rounded bg-black/30 border border-white/20 p-2" value={formRate.note} onChange={(e) => setFormRate((s) => ({ ...s, note: e.target.value }))} />
          </div>
          <button
            type="button"
            disabled={!canUpdate}
            className="rounded border border-emerald-300/40 bg-emerald-500/20 px-3 py-2"
            onClick={async () => {
              const res = await fetch(apiPath('admin/hospitality/rate-periods'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formRate),
              });
              if (!res.ok) return setMsg('Failed to add seasonal pricing.');
              setMsg('Seasonal pricing added.');
              setFormRate({ roomId: '', startDate: '', endDate: '', nightlyUsd: '', note: '' });
              await load();
            }}
          >
            Add seasonal rate
          </button>
          <div className="max-h-56 overflow-auto space-y-2 text-sm">
            {rates.map((r) => (
              <div key={r.id} className="rounded border border-white/10 p-2">
                {r.room.name}: ${r.nightlyUsd} ({new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()})
                <button
                  type="button"
                  disabled={!canUpdate}
                  className="ml-2 text-rose-300"
                  onClick={async () => {
                    await fetch(apiPath(`admin/hospitality/rate-periods/${r.id}`), { method: 'DELETE', credentials: 'include' });
                    await load();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <h4 className="font-medium text-white">Blocked dates</h4>
          <div className="grid grid-cols-2 gap-2">
            <select className="rounded bg-black/30 border border-white/20 p-2" value={formBlock.roomId} onChange={(e) => setFormBlock((s) => ({ ...s, roomId: e.target.value }))}>
              <option value="">Room</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <input type="date" className="rounded bg-black/30 border border-white/20 p-2" value={formBlock.blockedDate} onChange={(e) => setFormBlock((s) => ({ ...s, blockedDate: e.target.value }))} />
            <input placeholder="Reason" className="col-span-2 rounded bg-black/30 border border-white/20 p-2" value={formBlock.reason} onChange={(e) => setFormBlock((s) => ({ ...s, reason: e.target.value }))} />
          </div>
          <button
            type="button"
            disabled={!canUpdate}
            className="rounded border border-amber-300/40 bg-amber-500/20 px-3 py-2"
            onClick={async () => {
              const res = await fetch(apiPath('admin/hospitality/blocked-dates'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formBlock),
              });
              if (!res.ok) return setMsg('Failed to add blocked date.');
              setMsg('Blocked date added.');
              setFormBlock({ roomId: '', blockedDate: '', reason: '' });
              await load();
            }}
          >
            Add blocked date
          </button>
          <div className="max-h-56 overflow-auto space-y-2 text-sm">
            {blocked.map((b) => (
              <div key={b.id} className="rounded border border-white/10 p-2">
                {b.room.name}: {new Date(b.blockedDate).toLocaleDateString()} {b.reason ? `(${b.reason})` : ''}
                <button
                  type="button"
                  disabled={!canUpdate}
                  className="ml-2 text-rose-300"
                  onClick={async () => {
                    await fetch(apiPath(`admin/hospitality/blocked-dates/${b.id}`), { method: 'DELETE', credentials: 'include' });
                    await load();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
        <h4 className="font-medium text-white">Payment transaction logs</h4>
        <div className="max-h-72 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-white/60">
              <tr>
                <th className="text-left py-1">Time</th>
                <th className="text-left py-1">Payment</th>
                <th className="text-left py-1">Provider</th>
                <th className="text-left py-1">Status</th>
                <th className="text-left py-1">Booking</th>
                <th className="text-left py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="py-1">{new Date(p.createdAt).toLocaleString()}</td>
                  <td className="py-1">{p.paymentRef}</td>
                  <td className="py-1">{p.provider}</td>
                  <td className="py-1">{p.status}</td>
                  <td className="py-1">{p.booking.bookingRef}</td>
                  <td className="py-1">{p.amountUsd} {p.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
