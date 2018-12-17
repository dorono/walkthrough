import React from 'react';
import {shallow} from 'enzyme';
import {FactoidBlockPage} from './index';

const defaultProps = {
    data: {
        transactions: [],
    },
    location: {},
};

describe('FactoidBlock', () => {
    it('should render without errors', () => {
        shallow(<FactoidBlockPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<FactoidBlockPage {...defaultProps} />)).toMatchSnapshot();
    });
});
