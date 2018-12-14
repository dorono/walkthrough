import React from 'react';
import {shallow} from 'enzyme';
import App from './index';

describe('App', () => {
    it('should render without errors', () => {
        shallow(<App />);
    });

    it('should match snapshot', () => {
        expect(shallow(<App />)).toMatchSnapshot();
    });
});
