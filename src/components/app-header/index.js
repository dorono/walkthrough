import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppMenu from 'components/app-menu';
import Search from 'components/search';
import styles from './styles.css';

export default class AppHeader extends Component {
    render() {
        return (
            <header className={styles.root}>
                <div className={styles.content}>
                    <Link className={styles.logo} to='/'>
                        <h1>
                            <span>Factom Explorer</span>
                        </h1>
                    </Link>
                    <Search />
                    <AppMenu />
                </div>
            </header>
        );
    }
}
