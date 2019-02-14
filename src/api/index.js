import queryString from 'query-string';
import {stringNotUndefined} from 'utils/validate';

export const request = async (url, apiConfig = null, fetchSignal) => {
    const {apiUrl, apiToken, appKey, appId, publicNetAppId, publicNetAppKey} = apiConfig;
    const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
    };
    // Setup auth headers.
    if (stringNotUndefined(apiToken)) {
        headers['factom-provider-token'] = apiToken;
    } else if (stringNotUndefined(appId)) {
        headers.app_id = appId;
        headers.app_key = appKey;
    } else {
        headers.app_id = publicNetAppId;
        headers.app_key = publicNetAppKey;
    }
    const response = await fetch(`${apiUrl}${url}`, {headers, signal: fetchSignal});
    if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.statusCode = response.status;
        throw error;
    }
    return response.json();
};

export const addPaginationParams = (url, currentQueryString) => {
    const {page} = queryString.parse(currentQueryString);
    const limit = 15;
    const offset = page ? limit * (page - 1) : 0;

    const extra = queryString.parse(url.split('?')[1]);
    const params = {...extra, limit, offset};

    return `${url.split('?')[0]}?${queryString.stringify(params)}`;
};
