import React from 'react';
import {shallow} from 'enzyme';
import Anchor from './index';

describe('Anchor', () => {
    it('should render without errors', () => {
        shallow(<Anchor />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Anchor />)).toMatchSnapshot();
    });
});
