import { NextRequest, NextResponse } from 'next/server';
import { authorize, userHasPermission } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import {
  cvInclude,
  ensureUniqueMemberSlug,
  parseCvUpsertBody,
  serializeAdminCv,
} from '@/lib/teamMemberCv';

type Ctx = { params: Promise<{ id: string }> };

async function parseMemberId(params: Ctx['params']): Promise<number | null> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  return Number.isFinite(id) ? id : null;
}

async function memberCvAccess(req: NextRequest, id: number, permission: 'aboutTeam.read' | 'aboutTeam.update') {
  const auth = await authorize(req);
  if (auth.error || !auth.user) return { error: auth.error ?? NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };

  const member = await prisma.aboutTeamMember.findUnique({
    where: { id },
    include: { cv: { include: cvInclude } },
  });
  if (!member) return { error: NextResponse.json({ error: 'Not found' }, { status: 404 }) };

  const ownsProfile = member.userId === auth.user.id;
  if (!ownsProfile && !(await userHasPermission(auth.user.id, permission))) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { member };
}

export async function GET(req: NextRequest, { params }: Ctx) {
  const id = await parseMemberId(params);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const access = await memberCvAccess(req, id, 'aboutTeam.read');
  if (access.error || !access.member) return access.error ?? NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ cv: access.member.cv ? serializeAdminCv(access.member.cv) : null });
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const id = await parseMemberId(params);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const access = await memberCvAccess(req, id, 'aboutTeam.update');
  if (access.error) return access.error;

  const body = await req.json().catch(() => ({}));
  const parsed = parseCvUpsertBody(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const member = await prisma.aboutTeamMember.findUnique({
    where: { id },
    select: { id: true, name: true, slug: true },
  });
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const slug = member.slug ?? await ensureUniqueMemberSlug(prisma, member.name, member.id);
  const {
    skills,
    experiences,
    educations,
    certifications,
    languages,
    socialLinks,
    ...cvData
  } = parsed.data;

  const cv = await prisma.$transaction(async (tx) => {
    if (!member.slug) {
      await tx.aboutTeamMember.update({
        where: { id },
        data: { slug },
      });
    }

    const saved = await tx.aboutTeamMemberCV.upsert({
      where: { teamMemberId: id },
      create: { teamMemberId: id, ...cvData },
      update: cvData,
      select: { id: true },
    });
    const cvId = saved.id;

    await Promise.all([
      tx.aboutTeamMemberCvSkill.deleteMany({ where: { cvId } }),
      tx.aboutTeamMemberCvExperience.deleteMany({ where: { cvId } }),
      tx.aboutTeamMemberCvEducation.deleteMany({ where: { cvId } }),
      tx.aboutTeamMemberCvCertification.deleteMany({ where: { cvId } }),
      tx.aboutTeamMemberCvLanguage.deleteMany({ where: { cvId } }),
      tx.aboutTeamMemberCvSocialLink.deleteMany({ where: { cvId } }),
    ]);

    await Promise.all([
      tx.aboutTeamMemberCvSkill.createMany({ data: skills.map((item) => ({ cvId, ...item })) }),
      tx.aboutTeamMemberCvExperience.createMany({ data: experiences.map((item) => ({ cvId, ...item })) }),
      tx.aboutTeamMemberCvEducation.createMany({ data: educations.map((item) => ({ cvId, ...item })) }),
      tx.aboutTeamMemberCvCertification.createMany({ data: certifications.map((item) => ({ cvId, ...item })) }),
      tx.aboutTeamMemberCvLanguage.createMany({ data: languages.map((item) => ({ cvId, ...item })) }),
      tx.aboutTeamMemberCvSocialLink.createMany({ data: socialLinks.map((item) => ({ cvId, ...item })) }),
    ]);

    return tx.aboutTeamMemberCV.findUniqueOrThrow({
      where: { id: cvId },
      include: cvInclude,
    });
  });

  return NextResponse.json({ ok: true, cv: serializeAdminCv(cv) });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const auth = await authorize(req, 'aboutTeam.delete');
  if (auth.error) return auth.error;

  const id = await parseMemberId(params);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const member = await prisma.aboutTeamMember.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.aboutTeamMemberCV.deleteMany({ where: { teamMemberId: id } });
  return NextResponse.json({ ok: true });
}
