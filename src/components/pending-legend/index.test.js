import React from 'react';
import {shallow} from 'enzyme';
import PendingLegend from './index';

describe('PendingLegend', () => {
    it('should render without errors', () => {
        shallow(<PendingLegend />);
    });

    it('should match snapshot', () => {
        expect(shallow(<PendingLegend />)).toMatchSnapshot();
    });
});
