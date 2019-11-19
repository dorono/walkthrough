import React from 'react';
import {shallow} from 'enzyme';

import Landing from './index';

describe('Landing Page', () => {
    it('should render without errors', () => {
        shallow(<Landing />);
    });
});
