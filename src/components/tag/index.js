import React, {Component} from 'react';
import styles from './styles.css';

export default class Tag extends Component {
    render() {
        return (
            <span className={styles.root}>
                {this.props.children}
            </span>
        );
    }
}
