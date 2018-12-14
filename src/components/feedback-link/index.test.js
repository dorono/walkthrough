import React from 'react';
import {shallow} from 'enzyme';
import FeedbackLink from './index';

describe('FeedbackLink', () => {
    it('should render without errors', () => {
        shallow(<FeedbackLink />);
    });

    it('should match snapshot', () => {
        expect(shallow(<FeedbackLink />)).toMatchSnapshot();
    });
});
