import React from 'react';
import {shallow} from 'enzyme';
import BlockHeight from './index';

describe('BlockHeight', () => {
    it('should render without errors', () => {
        shallow(<BlockHeight />);
    });

    it('should match snapshot', () => {
        expect(shallow(<BlockHeight />)).toMatchSnapshot();
    });
});
