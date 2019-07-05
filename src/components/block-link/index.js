import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {reverse} from 'routes';
import Hash from 'components/hash';
import {currentTimezone, formatDate} from 'utils/date';
import {BLOCKS} from 'constants/blocks';
import styles from './styles.css';

const BlockLink = ({type, children, isLink}) => {
    const block = children;

    if (!block) return <Hash type={type} />;
    if (Number(block.keymr) === 0) return <Hash type={type}>{block.keymr}</Hash>;

    return (
        <div className={styles.root}>
            {
                type === BLOCKS.DIRECTORY &&
                    <React.Fragment>
                        <span key='blockHeight' className={styles.label}>HEIGHT:</span>
                        {isLink ?
                            <Link
                                key='blockLink'
                                className={styles.link}
                                to={reverse(type, {hash: block.keymr})}>
                                {block.height}
                            </Link> :
                            <span className={styles.link} key={type}>{block.height}</span>
                        }
                    </React.Fragment>
            }
            {
                type === BLOCKS.PUBLIC_NETWORK &&
                    <React.Fragment>
                        <div className={styles.block}>
                            <span className={styles.label} key='created'>CREATED:</span>
                            <Hash type='default' key={'createdHash'}>
                                <span className={styles.date}>
                                    {`${formatDate(block.created_at)} (${currentTimezone()})`}
                                </span>
                            </Hash>
                        </div>
                        <div className={styles.block}>
                            <span className={classNames(styles.label, styles.labelEntry)} key='entryHash'>
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
            }
            {
                type === BLOCKS.CRYPTO_NETWORK &&
                    [
                        <span className={styles.label} key='transactionId'>TRANSACTION ID:</span>,
                        <Hash type={'btc'} key={type}>{block.tx_id}</Hash>,
                    ]
            }
            {
                type === BLOCKS.DEFAULT &&
                    [
                        <span className={styles.label} key='hash'>HASH:</span>,
                        <Hash type='default' key={type}>{block.block_hash}</Hash>,
                    ]
            }
            {
                (type !== BLOCKS.CRYPTO_NETWORK && type !== BLOCKS.DEFAULT && type !== BLOCKS.PUBLIC_NETWORK) &&
                    <React.Fragment>
                        <span className={styles.label} key='keyMr'>KEYMR:</span>
                        {isLink ?
                            <span className={styles.hash} key={type}><Hash type={type}>{block.keymr}</Hash></span> :
                            <span className={styles.hash} key={type}><Hash type={'default'}>{block.keymr}</Hash></span>
                        }
                    </React.Fragment>
}
        </div>
    );
};

BlockLink.propTypes = {
    type: PropTypes.oneOf(
        [BLOCKS.DEFAULT, BLOCKS.DIRECTORY, BLOCKS.FACTOID, BLOCKS.ENTRY, BLOCKS.PUBLIC_NETWORK, BLOCKS.CRYPTO_NETWORK],
        ),
    children: PropTypes.object.isRequired,
    isLink: PropTypes.bool,
};

BlockLink.defaultProps = {
    isLink: true,
};

export default BlockLink;
