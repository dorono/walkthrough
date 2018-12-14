import React from 'react';
import {shallow} from 'enzyme';
import Checkbox from './index';

describe('Checkbox', () => {
    it('should render without errors', () => {
        shallow(<Checkbox />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Checkbox />)).toMatchSnapshot();
    });
});
