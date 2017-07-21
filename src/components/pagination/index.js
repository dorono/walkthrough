import React, {Component} from 'react';
import styles from './styles.css';

export default class Pagination extends Component {
    render() {
        return (
            <div className={styles.root}>
                <a className={styles.previous} href='#'><span>Previous</span></a>
                <a className={styles.link} href='#'>1</a>
                <span className={styles.dots}>...</span>
                <a className={styles.link} href='#'>4</a>
                <a className={styles.link} href='#'>5</a>
                <a className={styles.link} href='#'>6</a>
                <a className={styles.active} href='#'>7</a>
                <a className={styles.link} href='#'>8</a>
                <a className={styles.link} href='#'>9</a>
                <a className={styles.link} href='#'>10</a>
                <span className={styles.dots}>...</span>
                <a className={styles.link} href='#'>20</a>
                <a className={styles.next} href='#'><span>Next</span></a>
            </div>
        );
    }
}
