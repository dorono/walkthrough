import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

export class Horizontal extends Component {
    render() {
        return (
            <div className={styles.horizontal}>
                {this.props.children}
            </div>
        );
    }
}

export class Vertical extends Component {
    render() {
        return (
            <div className={styles.vertical}>
                {this.props.children}
            </div>
        );
    }
}

export class Box extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['fill', 'outline']),
    };

    render() {
        return (
            <div className={classNames(styles.box, styles[this.props.type])}>
                {this.props.children}
            </div>
        );
    }
}
