import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function escapeXml(s: string): string {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vuleits.com';
  const now = new Date();
  const items = await prisma.news.findMany({
    where: {
      status: 'Active',
      OR: [{ publishedAt: { lte: now } }, { publishedAt: null, startDate: { lte: now } }, { publishedAt: null, startDate: null }],
    },
    orderBy: { publishedAt: 'desc' },
    take: 30,
    include: { author: { select: { displayName: true } }, image: { select: { url: true } } },
  });

  const rssItems = items
    .map((a) => {
      const effectiveDate = a.publishedAt ?? a.startDate ?? a.createdAt;
      const link = `${baseUrl}/news/${a.slug}`;
      const thumb = a.image?.url ?? '';
      const category = a.category ?? '';
      const description = `${a.description}${category ? ` (${category})` : ''}`;
      return `
        <item>
          <title>${escapeXml(a.title)}</title>
          <link>${escapeXml(link)}</link>
          <guid>${escapeXml(link)}</guid>
          <pubDate>${effectiveDate.toUTCString()}</pubDate>
          <description><![CDATA[${description}]]></description>
          ${thumb ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/">${escapeXml(thumb)}</media:thumbnail>` : ''}
          <author>${escapeXml(a.author?.displayName ?? '')}</author>
        </item>
      `.trim();
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>News</title>
    <link>${escapeXml(baseUrl + '/news')}</link>
    <description>Latest news and updates</description>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
