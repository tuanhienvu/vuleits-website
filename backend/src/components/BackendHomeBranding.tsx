'use client';

import BrandingLogo from '../../../frontend/components/BrandingLogo';

type Props = {
  logoUrl: string;
  companyName: string;
  slogan: string;
};

export default function BackendHomeBranding({ logoUrl, companyName, slogan }: Props) {
  const showLogo = logoUrl.trim().length > 0;
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 8,
      }}
    >
      {showLogo ? (
        <div style={{ width: 56, height: 56, flexShrink: 0 }}>
          <BrandingLogo
            src={logoUrl}
            alt=""
            sizes="56px"
            className="backend-root-logo"
            imgClassName="object-contain rounded-full"
            priority
          />
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <h1
          className="font-zcool"
          style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.02em' }}
        >
          {companyName}
        </h1>
        {slogan ? (
          <p
            className="font-zcool"
            style={{ margin: 0, fontSize: '1.125rem', opacity: 0.88, letterSpacing: '0.03em' }}
          >
            {slogan}
          </p>
        ) : null}
      </div>
    </header>
  );
}
