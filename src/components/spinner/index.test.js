import React from 'react';
import {shallow} from 'enzyme';
import Spinner from './index';

describe('Spinner', () => {
    it('should render without errors', () => {
        shallow(<Spinner />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Spinner />)).toMatchSnapshot();
    });
});
