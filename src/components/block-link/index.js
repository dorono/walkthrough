import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {reverse} from 'routes';
import Hash from 'components/hash';
import {currentTimezone, formatDate} from 'utils/date';
import {BLOCKS} from 'constants/blocks';
import {TRANSACTIONS} from 'constants/transactions';

import styles from './styles.css';

const BlockLink = ({type, children, isLink}) => {
    const block = children;

    if (!block) return <Hash type={type} />;
    if (Number(block.keymr) === 0)
        return <Hash type={type}>{block.keymr}</Hash>;

    return (
        <div className={styles.root}>
            {type === BLOCKS.DIRECTORY && (
                <React.Fragment>
                    <span key='blockHeight' className={styles.label}>
                        HEIGHT:
                    </span>
                    {isLink ? (
                        <Link
                            key='blockLink'
                            className={styles.link}
                            to={reverse(type, {hash: block.keymr})}>
                            {block.height}
                        </Link>
                    ) : (
                        <span className={styles.link} key={type}>
                            {block.height}
                        </span>
                    )}
                </React.Fragment>
            )}
            {type === BLOCKS.PUBLIC_NETWORK && (
                <React.Fragment>
                    <div className={styles.block}>
                        <span className={styles.label} key='created'>
                            CREATED:
                        </span>
                        <Hash type='default' key={'createdHash'}>
                            <span className={styles.date}>
                                {`${formatDate(
                                    block.created_at,
                                )} (${currentTimezone()})`}
                            </span>
                        </Hash>
                    </div>
                    <div className={styles.block}>
                        <span
                            className={classNames(
                                styles.label,
                                styles.labelEntry,
                            )}
                            key='entryHash'>
                            ENTRY HASH:
                        </span>
                        <Hash
                            type={'publicFactom'}
                            chainId={block.chain.chain_id}
                            key={type}>
                            {block.entry_hash}
                        </Hash>
                    </div>
                </React.Fragment>
            )}
            {type === BLOCKS.BITCOIN_NETWORK && [
                <span className={styles.label} key='transactionId'>
                    TRANSACTION ID:
                </span>,
                <Hash type={'btc'} key={type}>
                    {block.tx_id}
                </Hash>
            ]}
            {type === BLOCKS.ETHEREUM_NETWORK && [
                <span className={styles.label} key='transactionId'>
                    TRANSACTION ID:
                </span>,
                <Hash type={'ethereum'} key={type}>
                    {block.tx_id}
                </Hash>
            ]}
            {type === TRANSACTIONS.PEGNET_COMPLETED && (
                <React.Fragment>
                    <span className={styles.label}>HEIGHT:</span>
                    <Link
                        className={styles.link}
                        to={`/dblocks/${block.executed}`}>
                        {block.executed}
                    </Link>
                    <span className={styles.label}>CONFIRMATIONS:</span>
                    <span className={styles.hash}>
                        {block.syncheight - block.executed + 1 > 10
                            ? '10+'
                            : block.syncheight - block.executed + 1}
                    </span>
                </React.Fragment>
            )}
            {type === TRANSACTIONS.PEGNET_RECORDED && (
                <React.Fragment>
                    <span className={styles.label}>HEIGHT:</span>
                    <Link
                        className={styles.link}
                        to={`/dblocks/${block.height}`}>
                        {block.height}
                    </Link>
                    <span className={styles.label}>
                        PARENT{' '}
                        {block.txaction === 4 ? 'FACTOID TRANSACTION' : 'ENTRY'}
                        :
                    </span>
                    <Link
                        className={styles.link}
                        to={`/chains/${TRANSACTIONS.PEGNET_CHAIN_ID}/entries/${block.hash}`}>
                        {block.hash}
                    </Link>
                </React.Fragment>
            )}
            {type === BLOCKS.DEFAULT && [
                <span className={styles.label} key='hash'>
                    HASH:
                </span>,
                <Hash type='default' key={type}>
                    {block.block_hash}
                </Hash>
            ]}
            {type !== BLOCKS.BITCOIN_NETWORK &&
                type !== BLOCKS.ETHEREUM_NETWORK &&
                type !== BLOCKS.DEFAULT &&
                type !== BLOCKS.PUBLIC_NETWORK &&
                type !== TRANSACTIONS.PEGNET_COMPLETED &&
                type !== TRANSACTIONS.PEGNET_RECORDED && (
                    <React.Fragment>
                        <span className={styles.label} key='keyMr'>
                            KEYMR:
                        </span>
                        {isLink ? (
                            <span className={styles.hash} key={type}>
                                <Hash type={type}>{block.keymr}</Hash>
                            </span>
                        ) : (
                            <span className={styles.hash} key={type}>
                                <Hash type={'default'}>{block.keymr}</Hash>
                            </span>
                        )}
                    </React.Fragment>
                )}
        </div>
    );
};

BlockLink.propTypes = {
    type: PropTypes.oneOf([
        BLOCKS.DEFAULT,
        BLOCKS.DIRECTORY,
        BLOCKS.FACTOID,
        BLOCKS.ENTRY,
        BLOCKS.PUBLIC_NETWORK,
        BLOCKS.BITCOIN_NETWORK,
        BLOCKS.ETHEREUM_NETWORK,
        TRANSACTIONS.PEGNET_COMPLETED,
        TRANSACTIONS.PEGNET_RECORDED,
    ]),
    children: PropTypes.object.isRequired,
    isLink: PropTypes.bool,
};

BlockLink.defaultProps = {
    isLink: true,
};

export default BlockLink;
