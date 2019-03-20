import React from 'react';
import {shallow} from 'enzyme';
import {redirectWrapper} from './redirect-wrapper';

const RedirectWrapper = redirectWrapper()(<h1>Test</h1>);

describe('redirectWrapper', () => {
    it('should render without errors', () => {
        shallow(<RedirectWrapper />);
    });

    it('should match snapshot', () => {
        const redirectWrapper = shallow(<RedirectWrapper />);
        expect(redirectWrapper).toMatchSnapshot();
    });
});
