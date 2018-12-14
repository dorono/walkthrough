import React from 'react';
import {shallow} from 'enzyme';
import Hash from './index';

describe('Hash', () => {
    it('should render without errors', () => {
        shallow(<Hash />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Hash />)).toMatchSnapshot();
    });
});
