import React from 'react';
import {shallow} from 'enzyme';
import {AdminBlockPage} from './index';

const defaultProps = {
    data: {},
    location: {},
};

describe('AdminBlock', () => {
    it('should render without errors', () => {
        shallow(<AdminBlockPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<AdminBlockPage {...defaultProps} />)).toMatchSnapshot();
    });
});
