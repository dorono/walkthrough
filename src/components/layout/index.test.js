import React from 'react';
import {shallow} from 'enzyme';
import {Horizontal, Vertical, VerticalToHorizontal, Box} from './index';

describe('Horizontal Component', () => {
    it('should render without errors', () => {
        shallow(
            <Horizontal />,
        );
    });

    it('should match snapshot', () => {
        expect(shallow(<Horizontal />)).toMatchSnapshot();
    });
});

describe('Vertical Component', () => {
    it('should render without errors', () => {
        shallow(
            <Vertical />,
        );
    });

    it('should match snapshot', () => {
        expect(shallow(<Vertical />)).toMatchSnapshot();
    });
});

describe('VerticalToHorizontal Component', () => {
    const defaultProps = {
        verticalUpTo: 'small',
    };

    it('should render without errors', () => {
        shallow(
            <VerticalToHorizontal {...defaultProps} />,
        );
    });

    it('should match snapshot', () => {
        expect(shallow(<VerticalToHorizontal {...defaultProps} />)).toMatchSnapshot();
    });
});

describe('Box Component', () => {
    it('should render without errors', () => {
        shallow(
            <Box />,
        );
    });

    it('should match snapshot', () => {
        expect(shallow(<Box />)).toMatchSnapshot();
    });
});
