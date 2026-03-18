'use client';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="relative z-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="glass p-6 rounded-2xl mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* ==================== FOOTER LINKS AREA ==================== */}
            <div className="flex gap-6 flex-wrap justify-center md:justify-start text-sm">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-white hover:text-white/80 transition-colors">About</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }} className="text-white hover:text-white/80 transition-colors">Privacy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('terms'); }} className="text-white hover:text-white/80 transition-colors">Terms</a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">Sitemap</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className="text-white hover:text-white/80 transition-colors">Contact</a>
            </div>

            {/* ==================== COPYRIGHT & INFO AREA ==================== */}
            <div className="text-white text-sm text-center md:text-right">
              <p className="font-zcool">&copy; 2025 VULE ITS. All rights reserved.</p>
              {/* <p className="text-white/70">Powered by modern web technologies</p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
