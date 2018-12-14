import React from 'react';
import {shallow} from 'enzyme';
import Container from './index';

describe('Container', () => {
    it('should render without errors', () => {
        shallow(<Container />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Container />)).toMatchSnapshot();
    });
});
