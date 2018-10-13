import React from 'react';
import {autobind} from 'core-decorators';
import set from 'lodash/set';
import APIConfig from 'utils/api-config';
import {setSessionItem, getSessionItem} from 'utils/session-storage';
import WindowEventListener from 'components/window-event-listener';
import {stringNotNull} from './utils/validate';

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
        this.state = {
            apiConfig: Object.assign(Object.create(APIConfig.prototype), defaultApiConfig),
            defaultApiConfig,
            remoteConfig: false,
        };
    }

    componentWillMount() {
        // Recover api config from the session, to recover after F5.
        const savedApiConfig = getSessionItem(storageKey);
        if (savedApiConfig) {
            this.setApiConfig(APIConfig.create(savedApiConfig));
        }
    }

    componentDidMount() {
        /**
         *  If I was opened from the applications list, just notify
         *  that window that Explorer is ready to go.
         */
        if (window.opener) {
            window.opener.postMessage('EXPLORER_READY_TO_GO', '*');
        }
    }

    @autobind()
    setApiConfig(apiConfig, fromEvent = false) {
        if (this.isValid(apiConfig)) {
            return this.setState({apiConfig, remoteConfig: fromEvent});
        }
    }

    @autobind
    messageHandler(data, fromEvent = false) {
        if (!data) return;
        const apiConfig = APIConfig.create(data);
        if (this.isValid(apiConfig)) {
            this.setApiConfig(APIConfig.create(data), fromEvent);
        }
    }
    /**
     * Validate
     * @returns {boolean}
     */
    isValid = ({apiUrl, appId, appKey, apiToken}) => {
        const throughGateway = stringNotNull(apiUrl) && stringNotNull(appId) && stringNotNull(appKey);
        if (throughGateway) return true;
        const directly = stringNotNull(apiUrl) && stringNotNull(apiToken);
        if (directly) return true;
        return false;
    };

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
                            configure: this.messageHandler,
                        }}>
                        {this.props.children}
                    </Provider>
                }
            </WindowEventListener>);
    }
}
