'use client';

import Image from 'next/image';

// Same behavior as frontend/components/BrandingLogo — kept here so the API app does not import the frontend package.

type BrandingLogoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Fixed dimensions avoid `fill` and the extra absolute-positioned layer from next/image */
  width?: number;
  height?: number;
  className?: string;
  /** Applied to the Image */
  imgClassName?: string;
  priority?: boolean;
};

export default function BrandingLogo({
  src,
  alt,
  sizes,
  width = 50,
  height = 50,
  className,
  imgClassName,
  priority,
}: BrandingLogoProps) {
  const remote = /^https?:\/\//i.test(src);
  return (
    <div className={className} style={{ display: 'block', lineHeight: 0 }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={imgClassName ?? 'object-contain rounded-full'}
        priority={priority}
        unoptimized={remote}
      />
    </div>
  );
}
