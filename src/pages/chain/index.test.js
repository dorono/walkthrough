import React from 'react';
import {shallow} from 'enzyme';
import {ChainPage} from './index';

const defaultProps = {
    data: {
        external_ids: ['UlNBLVNIQTUxMg=='],
    },
    location: {},
};

describe('Chain', () => {
    it('should render without errors', () => {
        shallow(<ChainPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ChainPage {...defaultProps} />)).toMatchSnapshot();
    });
});
