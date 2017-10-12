import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {reverse} from 'routes';
import Hash from 'components/hash';
import styles from './styles.css';

@withRouter
export default class DirectoryBlockLink extends Component {
    render() {
        const dblock = this.props.children;
        if (!dblock || Number(dblock.keymr) === 0) return <Hash type='dblock'>{dblock.keymr}</Hash>;

        return (
            <div className={styles.root}>
                <span className={styles.label}>HEIGHT:</span>
                <Link className={styles.link} to={reverse('dblock', {hash: dblock.keymr})}>{dblock.height}</Link>
                <span className={styles.label}>KEYMR:</span>
                <span className={styles.hash}><Hash type='dblock'>{dblock.keymr}</Hash></span>
            </div>
        );
    }
}
