import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import styles from './styles.css';

class Checkbox extends Component {
    static propTypes = {
        value: PropTypes.bool,
        onChange: PropTypes.func,
    };

    @autobind
    handleChange(event) {
        if (this.props.readOnly) return false;
        if (this.props.onChange) this.props.onChange(event.target.checked);
    }

    render() {
        return (
            <div className={
                classNames(
                    styles.container,
                    {[styles.disabled]: this.props.readOnly},
                    {[styles.checked]: this.props.value},
                    {[styles.noChecked]: !this.props.value})}>
                <input
                    type='checkbox'
                    checked={this.props.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Checkbox;
