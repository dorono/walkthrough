import React from 'react';
import {shallow} from 'enzyme';
import {ChainListPage} from './index';

const defaultProps = {
    data: [{chain_id: 1}],
    location: {},
    count: 0,
    limit: 0,
    offset: 0,
};

describe('ChainList', () => {
    it('should render without errors', () => {
        shallow(<ChainListPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ChainListPage {...defaultProps} />)).toMatchSnapshot();
    });
});
