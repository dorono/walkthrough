import React, {Component} from 'react';
import {request} from 'api';
import Monospaced from 'components/monospaced';
import styles from './styles.css';

export default class AppFooter extends Component {
    state = {
        apiVersion: undefined,
    };

    componentDidMount() {
        this.loadAPIVersion();
    }

    async loadAPIVersion() {
        const data = await request('/', this.props.apiConfig);
        this.setState({apiVersion: `v${data.version}`});
    }

    render() {
        return (
            <footer className={styles.root}>
                <span>&copy; {new Date().getFullYear()} Factom, Inc.</span>
                <Monospaced>UI: {CONFIG.version} / API: {this.state.apiVersion || 'Loading'}</Monospaced>
            </footer>
        );
    }
}
