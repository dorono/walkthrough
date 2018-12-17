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
import {notUndefined} from 'utils/validate';
import {isIE} from 'utils/user-agent';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';
import {ERRORS} from 'errors';
import {trackNotSuccessfulConnection, trackSuccessfulConnection} from 'analytics';
import globalStyles from 'styles/index.css';
import styles from './styles.css';
import {
    CredentialsErrorMessage,
    CustomCredentialsNotAllowedErrorMessage,
    GenericErrorMessage,
    NetworkErrorMessage,
} from './messages';

const BLOCKCHAIN_OPTIONS = [
    AVAILABLE_BLOCKCHAINS.PUBLIC,
    AVAILABLE_BLOCKCHAINS.SHARED,
    AVAILABLE_BLOCKCHAINS.PRIVATE,
];

const getInitialBlockchainbyName = (name) =>
    BLOCKCHAIN_OPTIONS.find(blockchain => blockchain.label === name) || BLOCKCHAIN_OPTIONS[0];

export const getDefaultErrors = (allowCustomCredentials = true) => {
    const defaultErrors = {};
    Object.values(ERRORS).forEach(value => defaultErrors[value] = false);
    defaultErrors[ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED] = !allowCustomCredentials;
    return defaultErrors;
};

export default class SettingsPopup extends Component {
    static propTypes = {
        apiConfig: PropTypes.shape().isRequired,
        allowCustomCredentials: PropTypes.bool.isRequired,
        isConfiguredByDefault: PropTypes.func.isRequired,
        defaultApiConfig: PropTypes.shape().isRequired,
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        const apiConfigProps = this.extractApiConfigProps(props.apiConfig);
        const {allowCustomCredentials, isConfiguredByDefault} = props;
        const onPublicNet = isEqual(apiConfigProps.selectedBlockchain, AVAILABLE_BLOCKCHAINS.PUBLIC);
        const enableCredentialsCheckbox = onPublicNet;
        const configuredByDefault = isConfiguredByDefault();

        this.state = {
            ...apiConfigProps,
            enableCredentialsCheckbox,
            blockchains: [...BLOCKCHAIN_OPTIONS],
            useCredentials: !configuredByDefault || false,
            errors: getDefaultErrors(allowCustomCredentials),
            verifyingConnection: false,
            setModalSize: false,
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
    disableSubmit() {
        if (
            this.state.verifyingConnection
            || this.state.errors[ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED]
        ) {
            return true;
        }

        // for private, we need appId, appKey, and apiUrl
        if (
            this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.PRIVATE
            && (
                !this.state.appId
                || !this.state.appKey
                || !this.state.apiUrl
            )
        ) {
            return true;
        // for public, we need appId and appKey
        } else if (
            this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.PUBLIC
            && (
                !this.state.appId
                || !this.state.appKey
            )
        ) {
            return true;
        }

        return false;
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
        return Object.values(this.state.errors)
            .filter(error => error === true).length > 0;
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
            newState.setModalSize = true;
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
            setModalSize: false,
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
                const {version} = await request('', apiConfig);
                if (version) {
                    apiConfig.apiVersion = version;
                    trackSuccessfulConnection(apiConfig);
                    this.props.onSubmit(apiConfig);
                }
            } catch (e) {
                const errorUpdate = {
                    errors: getDefaultErrors(),
                    verifyingConnection: false,
                };

                let errorType = ERRORS.OTHER;
                if (e.statusCode === 404 || e instanceof TypeError) {
                    errorType = ERRORS.NETWORK;
                } else if (e.statusCode === 429) {
                    this.handleClose();
                } else if (e.statusCode === 403) {
                    errorType = ERRORS.CREDENTIALS;
                }

                errorUpdate.errors[errorType] = true;
                trackNotSuccessfulConnection(errorType);
                return this.setState(errorUpdate);
            }
        };
        const apiConfig = this.getApiConfig();
        this.setState({verifyingConnection: true, errors: getDefaultErrors()},
            () => verifyConnection(apiConfig));
    }

    @autobind
    renderErrorMessage() {
        const error = Object.keys(this.state.errors)
            .filter(key => this.state.errors[key] === true)
            .shift();
        let message = null;
        if (notUndefined(error)) {
            switch (error) {
                case ERRORS.CREDENTIALS:
                    message = <CredentialsErrorMessage />;
                    break;
                case ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED:
                    message = <CustomCredentialsNotAllowedErrorMessage />;
                    break;
                case ERRORS.NETWORK:
                    message = <NetworkErrorMessage />;
                    break;
                case ERRORS.OTHER:
                    message = <GenericErrorMessage />;
                    break;
                default:
                    break;
            }
        }
        return message;
    }

    render() {
        const {errors} = this.state;
        return (
            <Modal
                show={this.props.show}
                className={classNames(
                    styles.modalRoot,
                    {
                        [styles.defaultPosition]: !isIE(),
                        [styles.iePosition]: isIE(),
                    },
                )}>
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
                            className={
                                classNames(styles.formGroup,
                                    errors[ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED]
                                    && styles.disabled)
                            }>
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
                                selectedClassName={globalStyles.selectedOption}
                                arrowColor='blue'
                                disabled={errors[ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED]}
                            />
                            <div className={styles.information}>
                                <div className={styles.checkboxContainer}>
                                    <Checkbox
                                        readOnly={
                                            !this.state.enableCredentialsCheckbox
                                            || errors[ERRORS.CUSTOM_CREDENTIALS_NOT_ALLOWED]}
                                        value={this.state.useCredentials}
                                        onChange={this.useCredentialsToggler}
                                    />
                                    Use my CONNECT credentials
                                </div>
                            </div>
                        </FormGroup>
                        <div className={styles.link}>
                            <div className={styles.questionMark}>?</div>
                            <A
                                to='https://www.factom.com/products/harmony-connect'
                                text=' What is CONNECT?'
                            />
                        </div>
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
                                        error={errors[ERRORS.NETWORK] || errors[ERRORS.OTHER]}
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
                                                error={errors[ERRORS.CREDENTIALS] || errors[ERRORS.OTHER]}
                                                type='text'
                                                name='appId'
                                                value={this.state.appId}
                                                placeholder='Enter your App ID'
                                                handleChange={this.handleChange}
                                                className={classNames(styles.input, styles.formInput)}
                                                key='appId'
                                            />
                                        </FormGroup>,
                                        <FormGroup key='app-key' className={styles.formGroup}>
                                            <Label className={styles.label}>
                                            Connect Application Key
                                        </Label>
                                            <Input
                                                error={errors[ERRORS.CREDENTIALS] || errors[ERRORS.OTHER]}
                                                type='password'
                                                name='appKey'
                                                key='appKey'
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
                        id='cancel-settings-popup'
                        disabled={this.state.verifyingConnection}
                        title='CANCEL'
                        className={classNames(styles.button, styles.cancel)}
                        onClick={this.handleClose}
                        key='cancel'
                    />
                    <Button
                        disabled={this.disableSubmit()}
                        title='SUBMIT'
                        className={styles.button}
                        onClick={this.handleSubmit}
                        key='submit'
                    />
                </ModalFooter>
            </Modal>
        );
    }
}
