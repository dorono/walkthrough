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
        message: null,
    };

    static propTypes = {
        status: PropTypes.number.isRequired,
        message: PropTypes.node,
    };

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
                <div className={styles[`container-error-${this.props.status}`]}>
                    <div
                        onClick={this.handleClick}
                        className={styles[`error-${this.props.status}`]}
                    />
                    {this.props.message}
                </div>
            </Container>
        );
    }
}
