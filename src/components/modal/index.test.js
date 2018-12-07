import React from 'react';
import {shallow} from 'enzyme';
import {Modal, ModalFooter, ModalHeader, ModalBody} from './index';

const defaultProps = {
    setModalSize: false,
};

describe('Modal Component', () => {
    it('should render without errors', () => {
        shallow((
            <Modal>
                Test
            </Modal>
        ));
    });

    it('should have a css height value of "auto" upon rendering for the first time', () => {
        const wrapper = shallow(<Modal {...defaultProps}>Test</Modal>);
        const cssHeight = wrapper.instance().renderModalHeight();
        expect(cssHeight).toEqual(expect.objectContaining({
            height: 'auto',
        }));
    });

    it('should match snapshot', () => {
        expect(shallow(<Modal>Test</Modal>)).toMatchSnapshot();
    });
});

describe('ModalHeader Component', () => {
    it('should render without errors', () => {
        shallow((
            <ModalHeader>
                Test
            </ModalHeader>
        ));
    });

    it('should match snapshot', () => {
        expect(shallow(<ModalHeader />)).toMatchSnapshot();
    });
});

describe('ModalBody Component', () => {
    it('should render without errors', () => {
        shallow((
            <ModalBody>
                Test
            </ModalBody>
        ));
    });

    it('should match snapshot', () => {
        expect(shallow(<ModalBody />)).toMatchSnapshot();
    });
});

describe('ModalFooter Component', () => {
    it('should render without errors', () => {
        shallow((
            <ModalFooter>
                Test
            </ModalFooter>
        ));
    });

    it('should match snapshot', () => {
        expect(shallow(<ModalFooter />)).toMatchSnapshot();
    });
});
