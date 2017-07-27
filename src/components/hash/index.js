import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {reverse} from 'routes';
import styles from './styles.css';

@withRouter
export default class Hash extends Component {
    static propTypes = {
        type: PropTypes.oneOf([
            'dblock',
            'ablock',
            'ecblock',
            'fblock',
            'eblock',
            'chain',
            'entry',
            'tx',
            'address',
            'btc',
        ]),
    };

    render() {
        const hash = this.props.children;

        if (!hash) {
            return <span className={styles.root}>Not available</span>;
        }

        if (this.props.type === 'btc') {
            return (
                <a className={styles.root} href={`https://blockchain.info/tx/${hash}`} target='_blank'>
                    {hash}
                </a>
            );
        }

        const url = reverse(this.props.type, {hash});

        if (this.props.location.pathname === url) {
            return <span className={styles.root}>{hash}</span>;
        }

        return <Link className={styles.root} to={url}>{hash}</Link>;
    }
}
