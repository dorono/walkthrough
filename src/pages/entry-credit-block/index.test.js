import React from 'react';
import {shallow} from 'enzyme';
import {EntryCreditBlockPage} from './index';

const defaultProps = {
    data: {},
    location: {},
};

describe('EntryCreditBlockPage', () => {
    it('should render without errors', () => {
        shallow(<EntryCreditBlockPage {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<EntryCreditBlockPage {...defaultProps} />)).toMatchSnapshot();
    });
});
