'use client';

import { useEffect, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';

/** True when the signed-in user may see the Company profile admin tab (ADMIN / SYSADMIN). */
export function useAdminCompanyProfileNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('admin/me'), { credentials: 'include' });
        if (!res.ok || cancelled) return;
        const d = (await res.json()) as { role?: { name?: string } | null };
        const n = (d.role?.name || '').toUpperCase();
        if (!cancelled) setShow(n === 'ADMIN' || n === 'SYSADMIN');
      } catch {
        if (!cancelled) setShow(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return show;
}
