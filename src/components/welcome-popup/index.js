import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'components/modal';
import styles from './styles.css';

const storageKey = 'factom.explorer.welcome';

@autobind
export default class WelcomePopup extends Component {
    state = {
        visible: window.localStorage.getItem(storageKey) !== 'true',
    };

    handleClose() {
        this.setState({visible: false});
        window.localStorage.setItem(storageKey, 'true');
    }

    render() {
        if (!this.state.visible) return null;
        const {feedbackUrl} = this.props;

        return (
            <Modal show={this.state.visible}>
                <ModalHeader className={styles.modalHeader}>
                    Welcome to the <span className={styles.new}>NEW</span><br />
                    FACTOM BLOCKCHAIN EXPLORER!
                </ModalHeader>
                <ModalBody className={styles.modalBody}>
                    <div>We are currently in beta and will be rolling out updates over the coming weeks.</div>
                    <div>Your <a href={feedbackUrl} target='_blank'>FEEDBACK</a> is welcome and appreciated!</div>
                    <div>THE FACTOM TEAM</div>
                </ModalBody>
                <ModalFooter className={styles.modalFooter}>
                    <button className={styles.button} onClick={this.handleClose}>
                        GOT IT!
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}
