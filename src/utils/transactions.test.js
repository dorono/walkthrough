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
import {
    mockTransferTransaction,
    mockConversion,
} from 'mocks/mockTransactions';

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
    expect(generateTransactionList(TRANSACTIONS.TITLE.INPUTS, mockConversion)).toEqual([
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
