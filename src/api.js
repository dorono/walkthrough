import queryString from 'query-string';

export const request = async (url) => {
    const apiUrl = RUNTIME_CONFIG.apiUrl !== '$API_URL' ? RUNTIME_CONFIG.apiUrl : CONFIG.apiUrl;
    const apiToken = RUNTIME_CONFIG.apiToken !== '$API_TOKEN' ? RUNTIME_CONFIG.apiToken : CONFIG.apiToken;
    const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-3scale-proxy-secret-token': apiToken,
    };
    const response = await fetch(`${apiUrl}${url}`, {headers});
    if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.statusCode = response.status;
        throw error;
    }
    return response.json();
};

export const addPaginationParams = (url, qs) => {
    const itemsPerPage = 15;
    const {page} = queryString.parse(qs);
    const offset = page ? itemsPerPage * (page - 1) : 0;
    return `${url}?limit=${itemsPerPage}&offset=${offset}`;
};
