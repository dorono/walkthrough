import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

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
        setModalSize: PropTypes.bool,
    };

    static defaultProps = {
        setModalSize: false,
    }

    constructor(props) {
        super(props);

        this.modalContainerElement = React.createRef();
    }

    @autobind
    renderModalHeight() {
        let modalHeight = 'auto';
        if (
            this.props.setModalSize
            && this.modalContainerElement.current !== null
        ) {
            modalHeight = this.modalContainerElement.current.getBoundingClientRect().height;
        }

        return {height: modalHeight};
    }

    render() {
        if (!this.props.show) return null;
        const {
            className,
            children,
        } = this.props;
        return (
            <div
                className={classNames(styles.root)}>
                <div
                    className={classNames(styles.popup, className)}
                    style={this.renderModalHeight()}
                    ref={this.modalContainerElement}>
                    {children}
                </div>
            </div>
        );
    }
}
