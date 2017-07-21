import React, {Component} from 'react';
import styles from './styles.css';

export default class AppFooter extends Component {
    render() {
        return (
            <header className={styles.root}>
                © {new Date().getFullYear()} Factom, Inc.
            </header>
        );
    }
}
