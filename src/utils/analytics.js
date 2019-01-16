export const trackPageView = virtualPagePath => window.dataLayer.push({
    event: 'virtual_pageview',
    virtualPagePath,
});

export const trackSuccessfulConnection = apiConfig => {
    window.dataLayer.push({
        targetBlockchain: apiConfig.blockchain,
        apiUrl: apiConfig.apiUrl,
        appId: apiConfig.appId,
        usingOwnCredentials: !!apiConfig.appId,
        metric4: 1,
    });
    trackPageView('/virtual/settings-popup/success');
    window.dataLayer.push({
        metric4: 0,
    });
};

export const trackNotSuccessfulConnection = (type) => {
    window.dataLayer.push({
        metric3: 1,
    });
    trackPageView(`/virtual/settings-popup/error/${type}`);
    window.dataLayer.push({
        metric3: 0,
    });
};

