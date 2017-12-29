import React, {Component} from 'react';
import Monospaced from 'components/monospaced';
import styles from './styles.css';

export default class AppFooter extends Component {
    render() {
        return (
            <footer className={styles.root}>
                <span>© {new Date().getFullYear()} Factom, Inc.</span>
                <Monospaced>ca0ee599d9e9874ceeb20bba22377d715ab42e6d ({CONFIG.buildTimestamp})</Monospaced>
            </footer>
        );
    }
}
