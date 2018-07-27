import React from 'react';
import {shallow} from 'enzyme';
import {withRouter} from 'react-router-dom';

import Address from './index';

const AddressElement = React.createElement(withRouter(<Address />));

describe('Address Page', () => {
    it('should render without throwing an error', () => {
        expect(shallow(AddressElement).exists(<div />)).toBe(true);
    });
});
