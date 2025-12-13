'use client';

export default function ServicesPage() {
  const services = [
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

  return (
    <div className="container mx-auto px-4">
      {/* Hero */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-white/80 text-lg">Comprehensive design and development solutions tailored to your needs</p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <div key={index} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-white font-semibold text-xl">{service.title}</h3>
            </div>
            <p className="text-white/80 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-white/70 flex items-center gap-2">
                  <span className="text-purple-300">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
