import React from 'react';
import {shallow} from 'enzyme';
import WindowEventListener from './index';

const defaultProps = {
    events: [],
    handler: () => null,
};

describe('WindowEventListener', () => {
    it('should render without errors', () => {
        shallow(<WindowEventListener {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<WindowEventListener {...defaultProps} />)).toMatchSnapshot();
    });
});
