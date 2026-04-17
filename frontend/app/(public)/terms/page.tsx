import type { Metadata } from 'next';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';

export const metadata: Metadata = {
  title: 'Terms - VULE ITS',
  description: 'Terms and conditions',
};

export default function TermsRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TermsOfServicePage />
    </div>
  );
}
