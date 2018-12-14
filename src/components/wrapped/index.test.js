import React from 'react';
import {shallow} from 'enzyme';
import Wrapped from './index';

describe('Wrapped', () => {
    it('should render without errors', () => {
        shallow(<Wrapped />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Wrapped />)).toMatchSnapshot();
    });
});
