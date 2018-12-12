import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {reverse, routes} from 'routes';
import {APIConfigurationConsumer} from 'contexts/api';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import FeedbackLink from 'components/feedback-link';
import Spinner from 'components/spinner';
import ErrorPage from 'pages/error-page';
import styles from './styles.css';

const feedbackUrl = '//docs.google.com/forms/d/e/1FAIpQLSdNSt5-5Kr9kD51VjE7I28knZJcqulFN42hTVK9S-tJvVohxw/viewform';

@withRouter
export default class App extends Component {
    state = {
        jsError: false,
        showSettingsPopup: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({jsError: false});
        }
    }

    componentDidCatch() {
        this.setState({jsError: true});
    }

    goHome() {
        this.props.history.push(reverse('landing'));
    }

    renderContent(waitingConfig = false) {
        if (waitingConfig) return <Spinner />;
        if (this.state.jsError) return <ErrorPage status={500} />;
        return (
            <Switch>
                {routes.map(route => <Route key={route.path} {...route} />)}
                <Route component={ErrorPage} />
            </Switch>
        );
    }

    render() {
        return (
            <APIConfigurationConsumer>
                {
                    ({
                         apiConfig,
                         allowCustomCredentials,
                         configure,
                         defaultApiConfig,
                         isConfiguredByDefault,
                         notifyRemoteConfigWasBlocked,
                         remoteConfig,
                         waitingConfig,
                    }) => (
                        <div className={styles.root}>
                            <AppHeader
                                allowCustomCredentials={allowCustomCredentials}
                                apiConfig={apiConfig}
                                defaultApiConfig={defaultApiConfig}
                                isConfiguredByDefault={isConfiguredByDefault}
                                notifyRemoteConfigWasBlocked={notifyRemoteConfigWasBlocked}
                                onSettingsSubmit={apiConfig => {
                                    configure(apiConfig);
                                    this.goHome();
                                }}
                                remoteConfig={remoteConfig}
                            />
                            {this.renderContent(waitingConfig)}
                            <AppFooter apiConfig={apiConfig} />
                            <FeedbackLink feedbackUrl={feedbackUrl} />
                        </div>
                    )
                }
            </APIConfigurationConsumer>
        );
    }
}
