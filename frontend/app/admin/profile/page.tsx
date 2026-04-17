'use client';

import { useEffect, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';

type Me = {
  id: number;
  email: string;
  displayName: string | null;
  roleId: number;
  role: { name: string } | null;
};

// --- Sections: Load admin/me | Profile summary ---

export default function AdminProfilePage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('admin/me'), { credentials: 'include' });
        if (!res.ok) {
          window.location.href = '/admin/login';
          return;
        }
        const data = (await res.json()) as Me;
        if (!cancelled) setMe(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="glass p-6 rounded-2xl text-white">Loading profile...</div>;

  return (
    <section className="glass p-6 rounded-2xl">
      {/* ==================== PROFILE DETAILS ==================== */}
      <h1 className="text-2xl font-bold text-white mb-4">My Profile</h1>
      <div className="space-y-2 text-white/85">
        <p><span className="text-white/60">Email:</span> {me?.email ?? '-'}</p>
        <p><span className="text-white/60">Display name:</span> {me?.displayName ?? '-'}</p>
        <p><span className="text-white/60">Role:</span> {me?.role?.name ?? '-'}</p>
      </div>
    </section>
  );
}
