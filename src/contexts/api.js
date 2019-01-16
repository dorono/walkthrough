import React from 'react';
import {autobind} from 'core-decorators';
import set from 'lodash/set';
import queryString from 'query-string';
import {request} from 'api';
import APIConfig from 'api/api-config';
import {isIE, isEdge} from 'utils/user-agent';
import {setSessionItem, getSessionItem} from 'utils/session-storage';
import WindowEventListener from 'components/window-event-listener';
import {stringNotNull} from 'utils/validate';

const storageKey = 'factom.explorer.api-config';
const {Provider, Consumer} = React.createContext();

export const APIConfigurationConsumer = Consumer;

/**
 * APIConfigurationProvider is the Provider for the APIConfiguration Context.
 *
 */
export class APIConfigurationProvider extends React.Component {
    constructor(props) {
        super(props);
        // Load the default config.
        const defaultApiConfig = new APIConfig();
        // Verify if using appId/appKey is supported. Disabled for IE and Edge for now.
        this.allowCustomCredentials = !isIE() && !isEdge();
        this.state = {
            apiConfig: Object.assign(Object.create(APIConfig.prototype), defaultApiConfig),
            defaultApiConfig,
            notifyRemoteConfigWasBlocked: false,
            remoteConfig: false,
            waitingConfig: false,
        };
        this.waitingConfigTimeout = null;
    }

    componentWillMount() {
        const {from} = queryString.parse(window.location.search);

        // Handle case where settings custom credentials is not allowed.
        if (!this.allowCustomCredentials && (window.opener || from === CONFIG.devPortalHostName)) {
            this.setState({notifyRemoteConfigWasBlocked: true});
        }

        // Handle case where setting custom credentials is allowed.
        if (this.allowCustomCredentials) {
            /**
             *  If I was opened from the applications list, just notify
             *  that window that Explorer is ready to go, return and don't
             *  recover previously saved session.
             */
            if (window.opener || from === CONFIG.devPortalHostName) {
                return this.setState({waitingConfig: true}, () => {
                    // Wait for the remote config for up to 10 secs.
                    this.waitingConfigTimeout = setTimeout(() =>
                            this.setState({waitingConfig: false}),
                        10000,
                    );
                    window.opener.postMessage('EXPLORER_READY_TO_GO', '*');
                });
            }

            // Recover api config from the session, to maintain state after F5.
            const savedApiConfig = getSessionItem(storageKey);
            if (savedApiConfig) {
                return this.setApiConfig(APIConfig.create(savedApiConfig));
            }
        }

        // By default, call setApiConfig.
        this.setApiConfig(Object.assign(Object.create(APIConfig.prototype), this.state.defaultApiConfig));
    }

    /**
     * Fetch the version for a given API.
     * @param apiConfig
     * @returns {Promise<*>}
     */
    async getAPIVersion(apiConfig) {
        try {
            const data = await request('', apiConfig);
            return data.version;
        } catch (e) {
            return null;
        }
    }

    @autobind
    async setApiConfig(apiConfig, fromMessageEvent = false) {
        if (this.isValid(apiConfig)) {
            // Clear the timeout started on componentWillMount
            if (fromMessageEvent && this.state.waitingConfig) {
                clearTimeout(this.waitingConfigTimeout);
            }
            if (!apiConfig.apiVersion) {
                const apiVersion = await this.getAPIVersion(apiConfig);
                apiConfig.apiVersion = apiVersion;
            }
            return this.setState({apiConfig, waitingConfig: false, remoteConfig: fromMessageEvent});
        }
        // turn off waitingConfig if message is invalid.
        return this.setState({waitingConfig: false});
    }

    @autobind
    isConfiguredByDefault() {
        return this.state.defaultApiConfig.sharesCredentialsWith(this.state.apiConfig);
    }

    @autobind
    messageHandler(data, fromMessageEvent = false) {
        if (!data) return;
        const apiConfig = APIConfig.create(data);
        if (this.isValid(apiConfig)) {
            this.setApiConfig(APIConfig.create(data), fromMessageEvent);
        }
    }

    /**
     * Validate APIConfig.
     * @returns {boolean}
     */
    isValid({apiUrl, appId, appKey, apiToken}) {
        const throughGateway = stringNotNull(apiUrl) && stringNotNull(appId) && stringNotNull(appKey);
        if (throughGateway) return true;
        const directly = stringNotNull(apiUrl) && stringNotNull(apiToken);
        if (directly) return true;
        return false;
    }

    @autobind
    unloadHandler() {
        // Save api config for the session.
        setSessionItem(storageKey, this.state.apiConfig);
    }

    @autobind()
    eventHandler(evtName, evt) {
        switch (evtName) {
            case 'message':
                return this.messageHandler(evt.data, true);
            case 'beforeunload':
                return this.unloadHandler();
            default:
                break;
        }
    }

    @autobind
    runtimeChangeHandler(prop, newValue, oldValue) {
        if (oldValue !== newValue) {
            let newApiConfig = {...this.state.apiConfig};
            set(newApiConfig, prop, newValue);
            newApiConfig = APIConfig.create(newApiConfig);
            if (newApiConfig.isValid()) this.setApiConfig(newApiConfig);
        }
    }

    render() {
        return (
            <WindowEventListener
                events={['message', 'beforeunload']}
                handler={(evtName, evt) => this.eventHandler(evtName, evt)}>
                {
                    <Provider
                        value={{
                            ...this.state,
                            allowCustomCredentials: this.allowCustomCredentials,
                            configure: this.messageHandler,
                            isConfiguredByDefault: this.isConfiguredByDefault,
                        }}>
                        {this.props.children}
                    </Provider>
                }
            </WindowEventListener>);
    }
}
