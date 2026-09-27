import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);

  const rows = await prisma.aboutTeamMember.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    include: {
      cv: {
        select: {
          id: true,
          isPublished: true,
          socialLinks: {
            select: { label: true, labelVi: true, url: true, displayOrder: true },
            orderBy: { displayOrder: 'asc' },
          },
        },
      },
    },
  });

  return NextResponse.json(
    rows.map((r) => {
      const published = Boolean(r.cv && r.cv.isPublished);
      const socialLinks = published
        ? (r.cv?.socialLinks ?? []).map((link) => ({
            label: pickLocalized(link.label, link.labelVi, locale),
            url: link.url,
          }))
        : [];
      return {
        id: r.id,
        emoji: r.emoji,
        name: pickLocalized(r.name, r.nameVi, locale),
        role: pickLocalized(r.role, r.roleVi, locale),
        bio: pickLocalized(r.bio, r.bioVi, locale),
        slug: r.slug ?? '',
        hasCv: published,
        socialLinks,
      };
    }),
  );
}
