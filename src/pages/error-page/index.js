import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {withRouter} from 'react-router-dom';
import Container from 'components/container';
import styles from './styles.css';

@withRouter
@autobind
export default class ErrorPage extends Component {
    static defaultProps = {
        status: 404,
    };

    static propTypes = {
        status: PropTypes.number.isRequired,
        appName: PropTypes.string,
        appId: PropTypes.string,
    };

    errorStatusPage429Message() {
        const linkRequestPlanChange =
            'https://account.factom.com/plans?' +
            `message_reason=Request_Plan_Change&regarding_app_id=${this.props.appId}`;
        return (
            <div
                className={styles.message}>
                <p>
                    Your Connect application <br />
                    <strong>{this.props.appName}</strong> has run out of request. <br /><br />
                    <a href={linkRequestPlanChange}> Upgrade your plan</a> or come back tomorrow.
                </p>
            </div>
        );
    }

    handleClick() {
        if (this.props.status === (404 || 429)) {
            this.props.history.push('/');
        } else {
            window.location.reload();
        }
    }

    render() {
        return (
            <Container primary>
                <div className={this.props.status === 429 ? styles.containerMessage : null}>
                    <div
                        onClick={this.handleClick}
                        className={styles[`error-${this.props.status}`]}
                    />
                    {this.props.status === 429 ? this.errorStatusPage429Message() : null}
                </div>
            </Container>
        );
    }
}
