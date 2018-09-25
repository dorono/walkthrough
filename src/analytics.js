export const trackPageView = path => window.ga('send', 'pageview', path);

export const trackEvent = (category, action) => window.ga('send', 'event', category, action);

export const trackAccessConnectLandingPage = () => trackEvent('connect_landing_page', 'access');

export const trackSuccessfulConnection = () => trackEvent('blockchain_settings', 'connection_success');

