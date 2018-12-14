import React from 'react';
import {shallow} from 'enzyme';
import AppMenu from './index';

describe('AppMenu', () => {
    it('should render without errors', () => {
        shallow(<AppMenu />);
    });

    it('should match snapshot', () => {
        expect(shallow(<AppMenu />)).toMatchSnapshot();
    });
});
