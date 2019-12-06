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
    DORON: 'YES',
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

export const mockPartialConversion = {
    jsonRPC: [
        {
            actions: [mockPartialConversionData],
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
