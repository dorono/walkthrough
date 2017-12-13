import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {routes} from 'routes';
import {trackPageView} from 'analytics';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import ErrorPage from 'pages/error-page';
import styles from './styles.css';

@withRouter
export default class App extends Component {
    state = {
        jsError: false,
    };

    componentDidMount() {
        trackPageView(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({jsError: false});
            trackPageView(this.props.location.pathname);
        }
    }

    componentDidCatch() {
        this.setState({jsError: true});
    }

    renderContent() {
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
            <div className={styles.root}>
                <AppHeader />
                {this.renderContent()}
                <AppFooter />
            </div>
        );
    }
}
