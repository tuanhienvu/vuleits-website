import { NextResponse } from 'next/server';

function withCors(resp: Response) {
  const out = new Response(resp.body, resp);
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'https://vuleits.com';
  out.headers.set('Access-Control-Allow-Origin', frontendOrigin);
  out.headers.set('Access-Control-Allow-Credentials', 'true');
  out.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  out.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  out.headers.set('Vary', 'Origin');
  out.headers.set('X-Content-Type-Options', 'nosniff');
  out.headers.set('X-Frame-Options', 'DENY');
  out.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  out.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  return out;
}

async function dispatch(req: Request) {
  if (req.method === 'OPTIONS') return withCors(new NextResponse(null, { status: 204 }));
  // All known API endpoints are now native route files in apps/backend/app/api.
  // Keep this catch-all only as a CORS-aware fallback for unknown paths.
  return withCors(NextResponse.json({ error: 'Not found' }, { status: 404 }));
}

export async function GET(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
export async function POST(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
export async function PUT(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
export async function PATCH(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
export async function DELETE(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
export async function OPTIONS(req: Request, ctx: { params: Promise<{ segments: string[] }> }) {
  void ctx;
  return dispatch(req);
}
