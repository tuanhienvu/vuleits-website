import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { readBackupFileBuffer } from '@/lib/systemMaintenance';

export async function GET(req: Request, ctx: { params: Promise<{ fileName: string }> }) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const { fileName } = await ctx.params;
  const file = await readBackupFileBuffer(fileName);
  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    },
  });
}
