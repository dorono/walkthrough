import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from 'routes';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import Error404 from 'pages/error-404';
import styles from './styles.css';

export default class App extends Component {
    render() {
        return (
            <div className={styles.root}>
                <AppHeader />
                <Switch>
                    {routes.map(route => <Route key={route.path} {...route} />)}
                    <Route component={Error404} />
                </Switch>
                <AppFooter />
            </div>
        );
    }
}
