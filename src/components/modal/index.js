import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

export const ModalHeader = props => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
};

export const ModalBody = props => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
};

export const ModalFooter = props => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
};

export class Modal extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any.isRequired,
        show: PropTypes.bool,
    };
    render() {
        if (!this.props.show) return null;
        const {
            className,
            children,
        } = this.props;
        return (
            <div className={classNames(styles.root)}>
                <div className={classNames(styles.popup, className)}>
                    {children}
                </div>
            </div>
        );
    }
}
