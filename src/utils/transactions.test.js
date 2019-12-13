import {TRANSACTIONS} from 'constants/transactions';
import {
    isTransfer,
    getPegnetTransactionName,
    getOutputReplacementText,
    generateTransactionList,
    getOutputAmount,
    getPropertyLabel,
    formatAmount,
    calculateConfirmations,
} from './transactions';

const mockTransferTransaction = {
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

const mockConversionTransaction = {
    hash: '9a1dfe1a14a74db14f181d5acb2ce41b4182881a93e3336e1744fc714e326c1a',
    txid: '0-9a1dfe1a14a74db14f181d5acb2ce41b4182881a93e3336e1744fc714e326c1a',
    height: 216474,
    timestamp: '2019-10-29T15:05:00-05:00',
    executed: 216475,
    txindex: 0,
    txaction: 2,
    fromaddress: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
    fromasset: 'pFCT',
    fromamount: 400000000,
    toasset: 'pXBT',
    toamount: 110704,
    syncheight: 219653,
    factomheight: -1,
};

// adding an extra output item to test calculation of total amount
const transferTransactionMultipleOutputs = JSON.parse(JSON.stringify(mockTransferTransaction));
transferTransactionMultipleOutputs.outputs.push({
    address: 'FA3mi7Qm35CMoCku1yQ3Wx2SZmBitJAJDYhPVMeX82gkfccQPZVn',
    amount: 50000000000,
});

test('isTransfer should return true', () => {
    expect(isTransfer(mockTransferTransaction)).toEqual(true);
});

test('isPartial should return true', () => {
    expect(isTransfer(mockTransferTransaction)).toEqual(true);
});

test('getPegnetTransactionName should return transfer', () => {
    expect(getPegnetTransactionName(mockTransferTransaction.txaction)).toEqual(
        TRANSACTIONS.TYPE.TRANSFER.NAME,
    );
});

test('getOutputReplacementText should return pending', () => {
    const mockTransferTransactionPending = Object.assign({}, mockTransferTransaction, {
        executed: TRANSACTIONS.STATUSES.PENDING.NUM_EXECUTED,
    });
    expect(getOutputReplacementText(mockTransferTransactionPending.executed).label).toEqual(
        TRANSACTIONS.STATUSES.PENDING.LABEL,
    );
});

test('generateTransactionList should return the correct result object for TRANSFER', () => {
    expect(generateTransactionList(TRANSACTIONS.TITLE.OUTPUTS, mockTransferTransaction)).toEqual([
        {
            amount: 40000000000,
            unit: 'PEG',
            user_address: 'FA3mi7Qm35CMoCku1yQ3Wx2SZmBitJAJDYhPVMeX82gkfccQPZVn',
        },
    ]);
});

test('generateTransactionList should return the correct result object for CONVERSION', () => {
    expect(generateTransactionList(TRANSACTIONS.TITLE.INPUTS, mockConversionTransaction)).toEqual([
        {
            user_address: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
            amount: 400000000,
            unit: 'pFCT',
        },
    ]);
});

test('getOutputAmount should return the correct output amount with only 1 output', () => {
    expect(getOutputAmount(mockTransferTransaction)).toEqual(40000000000);
});

test('getOutputAmount should return the correct output amount with multiple outputs', () => {
    expect(getOutputAmount(transferTransactionMultipleOutputs)).toEqual(90000000000);
});

test('getPropertyLabel should return the correct user-facing asset label when there IS an alternate label', () => {
    expect(getPropertyLabel('pXAU')).toEqual(TRANSACTIONS.PEGNET_ASSET_LABELS.PXAU);
});

test('getPropertyLabel should return the correct user-facing asset label when there is NOT an alternate label', () => {
    expect(getPropertyLabel('pBNB')).toEqual('pBNB');
});

test('formatAmount should return the correct output with a decimal number, integer, or exponential', () => {
    expect(formatAmount(8095404198915177)).toEqual('80,954,041.98915177');
    expect(formatAmount(1)).toEqual('0.00000001');
});

test('calculateConfirmations should return the correct number of confirmations', () => {
    expect(calculateConfirmations(mockTransferTransaction)).toEqual('10+');

    const mockTransferTransactionLessConfirmations = Object.assign({}, mockTransferTransaction, {
        syncheight: 5,
        executed: 3,
    });
    expect(calculateConfirmations(mockTransferTransactionLessConfirmations)).toEqual(3);
});
