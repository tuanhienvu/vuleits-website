import type { Metadata } from 'next';
import CookiePolicyPage from '@/components/pages/CookiePolicyPage';

export const metadata: Metadata = {
  title: 'Cookie Policy - VULE ITS',
  description: 'Cookie policy and how we use cookies',
};

export default function CookiesRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CookiePolicyPage />
    </div>
  );
}
