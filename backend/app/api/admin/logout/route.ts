import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { authCookieSecure } from '@/lib/authCookieSecure';

export async function POST(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  const response = NextResponse.json({ ok: true, message: 'Logged out' });
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: authCookieSecure(),
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}
