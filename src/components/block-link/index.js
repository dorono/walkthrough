import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {reverse} from 'routes';
import Hash from 'components/hash';
import styles from './styles.css';

const BlockLink = ({type, children}) => {
    const block = children;

    if (!block) return <Hash type={type} />;
    if (Number(block.keymr) === 0) return <Hash type={type}>{block.keymr}</Hash>;

    return (
        <div className={styles.root}>
            {
                type === 'dblock' &&
                    [
                        <span key='blockHeight' className={styles.label}>HEIGHT:</span>,
                        <Link
                            key='blockLink'
                            className={styles.link}
                            to={reverse(type, {hash: block.keymr})}>
                            {block.height}
                        </Link>,
                    ]
            }
            {
                type === 'banchor' &&
                    [
                        <span className={styles.label} key='created'>CREATED:</span>,
                        <Hash type='anchor' key={type}>{block.created_at}</Hash>,
                        <span className={styles.label} key='entryHash'>ENTRY HASH:</span>,
                        <Hash type='btc' key={type}>{block.entry_hash}</Hash>,
                    ]
            }
            {
                type === 'block' &&
                    [
                        <span className={styles.label} key='hash'>HASH:</span>,
                        <Hash type='anchor' key={type}>{block.block_hash}</Hash>,
                    ]
            }
            {
                type === 'btc' &&
                    [
                        <span className={styles.label} key='transactionId'>TRANSACTION ID:</span>,
                        <Hash type='btc' key={type}>{block.tx_id}</Hash>,
                    ]
            }
            {
                (type !== 'btc' && type !== 'block' && type !== 'banchor') &&
                    [
                        <span className={styles.label} key='keyMr'>KEYMR:</span>,
                        <span className={styles.hash} key={type}><Hash type={type}>{block.keymr}</Hash></span>,
                    ]
            }
        </div>
    );
};

BlockLink.propTypes = {
    type: PropTypes.oneOf(['block', 'dblock', 'fblock', 'eblock', 'btc', 'banchor']),
};

export default BlockLink;
