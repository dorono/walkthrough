import React from 'react';
import {shallow} from 'enzyme';
import EntryBlockLink from './index';

describe('EntryBlockLink', () => {
    it('should render without errors', () => {
        shallow(<EntryBlockLink />);
    });

    it('should match snapshot', () => {
        expect(shallow(<EntryBlockLink />)).toMatchSnapshot();
    });
});
