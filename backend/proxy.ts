import { NextResponse, type NextRequest } from 'next/server';

function allowedOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function corsHeadersFor(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  };
}

function securityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin')?.trim() ?? '';
  const allowlist = allowedOrigins();
  const isAllowedOrigin = !!origin && allowlist.includes(origin);

  if (request.method === 'OPTIONS') {
    if (origin && !isAllowedOrigin) {
      return new NextResponse('Origin not allowed', { status: 403 });
    }
    const res = new NextResponse(null, { status: 204 });
    if (isAllowedOrigin) {
      const cors = corsHeadersFor(origin);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    }
    const sec = securityHeaders();
    for (const [k, v] of Object.entries(sec)) res.headers.set(k, v);
    return res;
  }

  const res = NextResponse.next();
  if (isAllowedOrigin) {
    const cors = corsHeadersFor(origin);
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
  }
  const sec = securityHeaders();
  for (const [k, v] of Object.entries(sec)) res.headers.set(k, v);
  return res;
}

export const config = {
  matcher: ['/api/:path*'],
};
