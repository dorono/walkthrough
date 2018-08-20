import React, {Component} from 'react';
import Hash from 'components/hash';
import styles from './styles.css';

export default class FactoidBlockLink extends Component {
    render() {
        const fblock = this.props.children;

        if (!fblock) return <Hash type='fblock' />;
        if (Number(fblock.keymr) === 0) return <Hash type='fblock'>{fblock.keymr}</Hash>;

        return (
            <div className={styles.root}>
                <span className={styles.label}>KEYMR:</span>
                <span className={styles.hash}><Hash type='fblock'>{fblock.keymr}</Hash></span>
            </div>
        );
    }
}
