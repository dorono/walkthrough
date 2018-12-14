import React from 'react';
import {shallow} from 'enzyme';
import Pagination from './index';

const defaultProps = {
    count: 0,
    limit: 0,
    offset: 0,
};

describe('Pagination', () => {
    it('should render without errors', () => {
        shallow(<Pagination {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Pagination {...defaultProps} />)).toMatchSnapshot();
    });
});
