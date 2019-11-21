import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/icon';
import {TRANSACTIONS} from 'constants/transactions';

import styles from './styles.css';

const TransactionAlerts = ({transactionType}) => {
    let alertContent = '';
    let iconName = '';
    if (transactionType === TRANSACTIONS.STATUSES.PENDING) {
        alertContent = 'This transaction has not yet been written to the Factom blockchain.';
        iconName = 'Schedule';
    } else if (transactionType === TRANSACTIONS.STATUSES.REJECTED) {
        alertContent = 'This transaction has been rejected due to insufficient funds';
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
