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
        },
        REJECTED: {
            LABEL: 'Rejected',
            NUM_EXECUTED: -1,
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
};

Object.freeze(TRANSACTIONS);
