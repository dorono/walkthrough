import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {redirectWrapper} from 'hocs/redirect-wrapper';

import {trackPageView} from 'utils/analytics';
import Container from 'components/container';
import {
    Error429,
    Error500,
} from './error-messages';

import styles from './styles.css';

@autobind
class ErrorPage extends Component {
    static propTypes = {
        location: PropTypes.shape({
            state: PropTypes.shape({
                status: PropTypes.number.isRequired,
                appName: PropTypes.string,
                message: PropTypes.string,
            }).isRequired,
        }).isRequired,
    };

    componentDidMount() {
        trackPageView(this.props.location.state.status);
    }

    displayErrorMessage() {
        switch (this.props.location.state.status) {
            case 429:
                return <Error429 appName={this.props.location.state.appName} />;
            case 500:
                return <Error500 message={this.props.location.state.message} />;
            default:
                return null;
        }
    }

    handleClick() {
        // Do nothing on "out of requests" error.
        if (this.props.location.state.status === 429) {
            return;
        }
        if (this.props.location.state.status === 404) {
            this.props.history.push('/');
        } else {
            window.location.reload();
        }
    }

    render() {
        return (
            <Container primary>
                <div className={styles[`container-error-${this.props.location.state.status}`]}>
                    <div
                        onClick={this.handleClick}
                        className={styles[`error-${this.props.location.state.status}`]}
                    />
                    {this.displayErrorMessage()}
                </div>
            </Container>
        );
    }
}

export default redirectWrapper('/error')(ErrorPage);
