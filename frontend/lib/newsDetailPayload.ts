/** Shared types for news article detail API + client view. */

export type NewsArticleDetail = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  authorName: string;
  thumbnailSrc: string | null;
  thumbnailAlt: string | null;
  contentHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
};

export type NewsDetailPayload = {
  article: NewsArticleDetail;
  related: Array<{
    id: number;
    title: string;
    slug: string;
    description: string;
    publishedAt: string;
  }>;
};
