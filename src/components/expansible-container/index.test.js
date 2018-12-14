import React from 'react';
import {shallow} from 'enzyme';
import ExpansibleContainer from './index';

describe('ExpansibleContainer', () => {
    it('should render without errors', () => {
        shallow(<ExpansibleContainer />);
    });

    it('should match snapshot', () => {
        expect(shallow(<ExpansibleContainer />)).toMatchSnapshot();
    });
});
