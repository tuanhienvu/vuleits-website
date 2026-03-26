import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="glass p-8 rounded-2xl"><div className="text-white">Loading...</div></div>}>
      <DashboardClient />
    </Suspense>
  );
}
