import get from 'lodash/get';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';

/**
 * Read configuration property "prop" from global variables.
 * IF RUNTIME_CONFIG[prop] is defined, return it.
 * ELSE IF valueToReturn is specified, return it.
 * DEFAULTS to CONFIG[prop].
 * @param configProp
 * @param valueToIgnore
 * @param valueToReturn
 * @returns {*}
 */
const getConfigurationFor = (configProp, valueToIgnore, valueToReturn = null) => {
    if (get(RUNTIME_CONFIG, configProp, valueToIgnore) !== valueToIgnore) {
        return get(RUNTIME_CONFIG, configProp);
    }
    if (valueToReturn) return valueToReturn;
    return get(CONFIG, configProp);
};

/**
 * APIConfig represents an API configuration containing
 * apiUrl, apiKey, appId and the current blockchain.
 */
export default class APIConfig {
    apiUrl = getConfigurationFor('apiUrl', '$API_URL', CONFIG.apiUrls.mainnet);
    apiKey = getConfigurationFor('apiKey', '$API_TOKEN');
    appId = getConfigurationFor('appId', '$API_APP_ID');
    blockchain = getConfigurationFor('blockchain', '$BLOCKCHAIN_LABEL', AVAILABLE_BLOCKCHAINS.MAINNET.label);

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

    sharesCredentialsWith(anotherApiConfig = {}) {
        return this.apiKey === anotherApiConfig.apiKey && this.appId === anotherApiConfig.appId;
    }

    isValid() {
        return (this.apiUrl && this.apiKey && this.appId &&
            this.apiUrl.length > 0 && this.apiKey.length > 0 && this.appId.length > 0);
    }
}
