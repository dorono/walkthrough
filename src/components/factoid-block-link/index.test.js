import React from 'react';
import {shallow} from 'enzyme';
import FactoidBlockLink from './index';

describe('FactoidBlockLink', () => {
    it('should render without errors', () => {
        shallow(<FactoidBlockLink />);
    });

    it('should match snapshot', () => {
        expect(shallow(<FactoidBlockLink />)).toMatchSnapshot();
    });
});
