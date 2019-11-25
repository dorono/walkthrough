import React from 'react';
import {shallow, mount} from 'enzyme';
import {withRouter, MemoryRouter} from 'react-router-dom';
import Monospaced from 'components/monospaced';
import * as Api from 'api';
import {TRANSACTIONS} from 'constants/transactions';
import {TransactionPage, buildJsonRPCData} from './index';

const TransactionElement = React.createElement(withRouter(<TransactionPage />));

// Stub request method
Api.requestJSONRPC = jest.fn();

const mockTransferTransaction = {
    jsonRPC: [
        {
            actions: [
                {
                    hash: '22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02',
                    txid: '0-22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02',
                    height: 217184,
                    timestamp: '2019-11-03T12:27:00-06:00',
                    executed: 217184,
                    txindex: 0,
                    txaction: 1,
                    fromaddress: 'FA3pJdFJ5HFSZea5EG9Q76iV6dhi25SsZ1E1TEAPhXYwwCTw9utt',
                    fromasset: 'PEG',
                    fromamount: 40000000000,
                    outputs: [
                        {
                            address: 'FA3mi7Qm35CMoCku1yQ3Wx2SZmBitJAJDYhPVMeX82gkfccQPZVn',
                            amount: 40000000000,
                        },
                    ],
                    syncheight: 219616,
                    factomheight: 219616,
                },
            ],
        },
    ],
};

const mockJSONRPC = {
    result: {
        actions: [mockTransferTransaction],
        count: 0,
        nextoffset: 0,
    },
};

const mockBuildJsonRPCData = [
    {
        method: 'get-transaction',
        params: {
            txid: '0-22b907873fd5fa617b66a559bca721e45710a0ffbea06189782d89fd9b3a3c02',
        },
    },
    {
        method: 'get-sync-status',
    },
];

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

    it('should render the correct transaction type', () => {
        const wrapper = mount(
            <MemoryRouter>
                <TransactionPage
                    data={mockTransferTransaction}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );
        const wrapperAddress = wrapper.find(TransactionPage);
        expect(
            wrapperAddress
                .find('#transaction-type')
                .find(Monospaced)
                .text(),
        ).toEqual(TRANSACTIONS.TYPE.TRANSFER.NAME);
    });

    it('should match snapshot', () => {
        expect(shallow(TransactionElement)).toMatchSnapshot();
    });
});
