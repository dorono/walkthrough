import React from 'react';
import {shallow} from 'enzyme';
import EntryContent from './index';

const defaultProps = {
    data: [],
};

describe('EntryContent', () => {
    it('should render without errors', () => {
        shallow(<EntryContent {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<EntryContent {...defaultProps} />)).toMatchSnapshot();
    });
});
