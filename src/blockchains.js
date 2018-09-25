export const AVAILABLE_BLOCKCHAINS = {
    MAINNET: {
        label: 'Mainnet',
        value: 0,
        serviceName: 'mainnet',
        url: CONFIG.apiUrls.mainnet,
    },
    SHARED: {
        label: 'Shared Sandbox',
        value: 1,
        serviceName: 'shared',
        url: CONFIG.apiUrls.sharedSandbox,
    },
    PRIVATE: {
        label: 'Private Network',
        value: 2,
        serviceName: 'private_network',
        url: null,
    },
};

Object.freeze(AVAILABLE_BLOCKCHAINS);
