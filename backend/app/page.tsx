import BackendHomeBranding from '@/components/BackendHomeBranding';
import { getPublicCompanyBranding } from '@/lib/companyProfileBranding';

// --- Section: backend root page (branding + API hint) ---

export default async function BackendHomePage() {
  let companyName = 'VULE ITS';
  let slogan = 'Bring Your Success';
  let logoUrl = '';

  try {
    const b = await getPublicCompanyBranding();
    if (b.companyName.trim()) companyName = b.companyName.trim();
    if (b.slogan.trim()) slogan = b.slogan.trim();
    logoUrl = b.logoUrl.trim();
  } catch {
    /* DB unavailable — keep fallbacks */
  }

  return (
    <main style={{ padding: 24 }}>
      <BackendHomeBranding companyName={companyName} slogan={slogan} logoUrl={logoUrl} />
      <h4 style={{ margin: '24px 0 0', fontWeight: 600, fontSize: '1rem' }}>
        API server is running. Use /api/* endpoints.
      </h4>
    </main>
  );
}
