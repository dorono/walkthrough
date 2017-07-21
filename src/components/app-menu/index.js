import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {getMenuItem} from 'routes';
import styles from './styles.css';

export default class AppMenu extends Component {
    isActive(index) {
        return (match, location) => getMenuItem(location.pathname) === index;
    }

    render() {
        return (
            <div className={styles.root}>
                <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    isActive={this.isActive(0)}
                    to='/'>
                    BLOCKS
                </NavLink>
                <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    isActive={this.isActive(1)}
                    to='/chains'>
                    CHAINS
                </NavLink>
            </div>
        );
    }
}
