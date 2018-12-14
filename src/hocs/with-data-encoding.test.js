import React from 'react';
import {shallow} from 'enzyme';
import withDataEncoding from './with-data-encoding';

const WithDataEncoding = withDataEncoding(<h1>Test</h1>);

describe('withDataEncodings', () => {
    it('should render without errors', () => {
        shallow(<WithDataEncoding />);
    });

    it('should match snapshot', () => {
        const withDataEncoding = shallow(<WithDataEncoding />);
        expect(withDataEncoding).toMatchSnapshot();
    });
});
