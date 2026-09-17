import { NextResponse } from 'next/server';
import { parseLocaleQuery } from '@/lib/i18nContent';
import { prisma } from '@/lib/prisma';
import { cvInclude, serializePublicCv } from '@/lib/teamMemberCv';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(String(rawSlug ?? '').trim());
  const locale = parseLocaleQuery(new URL(req.url).searchParams);

  const member = await prisma.aboutTeamMember.findUnique({
    where: { slug },
    include: { cv: { include: cvInclude } },
  });

  if (!member || !member.isActive || !member.cv?.isPublished) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(serializePublicCv(member, member.cv, locale));
}
