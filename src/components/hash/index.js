import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {reverse} from 'routes';
import styles from './styles.css';

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

        if (this.props.type === 'btc') {
            return (
                <a className={styles.root} href={`https://blockchain.info/tx/${hash}`} target='_blank'>
                    {hash}
                </a>
            );
        }

        return (
            <Link className={styles.root} to={reverse(this.props.type, {hash})}>
                {hash}
            </Link>
        );
    }
}
