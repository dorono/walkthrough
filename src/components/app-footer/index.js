import React, {Component} from 'react';
import Monospaced from 'components/monospaced';
import styles from './styles.css';

export default class AppFooter extends Component {
    render() {
        return (
            <footer className={styles.root}>
                <span>© {new Date().getFullYear()} Factom, Inc.</span>
                <Monospaced>{CONFIG.version} ({CONFIG.buildTimestamp})</Monospaced>
            </footer>
        );
    }
}
