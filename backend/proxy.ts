import { NextResponse, type NextRequest } from 'next/server';
import { log } from './src/lib/logger';

function allowedOrigins(): string[] {
  return ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://vuleits.com', 'https://www.vuleits.com'];
}
const ALLOWED_ORIGINS = new Set(allowedOrigins());

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
  const requestId =
    request.headers.get('x-request-id')?.trim() ||
    request.headers.get('x-correlation-id')?.trim() ||
    globalThis.crypto.randomUUID();

  const origin = request.headers.get('origin')?.trim() ?? '';
  const isAllowedOrigin = !!origin && ALLOWED_ORIGINS.has(origin);

  if (request.method === 'OPTIONS') {
    if (origin && !isAllowedOrigin) {
      const denied = new NextResponse('Origin not allowed', { status: 403 });
      denied.headers.set('x-request-id', requestId);
      return denied;
    }
    const res = new NextResponse(null, { status: 204 });
    if (isAllowedOrigin) {
      const cors = corsHeadersFor(origin);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    }
    const sec = securityHeaders();
    for (const [k, v] of Object.entries(sec)) res.headers.set(k, v);
    res.headers.set('x-request-id', requestId);
    return res;
  }

  const res = NextResponse.next();
  if (isAllowedOrigin) {
    const cors = corsHeadersFor(origin);
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
  }
  const sec = securityHeaders();
  for (const [k, v] of Object.entries(sec)) res.headers.set(k, v);
  res.headers.set('x-request-id', requestId);

  if (process.env.LOG_HTTP_ACCESS === '1' || process.env.LOG_HTTP_ACCESS === 'true') {
    const u = new URL(request.url);
    log.info('http.request', {
      trace: { id: requestId },
      http: {
        request: {
          method: request.method,
          id: requestId,
        },
      },
      url: { path: u.pathname, query: u.search || undefined },
      event: { category: 'web', action: 'request' },
    });
  }

  return res;
}

/** `matcher` must use static string literals (Next compile-time parsing). */
export const config = {
  matcher: ['/api/:path*'],
};
