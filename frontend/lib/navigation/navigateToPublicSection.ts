'use client';

import { PUBLIC_SECTION_STORAGE_KEY } from '@/lib/navigation/publicSectionStorage';

/**
 * On the SPA root (`/`), switch sections via `setCurrentPage`.
 * On real routes (`/products/...`, `/news/...`), use `router.push` so the URL updates.
 */
export function navigateToPublicSection(
  sectionId: string,
  pathname: string,
  setCurrentPage: (page: string) => void,
  router: { push: (href: string) => void },
) {
  try {
    sessionStorage.setItem(PUBLIC_SECTION_STORAGE_KEY, sectionId);
  } catch {
    // ignore
  }

  const path = pathname || '/';
  if (path === '/') {
    setCurrentPage(sectionId);
    return;
  }

  switch (sectionId) {
    case 'home':
      router.push('/');
      break;
    case 'products':
      router.push('/products');
      break;
    case 'news':
      router.push('/news');
      break;
    case 'services':
      router.push('/services');
      break;
    case 'about':
    case 'contact':
    case 'privacy':
    case 'terms':
      router.push('/');
      break;
    default:
      router.push('/');
  }
}
