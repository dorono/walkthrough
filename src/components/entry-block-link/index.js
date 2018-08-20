import React, {Component} from 'react';
import Hash from 'components/hash';
import styles from './styles.css';

export default class EntryBlockLink extends Component {
    render() {
        const eblock = this.props.children;

        if (!eblock) return <Hash type='eblock' />;
        if (Number(eblock.keymr) === 0) return <Hash type='eblock'>{eblock.keymr}</Hash>;

        return (
            <div className={styles.root}>
                <span className={styles.label}>KEYMR:</span>
                <span className={styles.hash}><Hash type='eblock'>{eblock.keymr}</Hash></span>
            </div>
        );
    }
}
