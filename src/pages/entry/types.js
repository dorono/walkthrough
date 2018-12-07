import {shape, number, string, bool, array} from 'prop-types';

export const ENTRY_DETAIL_TYPE = shape({
    apiConfig: shape({
        apiUrl: string.isRequired,
        apiVersion: string.isRequired,
        appId: string,
        appKey: string,
        appName: string,
        blockchain: string.isRequired,
    }),
    data: shape({
        chain: shape({
            chain_id: string.isRequired,
            href: string.isRequired,
        }).isRequired,
        content: string.isRequired,
        created_at: string,
        eblock: string,
        entry_hash: string.isRequired,
        external_ids: array,
        stage: string,
    }).isRequired,
    history: shape({
        length: number,
        action: string,
        location: shape({
            pathname: string,
            search: string,
            hash: string,
            key: string,
        }),
    }),
    location: shape({
        hash: string,
        key: string,
        pathname: string,
        search: string,
        state: string,
    }),
    match: shape({
        path: string,
        url: string,
        isExact: bool,
        params: shape({
            chain: string,
            hash: string,
        }),
    }),
});
