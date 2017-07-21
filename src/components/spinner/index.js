import React, {Component} from 'react';
import styles from './styles.css';

export default class Spinner extends Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.rect1} />
                <div className={styles.rect2} />
                <div className={styles.rect3} />
                <div className={styles.rect4} />
                <div className={styles.rect5} />
            </div>
        );
    }
}
