import React from 'react';
import {shallow} from 'enzyme';
import ExternalIdList from './index';

const defaultProps = {
    externalIds: [],
};

describe('ExternalIdList', () => {
    it('should render without errors', () => {
        shallow(<ExternalIdList {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ExternalIdList {...defaultProps} />)).toMatchSnapshot();
    });
});
