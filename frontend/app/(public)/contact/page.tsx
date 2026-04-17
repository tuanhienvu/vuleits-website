import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact - VULE ITS',
  description: 'Get in touch with VULE ITS',
};

export default function ContactRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactPage />
    </div>
  );
}
