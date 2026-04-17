'use client';

import BrandingLogo from './BrandingLogo';

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
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        marginBottom: 8,
      }}
    >
      {showLogo ? (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BrandingLogo
            src={logoUrl}
            alt=""
            sizes="50px"
            width={50}
            height={50}
            imgClassName="object-contain rounded-full"
            priority
          />
        </div>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          minWidth: 0,
          flex: '1 1 auto',
        }}
      >
        <h1
          className="font-zcool"
          style={{
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#1d1c63',
          }}
        >
          {companyName}
        </h1>
        {slogan ? (
          <p className="font-zcool backend-brand-slogan" style={{ margin: 0, fontSize: '1.125rem', letterSpacing: '0.03em' }}>
            {slogan}
          </p>
        ) : null}
      </div>
    </header>
  );
}
