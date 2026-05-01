export const HOSPITALITY_FEATURES_SETTING_KEY = 'hospitality_features';

export type HospitalityFeaturesPayload = {
  chatboxEnabled: boolean;
  bookingEnabled: boolean;
  paymentEnabled: boolean;
  navStaysEnabled: boolean;
  navBookEnabled: boolean;
  navServicesEnabled: boolean;
  bookingCalendarEnabled: boolean;
  guestStoriesEnabled: boolean;
  customerDashboardEnabled: boolean;
  chatbotAutoReplyScript: string;
  chatbotEscalationEmail: string;
  paymentProviders: {
    stripe: boolean;
    paypal: boolean;
    localGateway: boolean;
  };
};

const defaults: HospitalityFeaturesPayload = {
  chatboxEnabled: true,
  bookingEnabled: true,
  paymentEnabled: true,
  navStaysEnabled: true,
  navBookEnabled: true,
  navServicesEnabled: true,
  bookingCalendarEnabled: true,
  guestStoriesEnabled: true,
  customerDashboardEnabled: true,
  chatbotAutoReplyScript:
    'Hello, thank you for contacting us. Share your stay dates and property type, and our concierge will assist you.',
  chatbotEscalationEmail: 'support@vuleits.com',
  paymentProviders: {
    stripe: true,
    paypal: true,
    localGateway: true,
  },
};

function toBool(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
    if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  }
  return fallback;
}

export function parseHospitalityFeaturesJson(raw: string | null | undefined): HospitalityFeaturesPayload {
  if (!raw) return { ...defaults };
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const providers =
      parsed.paymentProviders && typeof parsed.paymentProviders === 'object'
        ? (parsed.paymentProviders as Record<string, unknown>)
        : {};
    const autoReply =
      typeof parsed.chatbotAutoReplyScript === 'string'
        ? parsed.chatbotAutoReplyScript.trim()
        : defaults.chatbotAutoReplyScript;
    const escalationEmail =
      typeof parsed.chatbotEscalationEmail === 'string'
        ? parsed.chatbotEscalationEmail.trim()
        : defaults.chatbotEscalationEmail;
    return {
      chatboxEnabled: toBool(parsed.chatboxEnabled, defaults.chatboxEnabled),
      bookingEnabled: toBool(parsed.bookingEnabled, defaults.bookingEnabled),
      paymentEnabled: toBool(parsed.paymentEnabled, defaults.paymentEnabled),
      navStaysEnabled: toBool(parsed.navStaysEnabled, defaults.navStaysEnabled),
      navBookEnabled: toBool(parsed.navBookEnabled, defaults.navBookEnabled),
      navServicesEnabled: toBool(parsed.navServicesEnabled, defaults.navServicesEnabled),
      bookingCalendarEnabled: toBool(parsed.bookingCalendarEnabled, defaults.bookingCalendarEnabled),
      guestStoriesEnabled: toBool(parsed.guestStoriesEnabled, defaults.guestStoriesEnabled),
      customerDashboardEnabled: toBool(parsed.customerDashboardEnabled, defaults.customerDashboardEnabled),
      chatbotAutoReplyScript: autoReply || defaults.chatbotAutoReplyScript,
      chatbotEscalationEmail: escalationEmail || defaults.chatbotEscalationEmail,
      paymentProviders: {
        stripe: toBool(providers.stripe, defaults.paymentProviders.stripe),
        paypal: toBool(providers.paypal, defaults.paymentProviders.paypal),
        localGateway: toBool(providers.localGateway, defaults.paymentProviders.localGateway),
      },
    };
  } catch {
    return { ...defaults };
  }
}

export async function getHospitalityFeaturesFromSettings(db: {
  siteSetting: {
    findUnique: (args: { where: { key: string } }) => Promise<{ value: string | null } | null>;
  };
}): Promise<HospitalityFeaturesPayload> {
  const row = await db.siteSetting.findUnique({
    where: { key: HOSPITALITY_FEATURES_SETTING_KEY },
  });
  return parseHospitalityFeaturesJson(row?.value ?? null);
}
