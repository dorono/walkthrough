import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

export default ({className, message, type, show = true}) => {
    return (<div>
        {show ?
            <div
                className={classNames(styles.bar, className, styles[type])}>
                {message}
            </div> :
            <div className={styles.bar} />
        }
    </div>);
};
