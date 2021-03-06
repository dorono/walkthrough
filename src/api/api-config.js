import {AVAILABLE_BLOCKCHAINS} from 'constants/blockchains';

const API_URL_VERSION_SUFFIX = CONFIG.apiUrlVersionSuffix;

/**
 * APIConfig represents an API configuration containing
 * apiUrl & appId/appKey. Also, the current blockchain.
 */
export default class APIConfig {
    constructor() {
        this.apiUrl = CONFIG.apiUrl; // Hit Connect directly by default.
        this.publicNetAppId = CONFIG.publicNetAppId;
        this.publicNetAppKey = CONFIG.publicNetAppKey;
        this.blockchain = AVAILABLE_BLOCKCHAINS.PUBLIC.label;
        this.latestBuildTime = CONFIG.latestBuildTime;
        this.pegnetApiUrl = CONFIG.pegnetApiUrl;
    }

    /**
     * Create an instance of APIConfig.
     * @param apiUrl
     * @param token - AKA appKey.
     * @param appId - the application ID.
     * @param blockchain
     * @returns {APIConfig}
     */
    static create({apiUrl, appId, appKey, appName, apiVersion,
        blockchain, publicNetAppId, publicNetAppKey, pegnetApiUrl}) {
        const apiConfig = new APIConfig();
        apiConfig.apiUrl = apiUrl;
        if (apiConfig.apiUrl) {
            // Delete trailing slash.
            if (apiConfig.apiUrl.endsWith('/')) {
                apiConfig.apiUrl = apiConfig.apiUrl.slice(0, -1);
            }
            const currentVersionSuffix = apiConfig.apiUrl
                .substring(apiConfig.apiUrl.length - 3, apiConfig.apiUrl.length);
            // Delete other version if present.
            if (currentVersionSuffix !== API_URL_VERSION_SUFFIX
                && currentVersionSuffix.match(/\/v[0-9]/)) {
                apiConfig.apiUrl = apiConfig.apiUrl.slice(0, -3);
            }
            if (!apiConfig.apiUrl.endsWith(API_URL_VERSION_SUFFIX)) {
                apiConfig.apiUrl = `${apiConfig.apiUrl}${API_URL_VERSION_SUFFIX}`;
            }
        }
        apiConfig.appId = appId;
        apiConfig.appKey = appKey;
        apiConfig.appName = appName;
        apiConfig.apiVersion = apiVersion;
        apiConfig.blockchain = blockchain;
        apiConfig.publicNetAppId = publicNetAppId;
        apiConfig.publicNetAppKey = publicNetAppKey;
        apiConfig.pegnetApiUrl = pegnetApiUrl;
        return apiConfig;
    }

    sharesCredentialsWith(anotherApiConfig = {}) {
        return (this.appKey === anotherApiConfig.appKey && this.appId === anotherApiConfig.appId);
    }

}
