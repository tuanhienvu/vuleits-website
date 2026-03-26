'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { safeArray } from '@/lib/safe-array';
import { useLocale } from '@/components/providers/LocaleProvider';
import { defaultAboutIntroPayload, toPublicIntro } from '@/lib/aboutIntroSetting';

type StatRow = { number: string; label: string };
type TeamRow = { name: string; role: string; emoji: string; bio: string };

function normalizeStats(raw: unknown): StatRow[] {
  return safeArray<unknown>(raw).map((item) => {
    const s = item as Record<string, unknown>;
    return { number: String(s.number ?? ''), label: String(s.label ?? '') };
  });
}

function normalizeTeam(raw: unknown): TeamRow[] {
  return safeArray<unknown>(raw).map((item) => {
    const m = item as Record<string, unknown>;
    return {
      name: String(m.name ?? ''),
      role: String(m.role ?? ''),
      emoji: String(m.emoji ?? ''),
      bio: String(m.bio ?? ''),
    };
  });
}

type AboutIntro = {
  title: string;
  bodyHtml: string;
  paragraphs: string[];
  heroImageUrl: string | null;
  heroImageAlt: string;
};

export default function AboutPage() {
  const { locale } = useLocale();
  const [intro, setIntro] = useState<AboutIntro | null>(null);
  const introFallback = toPublicIntro(defaultAboutIntroPayload(), locale);

  function parseIntroJson(j: Record<string, unknown>): AboutIntro {
    const title = typeof j.title === 'string' ? j.title : '';
    const bodyHtml = typeof j.bodyHtml === 'string' ? j.bodyHtml : '';
    const paragraphs = Array.isArray(j.paragraphs)
      ? j.paragraphs.map((x) => String(x ?? '').trim()).filter(Boolean)
      : [];
    const heroImageUrl =
      j.heroImageUrl != null && String(j.heroImageUrl).trim() ? String(j.heroImageUrl).trim() : null;
    const heroImageAlt = typeof j.heroImageAlt === 'string' ? j.heroImageAlt : '';
    return { title, bodyHtml, paragraphs, heroImageUrl, heroImageAlt };
  }

  const fallbackStats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '3', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  const fallbackTeam = [
    { name: 'John Anderson', role: 'CEO & Founder', emoji: '👨‍💼', bio: 'Visionary leader with 15+ years in digital innovation, driving our mission to create exceptional user experiences.' },
    { name: 'Sarah Chen', role: 'Creative Director', emoji: '👩‍🎨', bio: 'Award-winning designer specializing in modern UI/UX, bringing artistic vision to every project.' },
    { name: 'Michael Torres', role: 'Lead Developer', emoji: '👨‍💻', bio: 'Full-stack expert passionate about clean code and innovative web technologies.' },
    { name: 'Emma Wilson', role: 'Senior Developer', emoji: '👩‍💻', bio: 'Frontend specialist with expertise in React and modern JavaScript frameworks.' },
    { name: 'David Kim', role: 'UX Designer', emoji: '👨‍🎨', bio: 'User experience expert focused on creating intuitive and accessible digital products.' },
    { name: 'Lisa Martinez', role: 'Project Manager', emoji: '👩‍💼', bio: 'Certified PMP with a track record of delivering complex projects on time and budget.' },
  ];

  const [stats, setStats] = useState<StatRow[]>(fallbackStats);
  const [team, setTeam] = useState<TeamRow[]>(fallbackTeam);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsRes, teamRes, introRes] = await Promise.all([
          fetch('/api/about/stats'),
          fetch('/api/about/team'),
          fetch(`/api/about/intro?locale=${encodeURIComponent(locale)}`),
        ]);
        if (!cancelled) {
          if (statsRes.ok) {
            const s = await statsRes.json();
            const ns = normalizeStats(s);
            if (ns.length > 0) setStats(ns);
          }
          if (teamRes.ok) {
            const t = await teamRes.json();
            const nt = normalizeTeam(t);
            if (nt.length > 0) setTeam(nt);
          }
          if (introRes.ok) {
            const j = (await introRes.json()) as Record<string, unknown>;
            setIntro(parseIntroJson(j));
          }
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className="container mx-auto px-4">
      {/* ==================== ABOUT CONTENT SECTION ==================== */}
      <section className="mb-12">
        <div className="glass p-8 md:p-12 rounded-3xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{intro?.title || introFallback.title}</h2>
          {(() => {
            const heroUrl = intro?.heroImageUrl ?? introFallback.heroImageUrl;
            const heroAlt = intro?.heroImageAlt ?? introFallback.heroImageAlt;
            if (!heroUrl) return null;
            const remote = /^https?:/i.test(heroUrl);
            return (
              <div className="relative w-full max-w-3xl mx-auto aspect-video max-h-80 mb-6 rounded-2xl overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src={heroUrl}
                  alt={heroAlt || (locale === 'vi-VN' ? 'Hình minh họa' : 'Illustration')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42rem"
                  unoptimized={remote}
                />
              </div>
            );
          })()}
          <div className="text-white/80 text-lg">
            {(() => {
              const html = (intro?.bodyHtml ?? introFallback.bodyHtml)?.trim() ?? '';
              if (html) {
                return (
                  <div
                    className="about-intro-rich max-w-none [&_a]:text-purple-200 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-white/25 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h4]:text-lg [&_h4]:font-semibold [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              }
              const paras = intro?.paragraphs?.length ? intro.paragraphs : introFallback.paragraphs;
              return (
                <div className="space-y-4">
                  {paras.map((text, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {text}
                    </p>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* ==================== STATISTICS CARDS AREA ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index: number) => (
            <div key={index} className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index: number) => (
            <div key={index} className="glass p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-white font-semibold text-xl mb-1">{member.name}</h3>
              <p className="text-purple-200 text-sm mb-3">{member.role}</p>
              <p className="text-white/70 text-sm mb-4">{member.bio}</p>
              
              {/* Team Member Social Links */}
              <div className="flex gap-3 justify-center text-xl">
                <a href="#" className="hover:scale-125 transition-transform">📧</a>
                <a href="#" className="hover:scale-125 transition-transform">💼</a>
                <a href="#" className="hover:scale-125 transition-transform">🎨</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
