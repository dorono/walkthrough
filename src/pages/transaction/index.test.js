import React from 'react';
import {shallow, mount} from 'enzyme';
import {withRouter, MemoryRouter, Link} from 'react-router-dom';
import Monospaced from 'components/monospaced';
import * as Api from 'api';
import {TRANSACTIONS} from 'constants/transactions';
import {
    mockBurnTransaction,
    mockTransferTransaction,
    mockTransfer,
    mockJSONRPC,
    mockBuildJsonRPCData,
    mockPartialConversion,
} from './mockTransactions';
import {TransactionPage, buildJsonRPCData} from './index';

const TransactionElement = React.createElement(withRouter(<TransactionPage />));

// Stub request method
Api.requestJSONRPC = jest.fn();

const mockRouterProps = {
    location: {
        hash: '',
        pathname:
            '/transactions/0-22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02',
    },
    match: {
        params: {
            hash: '0-22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02',
        },
    },
};

const wrapper = mount(
    <MemoryRouter>
        <TransactionPage
            data={mockTransferTransaction}
            location={mockRouterProps.location}
            match={mockRouterProps.match}
        />
    </MemoryRouter>,
);
const wrapperTransaction = wrapper.find(TransactionPage);

describe('TransactionPage', () => {
    beforeEach(() => {
        Api.requestJSONRPC.mockImplementation(() => mockJSONRPC);
    });

    it('should render without errors', () => {
        shallow(TransactionElement);
    });

    it('buildJsonRPC should render correct information', () => {
        expect(
            buildJsonRPCData('0-22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02'),
        ).toEqual(mockBuildJsonRPCData);
    });

    it('should render the correct transaction type for TRANSFER', () => {
        expect(
            wrapperTransaction
                .find('#transaction-type')
                .find(Monospaced)
                .text(),
        ).toEqual(TRANSACTIONS.TYPE.TRANSFER.NAME);
    });

    it('should render the correct transaction type for BURN', () => {
        const wrapperForBurn = mount(
            <MemoryRouter>
                <TransactionPage
                    data={mockBurnTransaction}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );
        const wrapperBurnTransaction = wrapperForBurn.find(TransactionPage);

        expect(
            wrapperBurnTransaction
                .find('#transaction-type')
                .find(Monospaced)
                .text(),
        ).toEqual(TRANSACTIONS.TYPE.BURN.NAME);
    });

    it('should have the query param for the unit on the input and output links', () => {
        expect(
            wrapperTransaction
                .find(Monospaced)
                .findWhere(node => node.props().type === 'address')
                .first()
                .find(Link)
                .props().to,
        ).toEqual(`/addresses/${mockTransfer.fromaddress}/?asset=${mockTransfer.fromasset}`);
    });

    it('should render the correct transaction return amounts for a PARTIAL CONVERSION', () => {
        const wrapperForPartialConversion = mount(
            <MemoryRouter>
                <TransactionPage
                    data={mockPartialConversion}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );
        const wrapperPartialConversion = wrapperForPartialConversion.find(TransactionPage);

        const expectedReturnedAmount = '92.99712223 pFCT';

        expect(
            wrapperPartialConversion
                .find('#returned-amount')
                .find(Monospaced)
                .text(),
        ).toEqual(expectedReturnedAmount);

        expect(
            wrapperPartialConversion
                .find('#returned-difference')
                .text(),
        ).toEqual(TRANSACTIONS.PARTIAL_CONVERSION_DIFFERENCE_LABEL);

        expect(
            wrapperPartialConversion
                .find('#returned-val')
                .text(),
        ).toEqual(expectedReturnedAmount);
    });

    it('should match snapshot', () => {
        expect(shallow(TransactionElement)).toMatchSnapshot();
    });
});
