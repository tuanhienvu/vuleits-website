'use client';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'news', label: 'News' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="glass flex items-center justify-between p-4 my-4 rounded-2xl">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <circle cx="16" cy="16" r="5" opacity="0.9"/>
                <circle cx="32" cy="16" r="4" opacity="0.8"/>
                <circle cx="16" cy="32" r="4" opacity="0.7"/>
                <circle cx="32" cy="32" r="5" opacity="0.85"/>
                <circle cx="24" cy="8" r="2" opacity="1"/>
                <circle cx="8" cy="24" r="2" opacity="0.9"/>
                <circle cx="40" cy="24" r="2" opacity="0.9"/>
                <circle cx="24" cy="40" r="2" opacity="1"/>
                <circle cx="8" cy="8" r="1" opacity="0.6"/>
                <circle cx="40" cy="8" r="1" opacity="0.6"/>
                <circle cx="8" cy="40" r="1" opacity="0.6"/>
                <circle cx="40" cy="40" r="1" opacity="0.6"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:inline">VULE ITS</span>
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                className={`text-white font-medium transition-all duration-300 pb-2 text-sm md:text-base ${
                  currentPage === item.id
                    ? 'border-b-2 border-white'
                    : 'hover:border-b-2 hover:border-white/50'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button className="cta-button text-sm px-3 py-2">Admin</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
