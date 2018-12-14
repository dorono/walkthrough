import React from 'react';
import {shallow} from 'enzyme';
import JsonViewer from './index';

const defaultProps = {
    data: JSON.stringify({test: ''}),
};

describe('JsonViewer', () => {
    it('should render without errors', () => {
        shallow(<JsonViewer {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<JsonViewer {...defaultProps} />)).toMatchSnapshot();
    });
});
