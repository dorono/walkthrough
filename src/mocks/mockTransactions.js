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

const mockPartialConversionData = {
    MOCK_PARTIAL: 'YES',
    executed: 131,
    fromaddress: 'FA3pJdFJ5HFSZea5EG9Q76iV6dhi25SsZ1E1TEAPhXYwwCTw9utt',
    fromamount: 10000000000,
    fromasset: 'pFCT',
    hash: '1c39dc93c7fd058a50faded6f0932eb592b8cc6d1576b09ed8dc3672549571af',
    height: 130,
    outputs: [
        {
            address: 'FA3pJdFJ5HFSZea5EG9Q76iV6dhi25SsZ1E1TEAPhXYwwCTw9utt',
            amount: 9299712223,
        },
    ],
    timestamp: '2019-11-26T17:47:00-06:00',
    toamount: 250000000000,
    toasset: 'PEG',
    txaction: 2,
    txid: '0-1c39dc93c7fd058a50faded6f0932eb592b8cc6d1576b09ed8dc3672549571af',
    txindex: 0,
    syncheight: 220279,
    factomheight: 220279,
};

const mockPendingTransactionData = {
    hash: 'ee6964758b5595d06047cd2dd3680f9d21cb6ccf0e179b0883e28b0cbaf5f959',
    txid: '0-ee6964758b5595d06047cd2dd3680f9d21cb6ccf0e179b0883e28b0cbaf5f959',
    height: 222128,
    timestamp: '2019-12-08T17:28:00Z',
    executed: 0,
    txindex: 0,
    txaction: 2,
    fromaddress: 'FA3GvuSth7b8t5KVHZ2kUnjx5C9XCw8pRvs4Ci8MCg7uLfQwnt9K',
    fromasset: 'pFCT',
    fromamount: 100000000000,
    toasset: 'PEG',
};

const mockConversionData = {
    hash: '9a1dfe1a14a74db14f181d5acb2ce41b4182881a93e3336e1744fc714e326c1a',
    txid: '0-9a1dfe1a14a74db14f181d5acb2ce41b4182881a93e3336e1744fc714e326c1a',
    height: 216474,
    timestamp: '2019-10-29T15:05:00-05:00',
    executed: 216475,
    txindex: 0,
    txaction: 2,
    fromaddress: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
    fromasset: 'pFCT',
    fromamount: 1000000000,
    toasset: 'PEG',
    toamount: 682954423251,
    syncheight: 219653,
    factomheight: -1,
};

export const mockTransferTransaction = {
    jsonRPC: [
        {
            actions: [mockTransferData],
        },
    ],
};

export const mockBurnTransaction = {
    jsonRPC: [
        {
            actions: [mockBurnData],
        },
    ],
};

export const mockConversion = {
    jsonRPC: [
        {
            actions: [mockConversionData],
        },
    ],
};

export const mockPartialConversion = {
    jsonRPC: [
        {
            actions: [mockPartialConversionData],
        },
    ],
};

export const mockPendingTransaction = {
    jsonRPC: [
        {
            actions: [mockPendingTransactionData],
        },
    ],
};

export const mockTransfer = mockTransferTransaction.jsonRPC[0].actions[0];

export const mockJSONRPC = {
    result: {
        actions: [mockTransferTransaction],
        count: 0,
        nextoffset: 0,
    },
};

export const mockBuildJsonRPCData = [
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
