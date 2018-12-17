import React from 'react';
import {shallow} from 'enzyme';
import {withRouter} from 'react-router-dom';

import Address from './index';

const AddressElement = React.createElement(withRouter(<Address />));

describe('Address Page', () => {
    it('should render without errors', () => {
        shallow(AddressElement);
    });

    it('should match snapshot', () => {
        expect(shallow(AddressElement)).toMatchSnapshot();
    });
});
