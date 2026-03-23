import { NextResponse } from 'next/server';
import { getPublicCompanyBranding } from '@/lib/companyProfileBranding';

export async function GET() {
  const branding = await getPublicCompanyBranding();
  return NextResponse.json(branding, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
