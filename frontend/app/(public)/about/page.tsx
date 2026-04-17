import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About - VULE ITS',
  description: 'About VULE ITS and our mission',
};

export default function AboutRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AboutPage />
    </div>
  );
}
