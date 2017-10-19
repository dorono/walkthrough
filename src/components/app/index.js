import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from 'routes';
import {trackPageView} from 'analytics';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import ErrorPage from 'pages/error-page';
import styles from './styles.css';

export default class App extends Component {
    componentDidMount() {
        trackPageView(window.location.pathname);
    }

    componentDidUpdate() {
        trackPageView(window.location.pathname);
    }

    render() {
        return (
            <div className={styles.root}>
                <AppHeader />
                <Switch>
                    {routes.map(route => <Route key={route.path} {...route} />)}
                    <Route render={() => <ErrorPage status={404} />} />
                </Switch>
                <AppFooter />
            </div>
        );
    }
}
