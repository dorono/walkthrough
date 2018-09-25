import React from 'react';
import {shallow} from 'enzyme';
import {Modal, ModalFooter, ModalHeader, ModalBody} from './index';

describe('Modal Component', () => {
    it('should render without errors', () => {
        shallow((
            <Modal>
                Test
            </Modal>
        ));
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
});

describe('ModalBody Component', () => {
    it('should render without errors', () => {
        shallow((
            <ModalBody>
                Test
            </ModalBody>
        ));
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
});
