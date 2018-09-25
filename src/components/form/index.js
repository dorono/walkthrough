import React, {Component} from 'react';
import classNames from 'classnames';
import styles from './styles.css';

export class FormGroup extends Component {

    render() {
        const {
            children,
            className,
        } = this.props;
        return (
            <div className={classNames(styles.formGroup, className)}>
                {children}
            </div>
        );
    }
}

export class Form extends Component {
    state = {};

    render() {
        return (
            <form className={this.props.className}>
                {this.props.children}
            </form>
        );
    }
}
