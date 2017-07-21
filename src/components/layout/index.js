import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
        style: PropTypes.oneOf(['fill', 'outline']),
    };

    render() {
        return (
            <div className={`${styles.box} ${styles[this.props.style]}`}>
                {this.props.children}
            </div>
        );
    }
}
