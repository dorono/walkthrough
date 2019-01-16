import {trackNotSuccessfulConnection, trackPageView, trackSuccessfulConnection} from './analytics';

beforeEach(() => {
    global.dataLayer = [];
});

describe('trackNotSuccessfulConnection', () => {
    it('should call trackPageView', () => {
        const dataLayerItem = {
            event: 'virtual_pageview',
            virtualPagePath: '/virtual/settings-popup/error/type',
        };
        trackNotSuccessfulConnection('type');
        // eslint-disable-next-line
        expect(dataLayer).toContainEqual(dataLayerItem);
    });
});

describe('trackPageView', () => {
    it('should add a page view to the dataLayer', () => {
        const url = 'https://someurl.com';
        const dataLayerItem = {
            event: 'virtual_pageview',
            virtualPagePath: url,
        };
        trackPageView(url);
        // eslint-disable-next-line
        expect(dataLayer).toContainEqual(dataLayerItem);
    });
});

describe('trackSuccessfulConnection', () => {
    it('should add the virtual page view to the dataLayer', () => {
        const dataLayerItem = {event: 'virtual_pageview', virtualPagePath: '/virtual/settings-popup/success'};
        trackSuccessfulConnection({});
        // eslint-disable-next-line
        expect(dataLayer).toContainEqual(dataLayerItem);
    });
});
