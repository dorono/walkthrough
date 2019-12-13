export const TRANSACTIONS = {
    TYPE: {
        TRANSFER: {
            NUMBER: 1,
            NAME: 'Transfer',
        },
        CONVERSION: {
            NUMBER: 2,
            NAME: 'Conversion',
        },
        COINBASE: {
            NUMBER: 3,
            NAME: 'Coinbase',
        },
        BURN: {
            NUMBER: 4,
            NAME: 'Burn',
        },
    },
    TITLE: {
        INPUTS: 'Inputs',
        OUTPUTS: 'Outputs',
    },
    STATUSES: {
        PENDING: {
            LABEL: 'Pending',
            NUM_EXECUTED: 0,
            ALERT_TEXT: 'This transaction has not yet been processed by PegNet.',
            MESSAGE: 'Not yet available',
            TOOLTIP: 'Output amount is calculated based on conversion rate at time of processing',
        },
        REJECTED: {
            LABEL: 'Rejected',
            NUM_EXECUTED: -1,
            ALERT_TEXT: 'This transaction has been rejected due to insufficient funds.',
            MESSAGE: '(N/A)',
            TOOLTIP: 'This transaction has been rejected due to insufficient funds',
        },
    },
    PEGNET_PARENT_ROUTES: {
        TRANSACTIONS: 'transactions',
        ADDRESSES: 'addresses',
    },
    PEGNET_COMPLETED: 'pegnetCompleted',
    PEGNET_RECORDED: 'pegnetRecorded',
    PEGNET_CHAIN_ID: 'cffce0f409ebba4ed236d49d89c70e4bd1f1367d86402a3363366683265a242d',
    PEGNET_ASSET_LABELS: {
        PXAU: 'pGOLD',
        PXAG: 'pSILVER',
        PXBT: 'pBTC',
        PXBC: 'pBCH',
    },
    PARTIAL_CONVERSION_DIFFERENCE_LABEL: '(returned)',
    FCT_CONVERSION: 100000000,
};

Object.freeze(TRANSACTIONS);
