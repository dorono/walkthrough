import React, {Component} from 'react';
import Monospaced from 'components/monospaced';
import styles from './styles.css';

export default class AppFooter extends Component {
    render() {
        return (
            <footer className={styles.root}>
                <span>&copy; {new Date().getFullYear()} Factom, Inc.</span>
                <Monospaced>UI: {CONFIG.version} / API: {this.props.apiConfig.apiVersion || 'Loading'}</Monospaced>
            </footer>
        );
    }
}
