import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {routes} from 'routes';
import {APIConfigurationConsumer} from 'api-context';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import FeedbackLink from 'components/feedback-link';
import WelcomePopup from 'components/welcome-popup';
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
                    ({apiConfig, defaultApiConfig, configure, remoteConfig, waitingConfig}) => (
                        <div className={styles.root}>
                            <AppHeader
                                defaultApiConfig={defaultApiConfig}
                                apiConfig={apiConfig}
                                onSettingsSubmit={configure}
                                remoteConfig={remoteConfig}
                            />
                            {this.renderContent(waitingConfig)}
                            <AppFooter apiConfig={apiConfig} />
                            <WelcomePopup feedbackUrl={feedbackUrl} />
                            <FeedbackLink feedbackUrl={feedbackUrl} />
                        </div>
                    )
                }
            </APIConfigurationConsumer>
        );
    }
}
