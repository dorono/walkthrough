import React from 'react';
import {shallow} from 'enzyme';
import Transaction from './index';

describe('Transaction', () => {
    it('should render without errors', () => {
        shallow(<Transaction />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Transaction />)).toMatchSnapshot();
    });
});
