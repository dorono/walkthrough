import React from 'react';
import {shallow} from 'enzyme';
import JsonPopup from './index';

const defaultProps = {
    onClose: () => null,
    show: false,
    data: JSON.stringify({test: ''}),
};

describe('JsonPopup', () => {
    it('should render without errors', () => {
        shallow(<JsonPopup {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<JsonPopup {...defaultProps} />)).toMatchSnapshot();
    });
});
