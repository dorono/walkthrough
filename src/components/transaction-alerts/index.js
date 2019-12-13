import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/icon';
import {TRANSACTIONS} from 'constants/transactions';

import styles from './styles.css';

const TransactionAlerts = ({transactionType}) => {
    let alertContent = '';
    let iconName = '';
    if (transactionType === TRANSACTIONS.STATUSES.PENDING.LABEL) {
        alertContent = TRANSACTIONS.STATUSES.PENDING.ALERT_TEXT;
        iconName = 'Schedule';
    } else if (transactionType === TRANSACTIONS.STATUSES.REJECTED.LABEL) {
        alertContent = TRANSACTIONS.STATUSES.REJECTED.ALERT_TEXT;
        iconName = 'ErrorOutlineIcon';
    }

    return (
        <div className={classNames(styles.root, styles.transactionAlertLegendHighlight)}>
            {iconName && <Icon className={styles.transactionAlertLegendIcon} name={iconName} />}
            <span>
                <strong>{transactionType}: </strong> {alertContent}
            </span>
        </div>
    );
};

TransactionAlerts.propTypes = {
    transactionType: PropTypes.string,
};

export default TransactionAlerts;
