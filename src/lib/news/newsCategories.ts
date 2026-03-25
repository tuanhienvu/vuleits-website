export const NEWS_CATEGORIES = [
  'Politics',
  'Economy',
  'Technology',
  'Entertainment',
  'Science',
  'Sports',
  'Health',
  'Other',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

