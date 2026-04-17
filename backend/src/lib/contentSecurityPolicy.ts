/**
 * CSP for the API app: mostly JSON; keeps default execution surfaces closed.
 * Adjust here if you add HTML or embed routes on the same host.
 */
export function buildApiContentSecurityPolicy(): string {
  return [
    "default-src 'none'",
    "script-src 'none'",
    "style-src 'none'",
    "img-src 'none'",
    "font-src 'none'",
    "connect-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
}
