import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {autobind} from 'core-decorators';
import isEqual from 'lodash/isEqual';
import A from 'components/anchor';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'components/modal';
import {Form, FormGroup} from 'components/form';
import Label from 'components/label';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Input from 'components/input';
import Button from 'components/button';
import MessageBar from 'components/message-bar';
import {request} from 'api';
import APIConfig from 'utils/api-config';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';
import {trackAccessConnectLandingPage, trackSuccessfulConnection} from 'analytics';
import styles from './styles.css';
import {CredentialsErrorMessage, GenericErrorMessage, NetworkErrorMessage} from './messages';

const BLOCKCHAIN_OPTIONS = [
    AVAILABLE_BLOCKCHAINS.PUBLIC,
    AVAILABLE_BLOCKCHAINS.SHARED,
    AVAILABLE_BLOCKCHAINS.PRIVATE,
];

const getInitialBlockchainbyName = (name) =>
    BLOCKCHAIN_OPTIONS.find(blockchain => blockchain.label === name) || BLOCKCHAIN_OPTIONS[0];

const getDefaultErrors = () => ({credentials: false, network: false, other: false});

export default class SettingsPopup extends Component {
    static propTypes = {
        apiConfig: PropTypes.shape().isRequired,
        defaultApiConfig: PropTypes.shape().isRequired,
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        const apiConfigProps = this.extractApiConfigProps(props.apiConfig);
        const onPublicNet = isEqual(apiConfigProps.selectedBlockchain, AVAILABLE_BLOCKCHAINS.PUBLIC);
        const enableCredentialsCheckbox = onPublicNet;
        const configuredByDefault = onPublicNet && props.defaultApiConfig.sharesCredentialsWith(props.apiConfig);

        this.state = {
            ...apiConfigProps,
            enableCredentialsCheckbox,
            blockchains: [...BLOCKCHAIN_OPTIONS],
            useCredentials: !configuredByDefault || false,
            errors: getDefaultErrors(),
            verifyingConnection: false,
        };
    }

    @autobind
    extractApiConfigProps(apiConfig) {
        const selectedBlockchain = getInitialBlockchainbyName(apiConfig.blockchain);
        return {
            apiUrl: apiConfig.apiUrl,
            apiToken: apiConfig.apiToken,
            appId: apiConfig.appId,
            appKey: apiConfig.appKey,
            privateUrl: apiConfig.apiUrl,
            selectedBlockchain,
        };
    }

    showCredentialsInputs() {
        return (this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.PUBLIC && this.state.useCredentials)
            || (this.state.selectedBlockchain !== AVAILABLE_BLOCKCHAINS.PUBLIC);
    }

    showConnectUrl() {
        return this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.PRIVATE;
    }

    @autobind
    getApiConfig() {
        const {apiToken, appId, appKey, privateUrl, selectedBlockchain, useCredentials} = this.state;
        if (!useCredentials && apiToken) {
            // Using default credentials (apiToken) for Connect.
            return this.props.defaultApiConfig;
        }
        const apiUrl = selectedBlockchain === AVAILABLE_BLOCKCHAINS.PRIVATE ?
            privateUrl : selectedBlockchain.url;
        const blockchain = selectedBlockchain.label;
        return APIConfig.create({apiUrl, appId, appKey, blockchain});
    }

    @autobind
    hasError() {
        const {credentials, network, other} = this.state.errors;
        return credentials || network || other;
    }

    @autobind
    useCredentialsToggler() {
        const newState = {};
        newState.useCredentials = !this.state.useCredentials;
        newState.error = false;
        if (newState.useCredentials) {
            newState.appKey = '';
            newState.appId = '';
        } else {
            // Do not use credentials. Use the default ones.
            newState.apiToken = this.props.defaultApiConfig.apiToken;
            newState.appId = this.props.defaultApiConfig.appId;
            newState.apiUrl = this.props.defaultApiConfig.apiUrl;
        }
        this.setState(newState);
    }

    @autobind
    handleChange(e) {
        const newState = {};
        newState[e.target.name] = e.target.value;
        newState.error = false;
        this.setState(newState);
    }

    @autobind
    handleDropdownChange(selectedBlockchain) {
        let useCredentials = this.state.useCredentials;
        let enableCredentialsCheckbox = true;
        if (selectedBlockchain !== AVAILABLE_BLOCKCHAINS.PUBLIC) {
            useCredentials = true;
            enableCredentialsCheckbox = false;
        }
        this.setState({
            selectedBlockchain,
            useCredentials,
            enableCredentialsCheckbox,
            appId: '',
            appKey: '',
            privateUrl: '',
            errors: getDefaultErrors(),
        });
    }

    @autobind
    handleClose() {
        this.props.onClose();
    }

    @autobind
    handleSubmit() {
        // Inner function to verify credentials and URL.
        const verifyConnection = async (apiConfig) => {
            try {
                const data = await request('/', apiConfig);
                if (data.version) {
                    if (!isEqual(apiConfig, this.props.defaultApiConfig)) trackSuccessfulConnection();
                    this.props.onSubmit(apiConfig);
                }
            } catch (e) {
                const errorUpdate = {
                    errors: getDefaultErrors(),
                    verifyingConnection: false,
                };
                if (e.statusCode === 404 || e instanceof TypeError) {
                    errorUpdate.errors.network = true;
                } else if (e.statusCode === 403) {
                    errorUpdate.errors.credentials = true;
                } else {
                    errorUpdate.errors.other = true;
                }
                return this.setState(errorUpdate);
            }
        };
        const apiConfig = this.getApiConfig();
        this.setState({verifyingConnection: true, errors: getDefaultErrors()},
            () => verifyConnection(apiConfig));
    }

    @autobind
    renderErrorMessage() {
        const {credentials, network, other} = this.state.errors;
        if (credentials) {
            return <CredentialsErrorMessage />;
        }
        if (network) {
            return <NetworkErrorMessage />;
        }
        if (other) {
            return <GenericErrorMessage />;
        }
        return null;
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                className={styles.modalRoot}>
                <ModalHeader className={styles.modalHeader}>
                    BLOCKCHAIN SETTINGS
                </ModalHeader>
                <ModalBody className={styles.modalBody}>
                    <MessageBar
                        className={styles.messageBar}
                        message={this.renderErrorMessage()}
                        type='error'
                        show={this.hasError()}
                    />
                    <Form className={styles.form}>
                        <FormGroup
                            id='target-blockchain-select'
                            className={styles.formGroup}>
                            <Label className={styles.label}>
                                Target blockchain
                            </Label>
                            <Dropdown
                                options={this.state.blockchains}
                                onOptionClick={this.handleDropdownChange}
                                selected={this.state.selectedBlockchain}
                                className={styles.dropdown}
                                headerClassName={classNames(styles.dropdownHeader, styles.formInput)}
                                optionsClassName={styles.dropdownOptions}
                                selectedClassName={styles.selectedOption}
                                arrowColor='blue'
                            />
                            <div className={styles.information}>
                                <div className={styles.checkboxContainer}>
                                    <Checkbox
                                        readOnly={!this.state.enableCredentialsCheckbox}
                                        value={this.state.useCredentials}
                                        onChange={this.useCredentialsToggler}
                                    />
                                    Use my CONNECT credentials
                                </div>
                                <div className={styles.link}>
                                    <div className={styles.questionMark}>?</div>
                                    <A
                                        to='https://www.factom.com/products/harmony-connect'
                                        onClick={trackAccessConnectLandingPage}
                                        text=' What is CONNECT?'
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <div
                            className={
                                classNames(
                                    {[styles.noTransition]: !this.showCredentialsInputs()},
                                    {[styles.transition]: this.showCredentialsInputs()})}>
                            {
                                this.showConnectUrl() &&
                                <FormGroup className={styles.formGroup}>
                                    <Label className={styles.label}>
                                        Connect API URL
                                    </Label>
                                    <Input
                                        type='url'
                                        name='privateUrl'
                                        error={this.state.errors.network || this.state.errors.other}
                                        value={this.state.privateUrl}
                                        placeholder='Enter the Connect API URL'
                                        handleChange={this.handleChange}
                                        className={classNames(styles.input, styles.formInput)}
                                    />
                                </FormGroup>
                            }
                            {
                                this.showCredentialsInputs() &&
                                    [
                                        <FormGroup key='app-id' className={styles.formGroup}>
                                            <Label className={styles.label}>
                                            Connect Application ID
                                        </Label>
                                            <Input
                                                error={this.state.errors.credentials || this.state.errors.other}
                                                type='text'
                                                name='appId'
                                                value={this.state.appId}
                                                placeholder='Enter your App ID'
                                                handleChange={this.handleChange}
                                                className={classNames(styles.input, styles.formInput)}
                                            />
                                        </FormGroup>,
                                        <FormGroup key='app-key' className={styles.formGroup}>
                                            <Label className={styles.label}>
                                            Connect Application Key
                                        </Label>
                                            <Input
                                                error={this.state.errors.credentials || this.state.errors.other}
                                                type='password'
                                                name='appKey'
                                                value={this.state.appKey}
                                                placeholder='Enter your App Key'
                                                handleChange={this.handleChange}
                                                className={classNames(styles.input, styles.formInput)}
                                            />
                                        </FormGroup>,
                                    ]
                            }
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter className={styles.modalFooter}>
                    <Button
                        disabled={this.state.verifyingConnection}
                        title='CANCEL'
                        className={classNames(styles.button, styles.cancel)}
                        onClick={this.handleClose}
                    />
                    <Button
                        disabled={this.state.verifyingConnection}
                        title='SUBMIT'
                        className={styles.button}
                        onClick={this.handleSubmit}
                    />
                </ModalFooter>
            </Modal>
        );
    }
}
