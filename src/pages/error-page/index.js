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

    handleClick() {
        if (this.props.status === 404) {
            this.props.history.push('/');
        } else {
            window.location.reload();
        }
    }

    render() {
        return (
            <Container primary>
                <div
                    onClick={this.handleClick}
                    className={styles[`error-${this.props.status}`]}
                />
            </Container>
        );
    }
}
