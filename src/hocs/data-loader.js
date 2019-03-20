import React from 'react';

import {request} from 'api';
import {APIConfigurationConsumer} from 'contexts/api';
import {executeModalTrigger} from 'utils/execute-options-modal';
import Spinner from 'components/spinner';
import ErrorPage from 'pages/error-page';
import {ERROR_MESSAGES} from 'constants/errors';

/**
 * HOC that fetches data using the request function.
 * Shows errors and loader ny default.
 * @param target
 * @param options
 * @param showLoader
 * @param showErrors
 * @returns {function(*): Loader}
 */
const load = (target, options = {}, showLoader = true, showErrors = true) => Component => {
    class Loader extends React.Component {
        static getDerivedStateFromProps(nextProps, prevState) {
            let stateData = {};

            if (nextProps && nextProps.location) {
                stateData = {
                    currentLocation: nextProps.location.pathname,
                    currentQueryString: nextProps.location.search,
                };

                if (
                    // first, make sure we haven't exceeded our limits
                    // (don't want to clear out that error status)...
                    prevState.error !== 429
                    // if we have switched to new path, or...
                    && (
                        nextProps.location.pathname !== prevState.currentLocation
                        // on same path, but listening for query string changes
                        || (
                            !options.ignoreQueryString
                            && nextProps.location.pathname === prevState.currentLocation
                            && nextProps.location.search !== prevState.currentQueryString
                        )
                    )
                ) {
                    stateData = Object.assign({}, stateData, {data: undefined, error: undefined});
                }
            }

            return (stateData);
        }

        state = {};

        constructor(props) {
            super(props);
            this.abortController = new window.AbortController();
        }

        componentDidMount() {
            this.load(this.props);
        }

        componentWillUnmount() {
            this.abortController.abort();
        }

        async load(props) {
            const url = typeof target === 'function' ? target(props) : target;
            try {
                const data = await request(url, props.apiConfig, this.abortController.signal);
                this.setState({data});
            } catch (error) {
                if (error instanceof DOMException) {
                    return null;
                }
                this.setState({error: error.statusCode || error.message});
            }
        }

        render() {
            let error = this.state.error;

            if (error && showErrors) {
                if (error === 403) {
                    executeModalTrigger(403);
                    return (
                        <ErrorPage
                            status={500}
                            message={ERROR_MESSAGES.AUTHENTICATION_FAILED}
                        />
                    );
                }

                if (error !== 404 && error !== 429) {
                    error = 500;
                }

                return (
                    <ErrorPage
                        status={error}
                        appName={this.props.apiConfig.appName}
                    />
                );
            }

            if (!this.state.data && showLoader) {
                return <Spinner />;
            }

            return <Component {...this.props} {...this.state.data} />;
        }
    }

    return Loader;
};

/**
 * dataLoader is a wrapper for loader that is provided by APIConfigProvider.
 * @param target
 * @param options
 * @returns {function(*=): function(*): *}
 */
export const dataLoader = (target, options = {}, showLoader = true, showErrors = true) => Component => {
    class DataLoader extends React.Component {
        render() {
            const Loader = load(target, options, showLoader, showErrors)(Component);
            return (<APIConfigurationConsumer>
                {
                    ({apiConfig}) => <Loader apiConfig={apiConfig} {...this.props} />
                }
            </APIConfigurationConsumer>);
        }
    }

    return DataLoader;
};
