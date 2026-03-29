'use client';

import Link from 'next/link';
import RelatedItemsFlipRow from '@/components/related/RelatedItemsFlipRow';

export type NewsRelatedArticle = {
  id: number;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
};

export default function NewsRelatedArticlesFlip({ related }: { related: NewsRelatedArticle[] }) {
  if (!related.length) {
    return <div className="glass rounded-2xl p-6 text-white/70">No related articles found.</div>;
  }

  return (
    <RelatedItemsFlipRow
      items={related}
      renderItem={(r) => (
        <Link
          href={`/news/${r.slug}`}
          className="glass flex h-full min-h-[140px] flex-col rounded-2xl p-4 transition-all hover:shadow-xl sm:min-h-[160px] sm:p-5"
        >
          <p className="line-clamp-2 font-semibold text-white">{r.title}</p>
          <p className="mt-2 line-clamp-2 text-sm text-white/70">{r.description}</p>
          <p className="mt-auto pt-3 text-xs text-white/50">{new Date(r.publishedAt).toLocaleDateString()}</p>
        </Link>
      )}
    />
  );
}
