import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';

const AlertBarLegend = ({show, alertBarType, alertBarComponent}) => {
    return show && alertBarComponent ? (
        <div
            className={classNames(
                styles.root,
                styles.alertBarLegend,
                styles[alertBarType.toLowerCase()],
            )}>
            {alertBarComponent}
        </div>
    ) : null;
};

AlertBarLegend.propTypes = {
    show: PropTypes.bool,
    alertBarType: PropTypes.string,
    alertBarComponent: PropTypes.any,
};

export default AlertBarLegend;
