import React from 'react';
import {shallow} from 'enzyme';
import AppFooter from './index';

const defaultProps = {
    apiConfig: {},
};

describe('AppFooter', () => {
    it('should render without errors', () => {
        shallow(<AppFooter {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<AppFooter {...defaultProps} />)).toMatchSnapshot();
    });
});
