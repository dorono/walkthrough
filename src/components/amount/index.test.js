import React from 'react';
import {shallow} from 'enzyme';
import Amount from './index';

const defaultProps = {
    unit: 'EC',
    children: 20000000000,
};

describe('Amount', () => {
    it('should render without errors', () => {
        shallow(<Amount {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Amount {...defaultProps} />)).toMatchSnapshot();
    });
});
