'use client';

export default function AboutPage() {
  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '3', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  const team = [
    { name: 'John Anderson', role: 'CEO & Founder', emoji: '👨‍💼', bio: 'Visionary leader with 15+ years in digital innovation, driving our mission to create exceptional user experiences.' },
    { name: 'Sarah Chen', role: 'Creative Director', emoji: '👩‍🎨', bio: 'Award-winning designer specializing in modern UI/UX, bringing artistic vision to every project.' },
    { name: 'Michael Torres', role: 'Lead Developer', emoji: '👨‍💻', bio: 'Full-stack expert passionate about clean code and innovative web technologies.' },
    { name: 'Emma Wilson', role: 'Senior Developer', emoji: '👩‍💻', bio: 'Frontend specialist with expertise in React and modern JavaScript frameworks.' },
    { name: 'David Kim', role: 'UX Designer', emoji: '👨‍🎨', bio: 'User experience expert focused on creating intuitive and accessible digital products.' },
    { name: 'Lisa Martinez', role: 'Project Manager', emoji: '👩‍💼', bio: 'Certified PMP with a track record of delivering complex projects on time and budget.' },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* ==================== ABOUT CONTENT SECTION ==================== */}
      <section className="mb-12">
        <div className="glass p-8 md:p-12 rounded-3xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Our Vision</h2>
          <div className="space-y-4 text-white/80">
            <p className="text-lg">
              We believe in creating digital experiences that feel natural and intuitive. Our glass morphism design philosophy combines transparency, depth, and subtle animations to create interfaces that users love to interact with.
            </p>
            <p className="text-lg">
              Founded in 2024, our team of designers and developers are passionate about pushing the boundaries of web design while maintaining accessibility and performance standards.
            </p>
            <p className="text-lg">
              Every project we undertake is crafted with attention to detail, ensuring that form follows function while never compromising on aesthetic beauty.
            </p>
          </div>
        </div>

        {/* ==================== STATISTICS CARDS AREA ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-white font-semibold text-xl mb-1">{member.name}</h3>
              <p className="text-purple-200 text-sm mb-3">{member.role}</p>
              <p className="text-white/70 text-sm mb-4">{member.bio}</p>
              
              {/* Team Member Social Links */}
              <div className="flex gap-3 justify-center text-xl">
                <a href="#" className="hover:scale-125 transition-transform">📧</a>
                <a href="#" className="hover:scale-125 transition-transform">💼</a>
                <a href="#" className="hover:scale-125 transition-transform">🎨</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
