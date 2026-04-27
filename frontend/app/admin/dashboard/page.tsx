import { Suspense } from 'react';
import DashboardClient from './DashboardClient';
import AdminPageSuspenseFallback from '@/components/admin/AdminPageSuspenseFallback';

// --- Admin dashboard: Suspense-wrapped tabbed client shell ---

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminPageSuspenseFallback />}>
      <DashboardClient />
    </Suspense>
  );
}
