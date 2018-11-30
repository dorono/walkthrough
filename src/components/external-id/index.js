import {autobind} from 'core-decorators';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from 'react-collapse';
import {presets} from 'react-motion';
import withDataEncodings from 'hocs/with-data-encoding';

import Dropdown from 'components/dropdown/index';

import globalStyles from 'styles/index.css';
import styles from './styles.css';

@withDataEncodings({formats: ['raw', 'hex', 'base64']})
class ExternalId extends Component {
    static propTypes = {
        // An object with the different encodings for an external Id
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
        })).isRequired,
        // A flag to disable dropdown and display only defaylt encoding
        showDefaultEncoding: PropTypes.bool,
    };

    static defaultProps = {
        showDefaultEncoding: false,
    };

    state = {
        selected: this.getDefaultEncoding(),
    };

    getDefaultEncoding() {
        const {data} = this.props;
        const withLabel = label => encoding => encoding.label === label;
        return data.find(withLabel('hex')) || data.find(withLabel('raw'));
    }

    @autobind
    handleChangeSelection(option) {
        this.setState({selected: option});
    }

    renderEncodingSelectorDropdown() {
        const {data} = this.props;
        return (
            <Dropdown
                options={data}
                optionsClassName={styles.dropdownOptions}
                onOptionClick={this.handleChangeSelection}
                selected={this.state.selected}
                className={styles.dropdown}
                headerClassName={styles.dropdownHeader}
                selectedClassName={globalStyles.selectedOption}
                arrowColor='white'
            />
        );
    }

    renderEncodingBadge() {
        return (
            <div className={styles.badge}>
                {this.state.selected.label}
            </div>
        );
    }

    render() {
        const {data, showDefaultEncoding} = this.props;
        const showMoreThanOneEncoding = !showDefaultEncoding && data.length > 1;
        return (
            <div className={styles.root}>
                {showMoreThanOneEncoding
                    ? this.renderEncodingSelectorDropdown()
                    : this.renderEncodingBadge()}
                <Collapse
                    isOpened
                    springConfig={presets.stiff}>
                    <div className={styles.value}>{this.state.selected.value}</div>
                </Collapse>

            </div>
        );
    }
}

export default ExternalId;
