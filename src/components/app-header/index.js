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
import styles from './styles.css';

export default class AppHeader extends Component {
    static propTypes = {
        apiConfig: PropTypes.shape().isRequired,
        defaultApiConfig: PropTypes.shape().isRequired,
        remoteConfig: PropTypes.bool.isRequired,
        onSettingsSubmit: PropTypes.func.isRequired,
    };
    state = {
        showSettingsPopup: false,
    };

    @autobind
    onSettingsSubmit(settings) {
        this.props.onSettingsSubmit(settings);
        this.setState({showSettingsPopup: false});
    }

    render() {
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
                            onClick={() => this.setState({showSettingsPopup: true})}
                            title={this.props.apiConfig.blockchain}
                            className={styles.blockchainButton}
                        />
                        {this.props.remoteConfig &&
                            <Tooltip
                                show>
                                <span className={styles.spanTooltip}>You are authenticated with</span> <br />
                                Application ID: {this.props.apiConfig.appId}
                            </Tooltip>
                        }
                    </div>
                </div>
                {
                    this.state.showSettingsPopup &&
                        <SettingsPopup
                            show
                            defaultApiConfig={this.props.defaultApiConfig}
                            apiConfig={this.props.apiConfig}
                            onSubmit={this.onSettingsSubmit}
                            onClose={() => this.setState({showSettingsPopup: false})}
                        />
                }
            </header>
        );
    }
}
