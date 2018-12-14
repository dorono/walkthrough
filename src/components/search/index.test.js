import React from 'react';
import {shallow} from 'enzyme';
import Search from './index';

const defaultProps = {
    apiConfig: {},
};

describe('Search', () => {
    it('should render without errors', () => {
        shallow(<Search {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Search {...defaultProps} />)).toMatchSnapshot();
    });
});
