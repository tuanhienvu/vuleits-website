/** Map URL path to the public nav “section” id used for active styles. */

export function publicNavSectionId(pathname: string | null): string {
  const p = pathname || '/';
  if (p === '/') return 'home';
  if (p.startsWith('/products')) return 'products';
  if (p.startsWith('/news')) return 'news';
  if (p.startsWith('/services')) return 'services';
  if (p === '/about' || p.startsWith('/about/')) return 'about';
  if (p === '/contact' || p.startsWith('/contact/')) return 'contact';
  if (p === '/privacy' || p.startsWith('/privacy/')) return 'privacy';
  if (p === '/terms' || p.startsWith('/terms/')) return 'terms';
  return 'home';
}

export function publicSectionHref(id: string): string {
  switch (id) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'products':
      return '/products';
    case 'news':
      return '/news';
    case 'services':
      return '/services';
    default:
      return '/';
  }
}
