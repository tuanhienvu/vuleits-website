export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: number;
};

const CONSENT_KEY = 'vuleits-consent-v1';

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent<ConsentState>('vuleits-consent-updated', { detail: state }));
}

export function acceptAllConsent(): void {
  saveConsent({ necessary: true, analytics: true, marketing: true, updatedAt: Date.now() });
}

export function rejectMarketingConsent(): void {
  saveConsent({ necessary: true, analytics: true, marketing: false, updatedAt: Date.now() });
}

export function openConsentPreferences(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('vuleits-consent-open'));
}

export { CONSENT_KEY };
