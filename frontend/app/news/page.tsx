import NewsPage from '@/components/pages/NewsPage';

// --- Public news listing (full-bleed background wrapper) ---

export const metadata = {
  title: 'News - VULE ITS',
  description: 'Latest news and updates',
};

export default function NewsListPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a] py-8">
      <NewsPage />
    </div>
  );
}
