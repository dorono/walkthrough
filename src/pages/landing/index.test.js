import React from 'react';
import {shallow} from 'enzyme';

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
});
