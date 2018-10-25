import React from 'react';
import {request} from 'api';
import {APIConfigurationConsumer} from 'api-context';
import Spinner from 'components/spinner';
import ErrorPage from 'pages/error-page';
const {devPortalBaseUrl} = CONFIG;

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
        state = {};

        componentWillMount() {
            this.load(this.props);
        }

        componentWillReceiveProps(nextProps) {
            if (!options.ignoreQueryString || this.props.location.pathname !== nextProps.location.pathname) {
                this.setState({data: undefined, error: undefined});
                this.load(nextProps);
            }
        }

        async load(props) {
            const url = typeof target === 'function' ? target(props) : target;
            try {
                const data = await request(url, props.apiConfig);
                this.setState({data});
            } catch (error) {
                this.setState({error: error.statusCode || error.message});
            }
        }

        errorStatusPage429Message() {
            const linkRequestPlanChange =
                `${devPortalBaseUrl
                }plans?message_reason=Request_Plan_Change&regarding_app_id=${this.props.apiConfig.appId}`;
            return (
                <div
                    className='message'>
                    <p>
                        Your Connect application <br />
                        <strong>{this.props.apiConfig.appName}</strong> has run out of requests. <br /><br />
                        <a href={linkRequestPlanChange}> Upgrade your plan</a> or come back tomorrow.
                    </p>
                </div>
            );
        }

        render() {
            if (this.state.error === 404 && showErrors) return <ErrorPage status={404} />;
            if (this.state.error === 429 && showErrors) {
                return (<ErrorPage status={429} message={this.errorStatusPage429Message()} />);
            }
            if (this.state.error && showErrors) return <ErrorPage status={500} />;
            if (!this.state.data && showLoader) return <Spinner />;
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
    const Loader = load(target, options, showLoader, showErrors)(Component);
    return props => (<APIConfigurationConsumer>
        {
            ({apiConfig}) => <Loader apiConfig={apiConfig} {...props} />
        }
    </APIConfigurationConsumer>);
};
