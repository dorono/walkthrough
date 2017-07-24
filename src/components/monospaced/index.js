import React, {Component} from 'react';
import styles from './styles.css';

export default class Monospaced extends Component {
    render() {
        return (
            <span className={styles.root}>
                {this.props.children}
            </span>
        );
    }
}
