import React from 'react';
import {shallow, mount} from 'enzyme';
import {withRouter, MemoryRouter, Link} from 'react-router-dom';
import Monospaced from 'components/monospaced';
import * as Api from 'api';
import {TRANSACTIONS} from 'constants/transactions';
import {TransactionPage, buildJsonRPCData} from './index';

const TransactionElement = React.createElement(withRouter(<TransactionPage />));

// Stub request method
Api.requestJSONRPC = jest.fn();

const mockTransferData = {
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
};

const mockBurnData = {
    hash: '3c430496ffa0dcbbfe551e6fec4f24f9aa13aad320523db11d51b1797cf3129b',
    txid: '0-3c430496ffa0dcbbfe551e6fec4f24f9aa13aad320523db11d51b1797cf3129b',
    height: 216692,
    timestamp: '2019-10-31T03:31:01-05:00',
    executed: 216692,
    txindex: 0,
    txaction: 4,
    fromaddress: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
    fromasset: 'FCT',
    fromamount: 1000000000,
    toasset: 'pFCT',
    toamount: 1000000000,
    syncheight: 220279,
    factomheight: 220279,
};

const mockTransferTransaction = {
    jsonRPC: [
        {
            actions: [mockTransferData],
        },
    ],
};

const mockBurnTransaction = {
    jsonRPC: [
        {
            actions: [mockBurnData],
        },
    ],
};

const mockTransfer = mockTransferTransaction.jsonRPC[0].actions[0];

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

    it('should match snapshot', () => {
        expect(shallow(TransactionElement)).toMatchSnapshot();
    });
});
