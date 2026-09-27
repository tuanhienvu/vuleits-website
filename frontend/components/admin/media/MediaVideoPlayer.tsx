'use client';

/**
 * Plyr-based video player for the admin media library preview modal.
 *
 * Why Plyr: lightweight MIT license, accessible controls, fullscreen, volume, keyboard.
 * CSS: `plyr/dist/plyr.css` — theming via `.media-preview-plyr` in `globals.css`.
 *
 * Extend: pass `options` prop if you need quality HLS later (requires plyr plugins / different setup).
 */

import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

type Props = {
  src: string;
  mimeType: string;
  /** Announced to screen readers */
  title: string;
};

export default function MediaVideoPlayer({ src, mimeType, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const video = root.querySelector('video');
    if (!video) return;

    const player = new Plyr(video, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'pip',
        'fullscreen',
      ],
      keyboard: { focused: true, global: false },
      tooltips: { controls: true, seek: true },
      fullscreen: { enabled: true, iosNative: true },
    });

    return () => {
      try {
        player.destroy();
      } catch {
        // ignore double-destroy
      }
    };
  }, [src, mimeType]);

  const type = mimeType?.trim() || 'video/mp4';

  return (
    <div ref={containerRef} className="media-preview-plyr w-full max-w-5xl rounded-lg overflow-hidden bg-black shadow-xl">
      <video className="w-full max-h-[min(80vh,900px)]" playsInline preload="metadata" title={title}>
        <source src={src} type={type} />
      </video>
    </div>
  );
}
