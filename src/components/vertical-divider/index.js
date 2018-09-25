import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

export default ({className}) => <div className={classNames(styles.vertical, className)} />;
