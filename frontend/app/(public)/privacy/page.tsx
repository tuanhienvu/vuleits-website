import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy - VULE ITS',
  description: 'Privacy policy and practices',
};

export default function PrivacyRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PrivacyPolicyPage />
    </div>
  );
}
