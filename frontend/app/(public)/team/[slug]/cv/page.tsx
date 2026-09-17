import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import TeamMemberCvView, {
  type TeamMemberCv,
} from '@/components/pages/team/TeamMemberCvView';
import { joinApiOrigin } from '@/lib/apiRoutes';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

const SITE_URL = 'https://vuleits.com';
const SERVER_LOCALE = 'en-US' as const;

type Props = {
  params: Promise<{ slug: string }>;
};

const fetchTeamMemberCv = cache(async (slug: string): Promise<TeamMemberCv | null> => {
  try {
    const endpoint = joinApiOrigin(
      publicApiBaseUrl(),
      `about/team/${encodeURIComponent(slug)}/cv`,
    );
    const response = await fetch(`${endpoint}?locale=${encodeURIComponent(SERVER_LOCALE)}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return (await response.json()) as TeamMemberCv;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cv = await fetchTeamMemberCv(slug);
  if (!cv) return {};

  const title = `${cv.name} — ${cv.title || cv.role}`;
  const description = cv.profileSummary.trim() || `${cv.name}, ${cv.title || cv.role}`;
  const canonical = `${SITE_URL}/team/${encodeURIComponent(cv.slug)}/cv`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'profile',
      url: canonical,
      title,
      description,
      images: cv.avatarUrl ? [{ url: cv.avatarUrl }] : undefined,
    },
    twitter: {
      card: cv.avatarUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: cv.avatarUrl ? [cv.avatarUrl] : undefined,
    },
  };
}

export default async function TeamMemberCvPage({ params }: Props) {
  const { slug } = await params;
  const cv = await fetchTeamMemberCv(slug);
  if (!cv) notFound();

  return <TeamMemberCvView initial={cv} initialLocale={SERVER_LOCALE} />;
}
