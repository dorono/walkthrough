import React from 'react';
import {shallow} from 'enzyme';
import HexViewer from './index';

const defaultProps = {
    data: '',
};

describe('HexViewer', () => {
    it('should render without errors', () => {
        shallow(<HexViewer {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<HexViewer {...defaultProps} />)).toMatchSnapshot();
    });
});
