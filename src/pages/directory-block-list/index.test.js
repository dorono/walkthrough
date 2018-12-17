import React from 'react';
import {shallow} from 'enzyme';
import {DirectoryBlockListPage} from './index';

jest.mock('../../utils/date', () => {
    return {
        currentTimezone: () => '11/11/11',
        formatDateLong: () => '11111111',
    };
});

const defaultProps = {
    data: [],
    count: 0,
    limit: 0,
    offset: 0,
};

describe('DirectoryBlockList', () => {
    it('should render without errors', () => {
        shallow(<DirectoryBlockListPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<DirectoryBlockListPage {...defaultProps} />)).toMatchSnapshot();
    });
});
