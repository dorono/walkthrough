import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import {autobind} from 'core-decorators';

import styles from './styles.css';

class OptionsMenu extends React.Component {
    static propTypes = {
        // A flag to show/hide options
        isOpen: PropTypes.bool.isRequired,
        // A style object containing the position to display the menu
        position: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
        }),
        // Callback to execute when option is clicked
        onOptionClick: PropTypes.func.isRequired,
        // The options to display
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            disabled: PropTypes.bool,
        })).isRequired,
        // A DOM element to create a portal to it
        portalNode: PropTypes.instanceOf(Element).isRequired,
        // The current selected option
        selected: PropTypes.shape({
            label: PropTypes.string,
        }).isRequired,
        // Class to be applied to the selected option
        selectedClassName: PropTypes.string,
    };

    isSelected(option) {
        return isEqual(option, this.props.selected);
    }

    renderList() {
        const {className, options, position, isOpen} = this.props;

        if (options.length === 0) return null;

        return (
            <div
                className={classNames(styles.options, className, {[styles.open]: isOpen})}
                style={position}>
                {options.map(this.renderItem)}
            </div>
        );
    }

    @autobind
    renderItem(option) {
        return (
            <div
                key={option.label}
                onClick={() => this.props.onOptionClick(option)}
                className={classNames({
                    [styles.selected]: this.isSelected(option),
                    [this.props.selectedClassName]: this.isSelected(option),
                    [styles.disabled]: !!option.disabled,
                })}>
                {option.label}
            </div>
        );
    }

    render() {
        return ReactDOM.createPortal(this.renderList(), this.props.portalNode);
    }
}

export default OptionsMenu;
