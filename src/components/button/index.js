import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

export default class Button extends Component {

    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const {
            className,
            onClick,
            title,
            disabled,
        } = this.props;
        return (
            <button
                className={classNames(className, {[styles.disabled]: disabled})}
                onClick={onClick}>
                {title}
            </button>
        );
    }
}
