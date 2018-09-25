import get from 'lodash/get';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';

const getConfigurationFor = (configProp, valueToIgnore) =>
    get(RUNTIME_CONFIG, configProp, valueToIgnore) !== valueToIgnore ?
        get(RUNTIME_CONFIG, configProp) : get(CONFIG, configProp);

/**
 * APIConfig represents an API configuration containing
 * apiUrl, apiKey, appId and the current blockchain.
 */
export default class APIConfig {
    apiUrl = getConfigurationFor('apiUrls.mainnet', '$API_URL_MAINNET');
    apiKey = getConfigurationFor('apiKey', '$API_TOKEN');
    appId = getConfigurationFor('appId', '$API_APP_ID');
    blockchain = AVAILABLE_BLOCKCHAINS.MAINNET.label;

    /**
     * Create an instance of APIConfig.
     * @param apiUrl
     * @param token - AKA appKey.
     * @param appId - the application ID.
     * @param blockchain
     * @returns {APIConfig}
     */
    static create({apiUrl, apiKey, appId, blockchain}) {
        const apiConfig = new APIConfig();
        apiConfig.apiUrl = apiUrl;
        apiConfig.appId = appId;
        apiConfig.apiKey = apiKey;
        apiConfig.blockchain = blockchain;
        return apiConfig;
    }

    isValid() {
        return (this.apiUrl && this.apiKey && this.apiUrl.length > 0 && this.apiKey.length > 0);
    }
}
