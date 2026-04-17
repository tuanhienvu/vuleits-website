/**
 * Baseline CSP for the public Next.js app + TinyMCE admin (jsdelivr) + optional marketing pixels.
 * Extra directives can be appended via `NEXT_PUBLIC_CSP_EXTRA` (semicolon-separated, no trailing `;` required).
 */
export function buildFrontendContentSecurityPolicy(): string {
  const extra = process.env.NEXT_PUBLIC_CSP_EXTRA?.trim();

  const base = [
    "default-src 'self'",
    [
      'script-src',
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://cdn.jsdelivr.net',
      'https://www.googletagmanager.com',
      'https://connect.facebook.net',
      'https://analytics.tiktok.com',
    ].join(' '),
    ["style-src", "'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'].join(' '),
    ["img-src", "'self'", 'data:', 'blob:', 'https:', 'http:'].join(' '),
    ["font-src", "'self'", 'data:', 'https://cdn.jsdelivr.net', 'https://fonts.gstatic.com'].join(' '),
    [
      'connect-src',
      "'self'",
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://www.googletagmanager.com',
      'https://region1.google-analytics.com',
      'https://graph.facebook.com',
      'https://www.facebook.com',
      'https://analytics.tiktok.com',
      'https://analytics-ipv6.tiktok.com',
    ].join(' '),
    ["media-src", "'self'", 'blob:'].join(' '),
    [
      'frame-src',
      "'self'",
      'https://www.googletagmanager.com',
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
    ].join(' '),
    "worker-src 'self' blob:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  if (extra) {
    base.push(extra);
  }

  return base.join('; ');
}
