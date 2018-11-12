import APIConfig from './api-config';

const apiUrlVersionLength = CONFIG.apiUrlVersionSuffix.length;

describe('APIConfig.create()', () => {
    test('apiUrl should end with the configured url version suffix', () => {
        const apiConfig = APIConfig.create({apiUrl: `someurlbase.com/${CONFIG.apiUrlVersionSuffix}`});
        expect(apiConfig.apiUrl.substring(apiConfig.apiUrl.length - 3, apiConfig.apiUrl.length))
            .toEqual(CONFIG.apiUrlVersionSuffix);
    });

    test('Given an url ending in /v0, APIConfig.create returns the url with the right url version suffix', () => {
        const apiConfig = APIConfig.create({apiUrl: 'someurlbase.com/v0'});
        expect(
            apiConfig.apiUrl
                .substring(apiConfig.apiUrl.length - apiUrlVersionLength, apiConfig.apiUrl.length))
            .toEqual(CONFIG.apiUrlVersionSuffix);
    });

    test('Given an url with no version specified, APIConfig returns the url with the right url version suffix', () => {
        const apiConfig = APIConfig.create({apiUrl: 'NOversion.com'});
        expect(apiConfig.apiUrl
            .substring(apiConfig.apiUrl.length - apiUrlVersionLength, apiConfig.apiUrl.length))
            .toEqual(CONFIG.apiUrlVersionSuffix);
    });
});
