import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {reverse} from 'routes';
import A from 'components/anchor';
import {STAGE_NOT_AVAILABLE} from 'constants/stages';
import styles from './styles.css';

// TODO: This component should be refactored to be useful for pExplorer and explorer, remove much logic
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
            'ethereum',
            'default',
            'publicFactom',
        ]),
        extraArgs: PropTypes.object,
        children: PropTypes.node,
        location: PropTypes.object.isRequired,
        chainId: PropTypes.string,
    };

    static defaultPropTypes = {
        extraArgs: {},
    };

    render() {
        const {children, type, extraArgs, location, chainId} = this.props;
        const hash = children;

        if (!hash) {
            return <span>{STAGE_NOT_AVAILABLE}</span>;
        }

        if (Number(hash) === 0) {
            return <span className={styles.root}>Not available - no previous blocks</span>;
        }

        if (type === 'btc') {
            return (
                <a
                    className={styles.external}
                    href={`https://blockchain.info/tx/${hash}`}
                    target='_blank'>
                    {hash}
                </a>
            );
        }

        if (type === 'ethereum') {
            return (
                <a
                    className={styles.external}
                    href={`https://etherscan.io/tx/${hash}`}
                    target='_blank'>
                    {hash}
                </a>
            );
        }

        if (type === 'publicFactom') {
            return (
                <a
                    className={styles.external}
                    href={`https://explorer.factom.com/chains/${chainId}/entries/${hash}`}
                    target='_blank'>
                    {hash}
                </a>
            );
        }

        if (type === 'default') {
            return <span className={styles.root}>{hash}</span>;
        }

        const url = reverse(type, {hash, ...extraArgs});

        if (location.pathname === url) {
            return <span className={styles.root}>{hash}</span>;
        }

        if (type === 'address' || type === 'tx') {
            if (extraArgs && extraArgs.unit === 'FCT') {
                const finalUrl = `${CONFIG.factomExplorerUrl}/addresses/${extraArgs.address}`;
                return <A className={styles.root} to={finalUrl} text={hash} />;
            }
            const finalUrl = extraArgs && extraArgs.unit ? `${url}/?asset=${extraArgs.unit}` : url;
            return (
                <Link className={styles.root} to={finalUrl}>
                    {hash}
                </Link>
            );
        }
    }
}
