import React from 'react';
import {shallow} from 'enzyme';
import Monospaced from './index';

describe('Monospaced', () => {
    it('should render without errors', () => {
        shallow(<Monospaced />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Monospaced />)).toMatchSnapshot();
    });
});
