import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

export default class Button extends Component {

    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const {
            className,
            id,
            onClick,
            title,
            disabled,
        } = this.props;
        return (
            <button
                id={id}
                className={classNames(className, {[styles.disabled]: disabled})}
                onClick={onClick}>
                {title}
            </button>
        );
    }
}
