import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {

    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const {
            className,
            onClick,
            title,
        } = this.props;
        return (
            <button
                className={className}
                onClick={onClick}>
                {title}
            </button>
        );
    }
}
