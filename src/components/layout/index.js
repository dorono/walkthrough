import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

const Horizontal = ({children}) => (
    <div className={styles.horizontal}>
        {children}
    </div>
);

const Vertical = ({className, children}) => (
    <div className={classNames(styles.vertical, className)}>
        {children}
    </div>
);

const VerticalToHorizontal = ({verticalUpTo, children}) => (
    <div className={classNames(styles.verticalToHorizontal,
        {[styles.verticalUpToSmall]: verticalUpTo === 'small'},
        {[styles.verticalUpToMedium]: verticalUpTo === 'medium'})}>
        {children}
    </div>
);
VerticalToHorizontal.propTypes = {
    verticalUpTo: PropTypes.oneOf(['small', 'medium']).isRequired,
};

const Box = ({type, className, children}) => (
    <div className={classNames(styles.box, styles[type], className)}>
        {children}
    </div>
);
Box.propTypes = {
    type: PropTypes.oneOf(['fill', 'outline', 'disabled', 'noBg']),
    className: PropTypes.string,
};

export {Horizontal, Vertical, Box, VerticalToHorizontal};
