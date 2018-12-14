import React from 'react';
import {shallow} from 'enzyme';
import Select from './index';

const defaultProps = {
    options: [],
    value: '',
    onChange: () => null,
};

describe('Select', () => {
    it('should render without errors', () => {
        shallow(<Select {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Select {...defaultProps} />)).toMatchSnapshot();
    });
});
