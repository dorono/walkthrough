import React, {Component} from 'react';
import styles from './styles.css';

export default class Label extends Component {
    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        );
    }
}
