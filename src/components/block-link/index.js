import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {reverse} from 'routes';
import Hash from 'components/hash';
import styles from './styles.css';

export default class BlockLink extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['dblock', 'fblock', 'eblock']),
    };

    render() {
        const block = this.props.children;
        const {type} = this.props;

        if (!block) return <Hash type={type} />;
        if (Number(block.keymr) === 0) return <Hash type={type}>{block.keymr}</Hash>;

        return (
            <div className={styles.root}>
                {
                    type === 'dblock' &&
                        <span className={styles.label}>HEIGHT:</span>
                }
                {
                    type === 'dblock' &&
                        <Link className={styles.link} to={reverse(type, {hash: block.keymr})}>
                            {block.height}
                        </Link>
                }
                <span className={styles.label}>KEYMR:</span>
                <span className={styles.hash}><Hash type={type}>{block.keymr}</Hash></span>
            </div>
        );
    }
}
