import React, {Component} from 'react';
import styles from './styles.css';

export default class Search extends Component {
    render() {
        return (
            <div className={styles.root}>
                <input className={styles.input} type='text' placeholder='Search' />
            </div>
        );
    }
}
