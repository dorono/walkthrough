import React from 'react';
import {shallow} from 'enzyme';
import Label from './index';

describe('Label Component', () => {
    it('should render without errors', () => {
        shallow(
            <Label />,
        );
    });
});
