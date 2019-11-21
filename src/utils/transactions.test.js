import {TRANSACTIONS} from 'constants/transactions';
import {
    isTransfer,
    getPegnetTransactionName,
    getTransactionStatus,
    generateTransactionList,
    // getOutputAmount,
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

test('isTransfer should return true', () => {
    expect(isTransfer(mockTransferTransaction)).toEqual(true);
});

test('getPegnetTransactionName should return transfer', () => {
    expect(getPegnetTransactionName(mockTransferTransaction.txaction)).toEqual(TRANSACTIONS.TYPE.TRANSFER.NAME);
});

test('getTransactionStatus should return pending', () => {
    mockTransferTransaction.executed = 0;
    expect(getTransactionStatus(mockTransferTransaction)).toEqual(TRANSACTIONS.STATUSES.PENDING);
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



// export const generateTransactionList = (title, transactionData) => {
//     // convert that data into an array for looping purposes
//     let transactions = [transactionData];

//     // for transfers, make sure that the list of outputs come from
//     // the 'outputs' property of the transaction response
//     if (title === TRANSACTIONS.TITLE.OUTPUTS) {
//         if (isTransfer(transactions[0])) {
//             transactions = transactions[0].outputs.map((output, idx) => {
//                 return {
//                     user_address: output.address,
//                     amount: output.amount,
//                     unit: transactions[idx].fromasset,
//                 };
//             });
//         } else {
//             transactions = [
//                 {
//                     user_address: transactions[0].toaddress || transactions[0].fromaddress,
//                     amount: transactions[0].toamount,
//                     unit: transactions[0].toasset,
//                 },
//             ];
//         }
//     } else {
//         transactions = [
//             {
//                 user_address: transactions[0].fromaddress,
//                 amount: transactions[0].fromamount,
//                 unit: transactions[0].fromasset,
//             },
//         ];
//     }

//     return transactions;
// };

// export const getOutputAmount = transaction => {
//     if (isTransfer(transaction)) {
//         return transaction.outputs.reduce(
//             (accumulator, outputAmt) => accumulator + outputAmt.amount,
//             0,
//         );
//     }

//     return transaction.toamount;
// };
