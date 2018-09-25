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

const BLOCKCHAIN_OPTIONS = [
    AVAILABLE_BLOCKCHAINS.MAINNET,
    AVAILABLE_BLOCKCHAINS.SHARED,
    AVAILABLE_BLOCKCHAINS.PRIVATE,
];

const {applicationsListLink} = CONFIG;

const getInitialBlockchainbyName = (name) =>
    BLOCKCHAIN_OPTIONS.find(blockchain => blockchain.label === name) || BLOCKCHAIN_OPTIONS[0];

export default class SettingsPopup extends Component {
    static propTypes = {
        apiConfig: PropTypes.shape(),
        defaultApiConfig: PropTypes.shape(),
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        const configuredByDefault = isEqual(props.apiConfig, props.defaultApiConfig);
        this.state = {
            ...this.extractApiConfigProps(props.apiConfig),
            blockchains: [...BLOCKCHAIN_OPTIONS],
            useCredentials: !configuredByDefault || false,
            enableCredentialsCheckbox: configuredByDefault || false,
            error: false,
        };
    }

    @autobind
    extractApiConfigProps(apiConfig) {
        const selectedBlockchain = getInitialBlockchainbyName(apiConfig.blockchain);
        return {
            appId: apiConfig.appId,
            apiKey: apiConfig.apiKey,
            privateUrl: apiConfig.apiUrl,
            selectedBlockchain,
        };
    }

    showCredentialsInputs() {
        return (this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.MAINNET && this.state.useCredentials)
            || (this.state.selectedBlockchain !== AVAILABLE_BLOCKCHAINS.MAINNET);
    }

    showConnectUrl() {
        return this.state.selectedBlockchain === AVAILABLE_BLOCKCHAINS.PRIVATE;
    }

    @autobind
    getApiConfig() {
        const {appId, apiKey, privateUrl, selectedBlockchain} = this.state;
        const apiUrl = selectedBlockchain === AVAILABLE_BLOCKCHAINS.PRIVATE ?
            privateUrl : selectedBlockchain.url;
        const blockchain = selectedBlockchain.label;
        return APIConfig.create({apiUrl, appId, apiKey, blockchain});
    }

    @autobind
    useCredentialsToggler() {
        const newState = {};
        newState.useCredentials = !this.state.useCredentials;
        newState.error = false;
        if (newState.useCredentials) {
            newState.apiKey = '';
            newState.appId = '';
        } else {
            // Do not use credentials. Use the default ones.
            newState.apiKey = this.props.defaultApiConfig.apiKey;
            newState.appId = this.props.defaultApiConfig.appId;
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
        if (selectedBlockchain !== AVAILABLE_BLOCKCHAINS.MAINNET) {
            useCredentials = true;
            enableCredentialsCheckbox = false;
        }
        this.setState({
            selectedBlockchain,
            useCredentials,
            enableCredentialsCheckbox,
            appId: '',
            apiKey: '',
            privateUrl: '',
            error: false,
        });
    }

    @autobind
    handleClose() {
        this.props.onClose();
    }

    @autobind
    async handleSubmit() {
        const apiConfig = this.getApiConfig();
        try {
            const data = await request('/', apiConfig);
            if (data.version) {
                if (!isEqual(apiConfig, this.props.defaultApiConfig)) trackSuccessfulConnection();
                this.props.onSubmit(apiConfig);
            }
        } catch (e) {
            this.setState({error: true});
        }
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
                        message={
                            <span>
                                <span className={styles.errorTitle}>Error:</span>
                                Please double check the values below against your
                                <A
                                    className={styles.errorLink}
                                    to={applicationsListLink}
                                    text={'application\'s details'} />.
                            </span>
                        }
                        type='error'
                        show={this.state.error}
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
                                    Use my Connect credentials
                                </div>
                                <div className={styles.link}>
                                    <div className={styles.questionMark}>?</div>
                                    <A
                                        to='https://factom.com?seeking=connect'
                                        onClick={trackAccessConnectLandingPage}
                                        text='Learn more about connect'
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
                                                error={this.state.error}
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
                                                error={this.state.error}
                                                type='password'
                                                name='apiKey'
                                                value={this.state.apiKey}
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
                        title='CANCEL'
                        className={classNames(styles.button, styles.cancel)}
                        onClick={this.handleClose}
                    />
                    <Button
                        title='SUBMIT'
                        className={styles.button}
                        onClick={this.handleSubmit}
                    />
                </ModalFooter>
            </Modal>
        );
    }
}
