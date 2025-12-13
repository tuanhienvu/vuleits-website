'use client';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const features = [
    { icon: '✨', title: 'Modern Design', description: 'Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.' },
    { icon: '⚡', title: 'Fast Performance', description: 'Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices.' },
    { icon: '📱', title: 'Responsive', description: 'Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.' },
    { icon: '🎨', title: 'Interactive UI', description: 'Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.' },
    { icon: '🔒', title: 'Secure & Safe', description: 'Built with modern security standards and best practices to ensure your data and user privacy are protected.' },
    { icon: '🚀', title: 'Easy Integration', description: 'Simple to implement and customize for any project with clean, well-documented code and flexible components.' },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to the Future
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Experience cutting-edge glass morphism design that brings depth and elegance to modern web interfaces. Clean, translucent, and beautifully interactive.
          </p>
          <button 
            onClick={() => setCurrentPage('about')}
            className="cta-button"
          >
            Learn More
          </button>
        </div>
        
        {/* Hero Image Area */}
        <div className="flex-1 h-64 bg-white/10 rounded-2xl flex items-center justify-center">
          <div className="text-6xl">🎨</div>
        </div>
      </section>

      {/* ==================== FEATURES GRID SECTION ==================== */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
