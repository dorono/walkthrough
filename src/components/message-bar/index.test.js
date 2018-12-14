import React from 'react';
import {shallow} from 'enzyme';
import MessageBar from './index';

describe('MessageBar', () => {
    it('should render without errors', () => {
        shallow(<MessageBar />);
    });

    it('should match snapshot', () => {
        expect(shallow(<MessageBar />)).toMatchSnapshot();
    });
});
