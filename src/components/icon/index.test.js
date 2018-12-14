import React from 'react';
import {shallow} from 'enzyme';
import Icon from './index';

const defaultProps = {
    name: 'Schedule',
};

describe('Icon', () => {
    it('should render without errors', () => {
        shallow(<Icon {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Icon {...defaultProps} />)).toMatchSnapshot();
    });
});
