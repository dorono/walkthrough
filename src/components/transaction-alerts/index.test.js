import React from 'react';
import {shallow} from 'enzyme';
import {TRANSACTIONS} from 'constants/transactions';
import TransactionAlerts from './index';

describe('TransactionAlerts', () => {
    const defaultProps = {
        transactionType: TRANSACTIONS.STATUSES.PENDING,
    };

    it('should render without errors', () => {
        shallow(<TransactionAlerts {...defaultProps} />);
    });

    it('should match snapshot for a PENDING transaction', () => {
        const defaultProps = {
            transactionType: TRANSACTIONS.STATUSES.PENDING,
        };

        expect(shallow(<TransactionAlerts {...defaultProps} />)).toMatchSnapshot();
    });

    it('should match snapshot for a REJECTED transaction', () => {
        const defaultProps = {
            transactionType: TRANSACTIONS.STATUSES.REJECTED,
        };

        expect(shallow(<TransactionAlerts {...defaultProps} />)).toMatchSnapshot();
    });
});
