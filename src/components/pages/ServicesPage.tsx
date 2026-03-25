'use client';

import { useEffect, useState } from 'react';
import { safeArray } from '@/lib/safe-array';

type ServiceItem = { icon: string; title: string; description: string; features: string[] };

function normalizeServices(raw: unknown): ServiceItem[] {
  const list = safeArray<unknown>(raw);
  return list.map((item) => {
    const s = item as Record<string, unknown>;
    let features: string[] = [];
    if (Array.isArray(s.features)) {
      features = s.features.map((x) => String(x));
    } else if (typeof s.features === 'string' && s.features.trim()) {
      try {
        const parsed = JSON.parse(s.features) as unknown;
        if (Array.isArray(parsed)) features = parsed.map((x) => String(x));
      } catch {
        // ignore invalid JSON
      }
    }
    return {
      icon: String(s.icon ?? ''),
      title: String(s.title ?? ''),
      description: String(s.description ?? ''),
      features,
    };
  });
}

export default function ServicesPage() {
  const fallbackServices = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Create stunning user interfaces with modern design principles, focusing on usability and aesthetic appeal.',
      features: ['User Research & Analysis', 'Wireframing & Prototyping', 'Visual Design & Branding', 'Responsive Design'],
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Build fast, secure, and scalable websites using the latest web technologies and best practices.',
      features: ['Frontend Development', 'Backend Integration', 'Performance Optimization', 'SEO Implementation'],
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Develop native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: ['iOS & Android Development', 'Cross-platform Solutions', 'App Store Optimization', 'Maintenance & Updates'],
    },
    {
      icon: '🚀',
      title: 'Digital Strategy',
      description: 'Strategic consulting to help your business thrive in the digital landscape with data-driven insights.',
      features: ['Digital Transformation', 'Analytics & Reporting', 'Growth Strategy', 'Technology Consulting'],
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Modernize your infrastructure with scalable cloud services and seamless migration strategies.',
      features: ['Cloud Migration', 'DevOps & Automation', 'Infrastructure as Code', '24/7 Monitoring'],
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Protect your digital assets with comprehensive security solutions and threat protection.',
      features: ['Security Auditing', 'Penetration Testing', 'Data Protection', 'Compliance Management'],
    },
  ];

  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) return;
        const data = await res.json();
        const normalized = normalizeServices(data);
        if (!cancelled && normalized.length > 0) {
          setServices(normalized);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-white/80 text-lg">Comprehensive design and development solutions tailored to your needs</p>
      </section>

      {/* ==================== SERVICES GRID SECTION ==================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <div key={index} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
            {/* Service Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-white font-semibold text-xl">{service.title}</h3>
            </div>

            {/* Service Description */}
            <div
              className="text-white/80 mb-4"
              // Allow embedded HTML/CSS/JS snippets pasted from the admin textarea.
              dangerouslySetInnerHTML={{ __html: service.description || '' }}
            />

            {/* Service Features List */}
            <ul className="space-y-2">
              {(service.features ?? []).map((feature, idx) => (
                <li key={idx} className="text-white/70 flex items-center gap-2">
                  <span className="text-purple-300">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: feature || '' }} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
