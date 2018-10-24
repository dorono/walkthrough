import React, {Component} from 'react';
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

    errorStatusPage429Message() {
        return (
            <div
                className={styles.message}>
                <p>
                    Your Connect application <br />
                    <strong>Factom API APP</strong> has run out of request. <br /><br />
                    <a href='/'>Upgrade your plan</a>  or come back tomorrow.
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
