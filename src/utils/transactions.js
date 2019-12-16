import BigNumber from 'bignumber.js';
import {TRANSACTIONS} from 'constants/transactions';

const hasOutputsArray = outputs =>
    Array.isArray(outputs) &&
    outputs.length &&
    typeof outputs[0] === 'object' &&
    outputs[0] !== null &&
    typeof outputs[0].amount === 'number';

export const isTransfer = transaction =>
    transaction.txaction === 1 && hasOutputsArray(transaction.outputs);

export const isPartialConversion = (txaction, outputs) =>
    txaction === 2 && hasOutputsArray(outputs);

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

export const generateTransactionList = (title, transactionData) => {
    // convert that data into an array for looping purposes
    let transactions = [transactionData];

    // for transfers, make sure that the list of outputs come from
    // the 'outputs' property of the transaction response
    if (title === TRANSACTIONS.TITLE.OUTPUTS) {
        if (isTransfer(transactions[0])) {
            transactions = transactions[0].outputs.map(output => {
                return {
                    user_address: output.address,
                    amount: output.amount,
                    unit: transactionData.fromasset,
                };
            });
        } else {
            transactions = [
                {
                    user_address: transactions[0].toaddress || transactions[0].fromaddress,
                    amount: transactions[0].toamount || transactions[0].fromamount,
                    unit: transactions[0].toasset,
                },
            ];

            if (isPartialConversion(transactionData.txaction, transactionData.outputs)) {
                transactions.push({
                    user_address: transactionData.fromaddress,
                    amount: transactionData.outputs[0].amount,
                    unit: transactionData.fromasset,
                    isPartialConversion: true,
                });
            }
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
    if (transaction.executed === TRANSACTIONS.STATUSES.PENDING.NUM_EXECUTED) {
        return TRANSACTIONS.STATUSES.PENDING.MESSAGE;
    }

    if (transaction.executed === TRANSACTIONS.STATUSES.REJECTED.NUM_EXECUTED) {
        return TRANSACTIONS.STATUSES.REJECTED.MESSAGE;
    }

    if (isTransfer(transaction)) {
        return transaction.outputs.reduce(
            (accumulator, outputAmt) => accumulator + outputAmt.amount,
            0,
        );
    }

    return transaction.toamount || transaction.fromamount;
};

export const getIndividualAmountOutputDisplay = (amount, transactionData) => {
    if (amount === undefined) {
        if (!transactionData) {
            return amount;
        }

        return getOutputReplacementText(transactionData.executed).message;
    }

    return amount;
};

export const getOutputReplacementText = executedVal => {
    let textMap = {
        tooltip: '',
        message: '',
    };

    switch (executedVal) {
        case TRANSACTIONS.STATUSES.PENDING.NUM_EXECUTED:
            textMap = {
                tooltip: TRANSACTIONS.STATUSES.PENDING.TOOLTIP,
                message: TRANSACTIONS.STATUSES.PENDING.MESSAGE,
                label: TRANSACTIONS.STATUSES.PENDING.LABEL,
            };
            break;
        case TRANSACTIONS.STATUSES.REJECTED.NUM_EXECUTED:
            textMap = {
                tooltip: TRANSACTIONS.STATUSES.REJECTED.TOOLTIP,
                message: TRANSACTIONS.STATUSES.REJECTED.MESSAGE,
                label: TRANSACTIONS.STATUSES.REJECTED.LABEL,
            };
            break;
    }

    return textMap;
};

export const getIndividualAmountTooltip = (amount, transactionData) => {
    if (
        (amount === undefined && transactionData) ||
        (typeof transactionData.executed === 'number' && transactionData.executed < 1)
    ) {
        return getOutputReplacementText(transactionData.executed).tooltip;
    }

    return '';
};

export const getPropertyLabel = propertyName => {
    if (propertyName && TRANSACTIONS.PEGNET_ASSET_LABELS[propertyName.toUpperCase()]) {
        return TRANSACTIONS.PEGNET_ASSET_LABELS[propertyName.toUpperCase()];
    }

    return propertyName;
};

export const getPegnetLabel = propertyName => {
    if (Object.values(TRANSACTIONS.PEGNET_ASSET_LABELS).indexOf(propertyName) >= 0) {
        const key = Object.keys(TRANSACTIONS.PEGNET_ASSET_LABELS).find(
            key => TRANSACTIONS.PEGNET_ASSET_LABELS[key] === propertyName,
        );
        const keyWithLowerCase = key[0].toLowerCase() + key.slice(1);
        return keyWithLowerCase;
    }
    return propertyName;
};

export const formatAmount = (children, unit) => {
    const fmt = {
        prefix: '',
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
        suffix: '',
    };
    let value = children;
    BigNumber.config({FORMAT: fmt, DECIMAL_PLACES: 8});
    const convertedNumber = new BigNumber(value);

    if (unit !== 'EC') {
        value = convertedNumber.dividedBy(TRANSACTIONS.FCT_CONVERSION).toFixed().toString();
    }

    const formattedNumber = new BigNumber(value);
    return formattedNumber.toFormat();
};

export const calculateConfirmations = (block) => {
    return block.syncheight - block.executed + 1 > 10
        ? '10+'
        : block.syncheight - block.executed + 1;
};
