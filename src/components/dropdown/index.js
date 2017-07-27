import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import styles from './styles.css';

@autobind
export default class Dropdown extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })).isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const selectedOption = this.props.options.find(option => option.value === this.props.value);
        const selectedLabel = selectedOption ? selectedOption.label : '';
        return (
            <div className={styles.root}>
                {this.props.placeholder && (
                    <div className={styles.placeholder}>
                        {this.props.placeholder}
                    </div>
                )}
                <div className={styles.value}>
                    {selectedLabel}
                </div>
                <select className={styles.select} value={this.props.value} onChange={this.handleChange}>
                    {this.props.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        );
    }
}
