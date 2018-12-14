import React from 'react';
import {shallow} from 'enzyme';
import Tooltip from './index';

const defaultProps = {
    children: <h1>Test</h1>,
};

describe('Tooltip', () => {
    it('should render without errors', () => {
        shallow(<Tooltip {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Tooltip {...defaultProps} />)).toMatchSnapshot();
    });
});
