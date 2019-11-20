import {TRANSACTIONS} from 'constants/transactions';

export const isTransfer = transaction => transaction.txaction === 1 && Array.isArray(transaction.outputs);

export const getPegnetTransactionName = txaction => {
    if (txaction === TRANSACTIONS.TYPE.TRANSFER.NUMBER) {
        return TRANSACTIONS.TYPE.TRANSFER.NAME;
    } else if (txaction === TRANSACTIONS.TYPE.COINBASE.NUMBER) {
        return TRANSACTIONS.TYPE.COINBASE.NAME;
    } else if (txaction === TRANSACTIONS.TYPE.CONVERSION.NUMBER) {
        return TRANSACTIONS.TYPE.CONVERSION.NAME;
    }

    return TRANSACTIONS.TYPE.BURN.NAME;
};

export const getTransactionStatus = transactionData => {
    if (transactionData.executed === 0) {
        return TRANSACTIONS.STATUSES.PENDING;
    } else if (transactionData.executed < 0) {
        return TRANSACTIONS.STATUSES.REJECTED;
    }

    return null;
};

export const generateTransactionList = (title, transactionData) => {
    // convert that data into an array for looping purposes
    let transactions = [transactionData];

    // for transfers, make sure that the list of outputs come from
    // the 'outputs' property of the transaction response
    if (title === TRANSACTIONS.TITLE.OUTPUTS) {
        if (isTransfer(transactions[0])) {
            transactions = transactions[0].outputs.map((output, idx) => {
                return {
                    user_address: output.address,
                    amount: output.amount,
                    unit: transactions[idx].fromasset,
                };
            });
        } else {
            transactions = [
                {
                    user_address: transactions[0].toaddress || transactions[0].fromaddress,
                    amount: transactions[0].toamount,
                    unit: transactions[0].toasset,
                },
            ];
        }
    } else {
        transactions = [
            {
                user_address: transactions[0].fromaddress,
                amount: transactions[0].fromamount,
                unit: transactions[0].fromasset,
            },
        ];
    }

    return transactions;
};

export const getOutputAmount = transaction => {
    if (isTransfer(transaction)) {
        return transaction.outputs.reduce(
            (accumulator, outputAmt) => accumulator + outputAmt.amount,
            0,
        );
    }

    return transaction.toamount;
};
