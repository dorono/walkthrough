import React from 'react';
import {shallow} from 'enzyme';
import Tabs from './index';

describe('Tabs', () => {
    it('should render without errors', () => {
        shallow(<Tabs items={[]} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Tabs items={[]} />)).toMatchSnapshot();
    });
});
