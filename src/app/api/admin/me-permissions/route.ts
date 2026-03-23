import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { getEffectiveFeatureMatrix } from '@/lib/effectivePermissions';
import { prisma } from '@/lib/prisma';
import { canAccessUsersModule } from '@/lib/adminUsersModule';

/** Current user's effective feature × CRUD matrix (for admin UI gating). */
export async function GET(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  const features = await getEffectiveFeatureMatrix(auth.user.id);
  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    include: { role: { select: { name: true } } },
  });
  if (user?.role && !canAccessUsersModule(user.role.name)) {
    const none = { create: false, read: false, update: false, delete: false };
    features.users = { ...none };
    features.userPassword = { ...none };
    features.permissions = { ...none };
  }
  return NextResponse.json({ features });
}
