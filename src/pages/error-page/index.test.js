import React from 'react';
import {shallow} from 'enzyme';
import ErrorPage from './index';

describe('ErrorPage', () => {
    it('should render without errors', () => {
        shallow(<ErrorPage />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ErrorPage />)).toMatchSnapshot();
    });
});
