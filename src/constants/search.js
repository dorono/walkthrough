/* eslint-disable max-len */
export const SEARCH = {
    ERROR_MESSAGES: {
        INTERNAL_SEARCH: 'Internal server error, please try again',
        IS_KEY:
            "If you're searching for an address, note that only addresses with a transaction history will be returned.",
        IS_PRIVATE_KEY:
            // message appears to be cut off, as this
            // text precedes a variable
            'When searching, never expose your private key. Try again with your public key beginning with ',
        IS_PROBABLY_A_KEY:
            'It appears you might be searching for an address but have provided an invalid value, please check for typos.',
        NO_RESULTS_FOUND: 'No results found.',
    },
    SEARCH_KEYS: {
        ADDRESS: 'address',
        TXID: 'txid',
    },
};
/* eslint-enable max-len */
Object.freeze(SEARCH);
