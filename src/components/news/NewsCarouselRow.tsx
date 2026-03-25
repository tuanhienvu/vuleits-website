'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type NewsCarouselCard = {
  id: number;
  slug: string;
  title: string;
  description: string;
  authorName: string;
  publishedAt: string | Date;
  thumbnailSrc: string | null;
  thumbnailAlt: string | null;
};

export default function NewsCarouselRow({
  items,
  autoStartDelayMs = 0,
}: {
  items: NewsCarouselCard[];
  // Used to stagger auto-slide timers across multiple carousels on the page.
  autoStartDelayMs?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const showControls = items.length > 3;
  const hoverRef = useRef(false);

  const updateControls = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const right = left + el.clientWidth;
    setCanPrev(left > 1);
    setCanNext(right < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateControls();

    const onScroll = () => updateControls();
    const onResize = () => updateControls();

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items.length]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const cards = useMemo(() => items, [items]);

  // Auto-advance the carousel when there are enough cards.
  useEffect(() => {
    if (!showControls) return;

    let intervalId: number | null = null;
    let timeoutId: number | null = null;

    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (hoverRef.current) return;
        const el = scrollerRef.current;
        if (!el) return;

        const left = el.scrollLeft;
        const nextLeft = left + el.clientWidth;
        const atEnd = nextLeft >= el.scrollWidth - el.clientWidth - 1;

        if (atEnd) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }

        el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
      }, 4000);
    }, Math.max(0, autoStartDelayMs));

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      if (intervalId != null) window.clearInterval(intervalId);
    };
  }, [showControls, autoStartDelayMs]);

  return (
    <div className="relative">
      {showControls ? (
        <div className="hidden md:flex absolute -top-11 right-0 gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous articles"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next articles"
          >
            →
          </button>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        className={[
          'flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        ].join(' ')}
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
      >
        {cards.map((a) => (
          <div
            key={a.id}
            className="shrink-0 snap-start basis-full md:basis-[calc((100%-32px)/3)]"
          >
            <Link
              href={`/news/${a.slug}`}
              className="block glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 h-full"
            >
              <div className="relative w-full h-24 rounded-lg overflow-hidden bg-white/10 mb-4">
                {a.thumbnailSrc ? (
                  <Image
                    src={a.thumbnailSrc}
                    alt={a.thumbnailAlt ?? a.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized={/^https?:\/\//i.test(a.thumbnailSrc)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">📰</div>
                )}
              </div>
              <p className="text-white font-semibold">{a.title}</p>
              <p className="text-white/70 text-sm mt-2">{a.description}</p>
              <p className="text-white/50 text-xs mt-3">
                {new Date(a.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-white/40 text-[11px] mt-1">{a.authorName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

