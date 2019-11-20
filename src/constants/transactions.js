export const TRANSACTIONS = {
    TYPE: {
        TRANSFER: {
            NUMBER: 1,
            NAME: 'transfer',
        },
        CONVERSION: {
            NUMBER: 2,
            NAME: 'conversion',
        },
        COINBASE: {
            NUMBER: 3,
            NAME: 'coinbase',
        },
        BURN: {
            NUMBER: 4,
            NAME: 'burn',
        },
    },
    TITLE: {
        INPUTS: 'Inputs',
        OUTPUTS: 'Outputs',
    },
    STATUSES: {
        PENDING: 'Pending',
        REJECTED: 'Rejected',
    },
    PEGNET_PARENT_ROUTES: {
        TRANSACTIONS: 'transactions',
        ADDRESSES: 'addresses',
    },
    PEGNET_COMPLETED: 'pegnetCompleted',
    PEGNET_RECORDED: 'pegnetRecorded',
    PEGNET_CHAIN_ID:
        'cffce0f409ebba4ed236d49d89c70e4bd1f1367d86402a3363366683265a242d',
    PEGNET_ASSETS: [
        'EC',
        'FCT',
        'PEG',
        'pADA',
        'pBNB',
        'pBRL',
        'pCAD',
        'pCHF',
        'pCNY',
        'pDASH',
        'pDCR',
        'pETH',
        'pEUR',
        'pFCT',
        'pGBP',
        'pHKD',
        'pINR',
        'pJPY',
        'pKRW',
        'pLTC',
        'pMXN',
        'pPHP',
        'pRVN',
        'pSGD',
        'pUSD',
        'pXAG',
        'pXAU',
        'pXBC',
        'pXBT',
        'pXLM',
        'pXMR',
        'pZEC',
    ],

};

Object.freeze(TRANSACTIONS);
