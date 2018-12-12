import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow, mount} from 'enzyme';

import Landing from './index';

jest.mock('../../contexts/api', () => {
    return {
        APIConfigurationConsumer: (props) => props.children({
            isConfiguredByDefault: () => true,
        }),
    };
});

describe('Landing Page', () => {
    it('should render without errors', () => {
        shallow(<Landing />);
    });

    it('should render only one redirect', () => {
        const landing = mount(<BrowserRouter><Landing /></BrowserRouter>);
        expect(landing.find('Redirect').length).toBe(1);
    });
});
