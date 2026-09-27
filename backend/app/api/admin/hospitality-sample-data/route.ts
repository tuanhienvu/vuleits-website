import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { generateHospitalitySampleData } from '@/lib/hospitalitySampleData';

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;

  const summary = await generateHospitalitySampleData();
  return NextResponse.json({ ok: true, summary });
}
