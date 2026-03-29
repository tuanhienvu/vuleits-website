'use client';

import Image from 'next/image';

// --- Section: company logo (Next/Image, remote unoptimized when http(s)) ---

type BrandingLogoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Outer box must be sized (e.g. `w-10 h-10 relative shrink-0`) */
  className?: string;
  /** Applied to the Image */
  imgClassName?: string;
  priority?: boolean;
};

export default function BrandingLogo({ src, alt, sizes, className, imgClassName, priority }: BrandingLogoProps) {
  const remote = /^https?:\/\//i.test(src);
  return (
    <div className={className ? `${className} relative` : 'relative'}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={imgClassName ?? 'object-contain rounded-full'}
        priority={priority}
        unoptimized={remote}
      />
    </div>
  );
}
