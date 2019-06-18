import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {reverse} from 'routes';
import Hash from 'components/hash';
import {currentTimezone, formatDate} from 'utils/date';
import styles from './styles.css';

const BlockLink = ({type, children, isLink}) => {
    const block = children;

    if (!block) return <Hash type={type} />;
    if (Number(block.keymr) === 0) return <Hash type={type}>{block.keymr}</Hash>;

    return (
        <div className={styles.root}>
            {
                type === 'dblock' &&
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
                type === 'anchor' &&
                    [
                        <span className={styles.label} key='created'>CREATED:</span>,
                        <Hash type='anchor' key={'createdHash'}>
                            {`${formatDate(block.created_at)} ${currentTimezone()}`}
                        </Hash>,
                        <span className={styles.label} key='entryHash'>ENTRY HASH:</span>,
                        <Hash
                            type='publicFactom'
                            chainId={block.chain.chain_id}
                            key={type}>
                            {block.entry_hash}
                        </Hash>,
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
                (type !== 'btc' && type !== 'block' && type !== 'anchor') &&
                    <React.Fragment>
                        <span className={styles.label} key='keyMr'>KEYMR:</span>
                        {isLink ?
                            <span className={styles.hash} key={type}><Hash type={type}>{block.keymr}</Hash></span> :
                            <span className={styles.hash} key={type}><Hash type={'anchor'}>{block.keymr}</Hash></span>
                        }
                    </React.Fragment>
}
        </div>
    );
};

BlockLink.propTypes = {
    type: PropTypes.oneOf(['block', 'dblock', 'fblock', 'eblock', 'btc', 'anchor']),
    children: PropTypes.object.isRequired,
    isLink: PropTypes.bool,
};

export default BlockLink;
