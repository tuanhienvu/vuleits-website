export type HospitalityFeaturesConfig = {
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

export const defaultHospitalityFeatures: HospitalityFeaturesConfig = {
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
