import {addPaginationParams, request} from './index';

const url = `${CONFIG.apiUrl}${CONFIG.apiUrlVersionSuffix}`;
const apiConfig = {apiUrl: CONFIG.apiUrl};
const apiConfigWithAppIdAndAppKey = {apiUrl: CONFIG.apiUrl, appId: 'test', appKey: 'test'};

const mockFetch = (data) => {
    return jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => data,
        }),
    );
};

const mockUnsuccessfulFetch = () => jest.fn().mockImplementation(() =>
        Promise.resolve({status: 404}));

describe('api.request', () => {
    it('should return an object with an id property', async () => {
        const data = {id: 1};
        global.fetch = mockFetch(data);
        const response = await request(url, apiConfig, null);
        expect(response).toBe(data);
    });

    it('should return an object with an id property when using appId/appKey', async () => {
        const data = {id: 1};
        global.fetch = mockFetch(data);
        const response = await request(url, apiConfigWithAppIdAndAppKey, null);
        expect(response).toBe(data);
    });

    it('should return an error for an unsuccessful request', async () => {
        global.fetch = mockUnsuccessfulFetch();
        await expect(request(url, apiConfig, null)).rejects.toThrow();
    });
});

describe('api.addPaginationParams', () => {
    it('should', () => {
        const urlWithPaginationParams = addPaginationParams('/dblocks', 'page=4');
        expect(urlWithPaginationParams).toBe('/dblocks?limit=15&offset=45');
    });
});
