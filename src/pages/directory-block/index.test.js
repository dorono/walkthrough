import React from 'react';
import {shallow} from 'enzyme';
import DirectoryBlockPage from './index';

const defaultProps = {
    data: {
        ablock: {
            hash: 'hash1',
            entries: {
                count: 4,
            },
        },
        ecblock: {
            hash: 'hash2',
            entries: {
                count: 6,
            },
        },
        eblocks: [{
            keymr: 'keymr',
            chain: {
                chain_id: 'chain1',
            },
            entries: {
                count: 23,
            },
        }],
        fblock: {
            hash: 'hash3',
            transactions: {
                count: 4,
            },
        },
    },
    location: {},
};

jest.mock('../../utils/date', () => {
    return {
        currentTimezone: () => '11/11/11',
        formatDateLong: () => '11111111',
    };
});

describe('DirectoryBlock', () => {
    it('should render without errors', () => {
        shallow(<DirectoryBlockPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<DirectoryBlockPage {...defaultProps} />)).toMatchSnapshot();
    });
});
