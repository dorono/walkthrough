export const AVAILABLE_BLOCKCHAINS = {
    PUBLIC: {
        label: CONFIG.blockchainNetwork,
        value: 0,
        serviceName: 'mainnet',
        url: CONFIG.gatewayUrls.publicNet,
    },
    SHARED: {
        label: 'Shared Sandbox',
        value: 1,
        serviceName: 'shared',
        url: CONFIG.gatewayUrls.sharedSandbox,
    },
    PRIVATE: {
        label: 'Private Network',
        value: 2,
        serviceName: 'private_network',
        url: null,
    },
};

Object.freeze(AVAILABLE_BLOCKCHAINS);
