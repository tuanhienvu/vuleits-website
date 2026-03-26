'use client';

import ServicesListingExperience from '@/components/services/ServicesListingExperience';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4">
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-white/80 text-lg">
          Discover consulting, delivery, and implementation services with clear outcomes and feature breakdowns.
        </p>
      </section>
      <ServicesListingExperience />
    </div>
  );
}
