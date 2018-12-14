import React from 'react';
import {shallow} from 'enzyme';
import Sortable from './index';

const defaultProps = {
    children: () => null,
    items: [],
    sortOptions: [{label: 'label', func: jest.fn}],
};

describe('Sortable', () => {
    it('should render without errors', () => {
        shallow(<Sortable {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Sortable {...defaultProps} />)).toMatchSnapshot();
    });
});
