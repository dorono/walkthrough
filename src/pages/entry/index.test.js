import React from 'react';
import {shallow} from 'enzyme';
import {withRouter} from 'react-router-dom';

import {Entry} from './index';

const EntryElement = React.createElement(withRouter(<Entry />));

describe('Entry Page', () => {
    it('should render without errors', () => {
        shallow(EntryElement);
    });
});
