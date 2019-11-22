import React from 'react';
import {shallow} from 'enzyme';
import TransactionAlerts from 'components/transaction-alerts';
import {TRANSACTIONS} from 'constants/transactions';
import AlertBarLegend from './index';

const defaultProps = {
    show: true,
    alertBarType: TRANSACTIONS.STATUSES.PENDING.LABEL,
    alertBarComponent: <TransactionAlerts transactionType={TRANSACTIONS.STATUSES.PENDING.LABEL} />,
};

describe('alertBarLegend', () => {
    it('should render without errors', () => {
        shallow(<AlertBarLegend {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<AlertBarLegend {...defaultProps} />)).toMatchSnapshot();
    });
});
