import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {isIE} from 'utils/user-agent';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'components/modal';
import Button from 'components/button';
import JsonViewer from 'components/json-viewer';
import styles from './styles.css';
import copyIcon from './assets/icon-copy.svg';

export default class JsonPopup extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
    };
    state = {
        showCopiedToast: false,
    };

    showToast = () => {
        this.setState({showCopiedToast: true});
        setTimeout(() => this.setState({showCopiedToast: false}), 1500);
    }

    renderCopyContentButton = () => {
        const {data} = this.props;
        return (
            <CopyToClipboard text={data}>
                <span className={classNames(styles.button, styles.buttonCopy)} onClick={this.showToast}>
                    <span className={classNames(styles.toast, {[styles.showToast]: this.state.showCopiedToast})}>
                        Copied
                    </span>
                    <img src={copyIcon} alt='Copy Content' />
                    Copy JSON
                </span>
            </CopyToClipboard>
        );
    }

    render() {
        const {
            onClose,
            show,
            data,
        } = this.props;
        return (
            <Modal
                show={show}
                className={classNames(
                    styles.modalRoot,
                    {
                        [styles.defaultPosition]: !isIE(),
                        [styles.iePosition]: isIE(),
                    },
                )}>
                <ModalHeader className={styles.modalHeader}>
                    Anchor
                </ModalHeader>
                <ModalBody className={styles.modalBody}>
                    <div className={styles.actionContainer}>
                        <span>JSON</span>
                        {this.renderCopyContentButton()}
                    </div>
                    <div className={styles.jsonContainer}>
                        <JsonViewer data={data} className={styles.jsonRoot} />
                    </div>
                </ModalBody>
                <ModalFooter className={styles.modalFooter}>
                    <Button
                        id='cancel-settings-popup'
                        title='CLOSE'
                        className={classNames(styles.button, styles.cancel)}
                        onClick={() => onClose()}
                        key='cancel'
                    />
                </ModalFooter>
            </Modal>
        );
    }
}
