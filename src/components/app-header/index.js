import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import AppMenu from 'components/app-menu';
import Button from 'components/button';
import SettingsPopup from 'components/settings-popup';
import Search from 'components/search';
import Tooltip from 'components/tooltip';
import VerticalDivider from 'components/vertical-divider';
import {decodeHtml} from 'utils/encoding';
import {setModalTrigger} from 'utils/execute-options-modal';
import styles from './styles.css';

export default class AppHeader extends Component {
    static propTypes = {
        apiConfig: PropTypes.shape().isRequired,
        allowCustomCredentials: PropTypes.bool.isRequired,
        defaultApiConfig: PropTypes.shape().isRequired,
        notifyRemoteConfigWasBlocked: PropTypes.bool.isRequired,
        remoteConfig: PropTypes.bool.isRequired,
        onSettingsSubmit: PropTypes.func.isRequired,
    };
    state = {
        showSettingsPopup: false,
        // If we should notify the user, set it in false at first.
        notifiedRemoteConfigIsNotAllowed: !this.props.notifyRemoteConfigWasBlocked,
        // If an error in the users credentials is detected
        credentialsError: false,
    };

    componentDidMount() {
        setModalTrigger(this.showSettingsPopup);
    }

    @autobind
    onSettingsClosed() {
        const newState = {
            showSettingsPopup: false,
            credentialsError: false,
        };
        if (!this.state.notifiedRemoteConfigIsNotAllowed) {
            newState.notifiedRemoteConfigIsNotAllowed = true;
        }

        this.setState(newState);
    }

    @autobind
    onSettingsSubmit(settings) {
        this.props.onSettingsSubmit(settings);
        this.setState({
            showSettingsPopup: false,
            credentialsError: false,
        });
    }

    @autobind
    showSettingsPopup(err) {
        if (err === 403) {
            this.setState({credentialsError: true}, () => {
                this.setState({showSettingsPopup: true});
            });
        }
    }

    @autobind
    showSettingsPopup(err) {
        if (err === 403) {
            this.setState({credentialsError: true}, () => {
                this.setState({showSettingsPopup: true});
            });
        }
    }

    render() {
        const {showSettingsPopup, notifiedRemoteConfigIsNotAllowed} = this.state;
        const {notifyRemoteConfigWasBlocked} = this.props;
        return (
            <header className={styles.root}>
                <div className={styles.content}>
                    <Link className={styles.logo} to='/'>
                        <h1>
                            <span>Factom Explorer</span>
                        </h1>
                    </Link>
                    <Search apiConfig={this.props.apiConfig} />
                    <AppMenu />
                    <VerticalDivider className={styles.divider} />
                    <div className={styles.blockchainButtonContainer}>
                        <Button
                            id='open-settings-popup'
                            onClick={() => this.setState({showSettingsPopup: true})}
                            title={this.props.apiConfig.blockchain}
                            className={styles.blockchainButton}
                        />
                        {this.props.remoteConfig &&
                        <Tooltip show autoHide>
                            <span className={styles.spanTooltip}>
                                Authenticated with your application:
                            </span>
                            <br />
                            {decodeHtml(this.props.apiConfig.appName)}
                        </Tooltip>
                        }
                    </div>
                </div>
                {
                    (
                        showSettingsPopup
                        || (!notifiedRemoteConfigIsNotAllowed && notifyRemoteConfigWasBlocked)
                    ) &&
                    <SettingsPopup
                        credentialsError={this.state.credentialsError}
                        allowCustomCredentials={this.props.allowCustomCredentials}
                        apiConfig={this.props.apiConfig}
                        defaultApiConfig={this.props.defaultApiConfig}
                        isConfiguredByDefault={this.props.isConfiguredByDefault}
                        onClose={this.onSettingsClosed}
                        onSubmit={this.onSettingsSubmit}
                        show
                    />
                }
            </header>
        );
    }
}
