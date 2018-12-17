import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Input extends Component {

    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string,
        handleChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        error: PropTypes.bool,
        errorText: PropTypes.string,
    };

    render() {
        const {
            className,
            name,
            type,
            value,
            handleChange,
            placeholder,
            error,
            errorText,
        } = this.props;
        return (
            <div>
                <input
                    className={classNames(styles.root, className, {[styles.error]: error})}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                {
                    error && errorText && <p className={styles.errorText}>{errorText}</p>
                }
            </div>
        );
    }
}
