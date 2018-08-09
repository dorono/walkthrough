import React, {Component} from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export default class Label extends Component {
    render() {
        return (
            <div className={classNames(styles.root, this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}
