'use client';

import ServicesListingExperience from '@/components/services/ServicesListingExperience';

// --- Sections: Hero | ServicesListingExperience ---

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4">
      {/* ==================== SERVICES HERO ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">Our Services</h1>
        <p className="text-fg-muted text-lg">
          Discover consulting, delivery, and implementation services with clear outcomes and feature breakdowns.
        </p>
      </section>
      {/* ==================== SERVICES LISTING ==================== */}
      <ServicesListingExperience />
    </div>
  );
}
