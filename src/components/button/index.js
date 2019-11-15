import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

const Button = ({className, id, onClick, title, disabled}) =>
    (<button
        id={id}
        className={classNames(className, {[styles.disabled]: disabled})}
        onClick={onClick}
        title='PegNet MainNet is the only supported network'>
        {title}
    </button>);

Button.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
