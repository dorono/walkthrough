import {AVAILABLE_BLOCKCHAINS} from 'blockchains';

/**
 * APIConfig represents an API configuration containing
 * apiUrl & apiToken OR apiUrl & appId/appKey. Also, the current blockchain.
 */
export default class APIConfig {
    constructor() {
        this.apiUrl = CONFIG.apiUrl; // Hit Connect directly by default.
        this.apiToken = CONFIG.apiToken; // Shared Token for hitting Connect directly.
        this.blockchain = AVAILABLE_BLOCKCHAINS.PUBLIC.label;
    }

    /**
     * Create an instance of APIConfig.
     * @param apiUrl
     * @param token - AKA appKey.
     * @param appId - the application ID.
     * @param blockchain
     * @returns {APIConfig}
     */
    static create({apiUrl, apiToken, appId, appKey, blockchain}) {
        const apiConfig = new APIConfig();
        apiConfig.apiUrl = apiUrl;
        apiConfig.apiToken = apiToken;
        apiConfig.appId = appId;
        apiConfig.appKey = appKey;
        apiConfig.blockchain = blockchain;
        return apiConfig;
    }

    sharesCredentialsWith(anotherApiConfig = {}) {
        return this.appKey === anotherApiConfig.appKey && this.appId === anotherApiConfig.appId;
    }

    /**
     * Validate API Config.
     * @returns {*|string|string|boolean}
     */
}
