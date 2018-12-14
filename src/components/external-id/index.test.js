import React from 'react';
import {shallow} from 'enzyme';
import ExternalId from './index';

const defaultProps = {
    data: [],
};

describe('ExternalId', () => {
    it('should render without errors', () => {
        shallow(<ExternalId {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ExternalId {...defaultProps} />)).toMatchSnapshot();
    });
});
