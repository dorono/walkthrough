import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import OptionsMenu from './options-menu';

import arrowIconWhite from './assets/id-down-arrow-white.svg';
import arrowIconBlue from './assets/id-down-arrow-blue.svg';

import styles from './styles.css';

const MENU_PORTAL_NODE_ID = 'dropdown-portal-container';

const ARROWS = {
    white: arrowIconWhite,
    blue: arrowIconBlue,
};

const DEFAULT_ARROW_COLOR = 'blue';

/**
 * Crafty implementation of a dropdown, more flexible than Select component
 * If you need a <select> like HTML's native use Select component
 */

@onClickOutside
class Dropdown extends Component {
    static propTypes = {
        // The color of the arrow.
        arrowColor: PropTypes.oneOf(Object.keys(ARROWS)),
        // Class name for the root element.
        className: PropTypes.string,
        // Disable the dropdown
        disabled: PropTypes.bool,
        // Class name for the dropdown header.
        headerClassName: PropTypes.string,
        // Callback for a clicked option.
        onOptionClick: PropTypes.func.isRequired,
        // The options to display.
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            alias: PropTypes.string,
        })).isRequired,
        // TODO: explain
        optionsAlias: PropTypes.bool,
        // Class name for the options menu.
        optionsClassName: PropTypes.string,
        // The current selected option.
        selected: PropTypes.PropTypes.shape({
            label: PropTypes.string,
            alias: PropTypes.string,
        }).isRequired,
        // Class name to be applied to the selected option (for OptionsMenu component).
        selectedClassName: PropTypes.string,
    };

    static defaultProps = {
        arrowColor: DEFAULT_ARROW_COLOR,
        disabled: false,
        optionsAlias: false,
        selectedClassName: styles.selected,
    };

    state = {
        showOptions: false,
    };

    componentWillMount() {
        this.setMenuPortalNode();
    }

    @autobind
    setDropdownRef(element) {
        this.dropdown = element;
    }

    @autobind
    updateOptionsMenuPosition() {
        const offset = this.dropdown.getBoundingClientRect();
        this.optionsMenuPosition = offset ? {
            top: offset.top + offset.height,
            left: offset.left,
        } : {};
    }

    @autobind
    toggleShowOptions() {
        this.setState(({showOptions}) => ({showOptions: !showOptions}));
    }

    @autobind
    createOptionClickHandler() {
        return option => {
            this.props.onOptionClick(option);
            this.hideOptions();
        };
    }

    @autobind
    hideOptions() {
        this.setState({showOptions: false});
    }

    @autobind
    setMenuPortalNode() {
        this.menuPortalNode = document.getElementById(MENU_PORTAL_NODE_ID);
        if (!this.menuPortalNode) {
            this.menuPortalNode = document.createElement('div');
            this.menuPortalNode.id = MENU_PORTAL_NODE_ID;
            document.body.appendChild(this.menuPortalNode);
        }
    }

    @autobind
    handleHeaderClick() {
        if (!this.state.showOptions) {
            this.updateOptionsMenuPosition();
        }
        this.toggleShowOptions();
    }

    /**
     * This function is implemented in order to make 'react-onclickoutside' library to work
     * Closes the opened menu whenever user clicks outside the dropdown
     * DON'T DELETE THIS METHOD EVEN IF YOUR IDE SAYS IT'S UNUSED
     * @see https://github.com/Pomax/react-onclickoutside
     */
    handleClickOutside(e) {
        const hasClickedOutside = !e.target.closest(`#${MENU_PORTAL_NODE_ID}`);
        if (hasClickedOutside) {
            this.hideOptions();
        }
    }

    renderHeader() {
        const {selected, headerClassName, disabled, arrowColor = DEFAULT_ARROW_COLOR, optionsAlias} = this.props;
        const {showOptions} = this.state;
        return (
            <div
                onClick={this.handleHeaderClick}
                className={classNames(styles.header, headerClassName, disabled && styles.disabled)}>
                <span ref={this.setDropdownRef}>
                    {optionsAlias ? selected.alias : selected.label}
                </span>
                <img
                    src={ARROWS[arrowColor]}
                    className={classNames(styles.arrow, {[styles.flipped]: showOptions})}
                    alt='Open'
                />
            </div>
        );
    }

    renderOptionsMenu() {
        const {options, optionsClassName, selected, selectedClassName} = this.props;

        return (
            <OptionsMenu
                className={optionsClassName}
                options={options}
                isOpen={this.state.showOptions}
                onOptionClick={this.createOptionClickHandler()}
                position={this.optionsMenuPosition}
                selected={selected}
                selectedClassName={selectedClassName}
                portalNode={this.menuPortalNode}
            />
        );
    }

    render() {
        const {className} = this.props;
        return (
            <div className={classNames(styles.root, className)}>
                {this.renderHeader()}
                {this.renderOptionsMenu()}
            </div>
        );
    }

}

export default Dropdown;
