import React from 'react';
import {shallow, mount} from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';

import BlockLink from './index';

describe('Block Link', () => {
    it('should render without errors', () => {
        shallow(<BlockLink />);
    });

    it('should render 1 hash when no children is specified', () => {
        const wrapper = mount(<Router><BlockLink type='fblock' /></Router>);
        const spans = wrapper.find('Hash');
        expect(spans.length).toBe(1);
    });

    it('should render 1 Link when type prop is dblock and 0 in other case', () => {
        const blockWrapper = mount(<Router><BlockLink
            type='dblock'
            isLink>{{number: 11111}}</BlockLink></Router>);
        const factoidBlockWrapper = mount(<Router><BlockLink
            type='fblock'>{{number: 11111}}</BlockLink></Router>);
        const blockLinks = blockWrapper.find('Link');
        const fBlockLinks = factoidBlockWrapper.find('Link');
        expect(blockLinks.length).toBe(1);
        expect(fBlockLinks.length).toBe(0);
    });
});
