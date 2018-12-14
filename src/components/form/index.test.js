import React from 'react';
import {shallow} from 'enzyme';
import {Form} from './index';

describe('Form.Form', () => {
    it('should render without errors', () => {
        shallow(<Form />);
    });

    it('should match snapshot', () => {
        expect(shallow(<Form />)).toMatchSnapshot();
    });
});
