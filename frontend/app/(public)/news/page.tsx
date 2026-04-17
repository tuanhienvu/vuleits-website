import NewsPage from '@/components/pages/NewsPage';
import { joinApiOrigin } from '@/lib/apiRoutes';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

export const metadata = {
  title: 'News - VULE ITS',
  description: 'Latest news and updates',
};

type NewsInitialResponse = {
  items?: Array<{
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    publishedAt: string;
    authorName: string;
    thumbnailSrc: string | null;
    thumbnailAlt: string | null;
  }>;
};

async function fetchNewsInitialData() {
  try {
    const base = publicApiBaseUrl();
    const res = await fetch(joinApiOrigin(base, 'news?limit=100'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as NewsInitialResponse;
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export default async function NewsListPage() {
  const initialArticles = await fetchNewsInitialData();
  return (
    <div className="container mx-auto px-4 py-8">
      <NewsPage initialArticles={initialArticles} />
    </div>
  );
}
