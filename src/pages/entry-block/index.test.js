import React from 'react';
import {shallow} from 'enzyme';
import {EntryBlockPage} from './index';

const defaultProps = {
    data: {
        chain: {},
        next: {},
        prev: {},
    },
    location: {},
};

jest.mock('../../utils/date', () => {
    return {
        currentTimezone: () => '11/11/11',
        formatDateLong: () => '11111111',
    };
});

describe('EntryBlock', () => {
    it('should render without errors', () => {
        shallow(<EntryBlockPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<EntryBlockPage {...defaultProps} />)).toMatchSnapshot();
    });
});
