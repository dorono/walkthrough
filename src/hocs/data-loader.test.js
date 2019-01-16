import React from 'react';
import {shallow} from 'enzyme';
import {dataLoader} from './data-loader';

const DataLoader = dataLoader()(<h1>Test</h1>);

describe('withDataEncodings', () => {
    it('should render without errors', () => {
        shallow(<DataLoader />);
    });

    it('should match snapshot', () => {
        const withDataEncoding = shallow(<DataLoader />);
        expect(withDataEncoding).toMatchSnapshot();
    });
});
