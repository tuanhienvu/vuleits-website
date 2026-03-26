'use client';

import { useEffect, useState } from 'react';

type CompanyProfilePayload = {
  companyName?: string;
  slogan?: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default function AdminCompanyProfilePage() {
  const [data, setData] = useState<CompanyProfilePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/company-profile', { credentials: 'include' });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
          return;
        }
        const json = (await res.json()) as CompanyProfilePayload;
        if (!cancelled) setData(json);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="glass p-6 rounded-2xl text-white">Loading company profile...</div>;

  return (
    <section className="glass p-6 rounded-2xl">
      <h1 className="text-2xl font-bold text-white mb-4">Company Profile</h1>
      <div className="space-y-2 text-white/85">
        <p><span className="text-white/60">Company:</span> {data?.companyName ?? '-'}</p>
        <p><span className="text-white/60">Slogan:</span> {data?.slogan ?? '-'}</p>
        <p><span className="text-white/60">Email:</span> {data?.email ?? '-'}</p>
        <p><span className="text-white/60">Phone:</span> {data?.phone ?? '-'}</p>
        <p><span className="text-white/60">Address:</span> {data?.address ?? '-'}</p>
      </div>
    </section>
  );
}
