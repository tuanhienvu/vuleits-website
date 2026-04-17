import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'VULE ITS - Bring Your Success',
  description: 'Bring Your Success',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomePage />
    </div>
  );
}
