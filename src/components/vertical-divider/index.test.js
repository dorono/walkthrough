import React from 'react';
import {shallow} from 'enzyme';
import VerticalDivider from './index';

describe('VerticalDivider', () => {
    it('should render without errors', () => {
        shallow(<VerticalDivider />);
    });

    it('should match snapshot', () => {
        expect(shallow(<VerticalDivider />)).toMatchSnapshot();
    });
});
