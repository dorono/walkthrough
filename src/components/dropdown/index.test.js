import React from 'react';
import {shallow} from 'enzyme';
import Dropdown from './index';

jest.mock('react-onclickoutside');

const defaultProps = {
    onOptionClick: () => null,
    options: [],
    selected: {},
};

describe('Dropdown', () => {
    it('should render without errors', () => {
        shallow(<Dropdown {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Dropdown {...defaultProps} />)).toMatchSnapshot();
    });
});
