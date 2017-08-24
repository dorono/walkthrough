export const request = async (url) => {
    const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-3scale-proxy-secret-token': CONFIG.apiToken,
    };
    const response = await fetch(`${CONFIG.api}${url}`, {headers});
    if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.statusCode = response.status;
        throw error;
    }
    return response.json();
};
