import React from 'react';
import {shallow} from 'enzyme';
import DirectoryBlockLink from './index';

describe('DirectoryBlockLink', () => {
    it('should render without errors', () => {
        shallow(<DirectoryBlockLink />);
    });

    it('should match snapshot', () => {
        expect(shallow(<DirectoryBlockLink />)).toMatchSnapshot();
    });
});
