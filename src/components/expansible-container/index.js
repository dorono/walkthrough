import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Collapse} from 'react-collapse';
import {presets} from 'react-motion';
import sizeMe from 'react-sizeme';
import classNames from 'classnames';
import styles from './styles.css';

@sizeMe({monitorHeight: true})
class ExpansibleContainer extends Component {
    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        // A flag to expand container
        expand: PropTypes.bool,
        // Height when collapsed (in px)
        collapsedSize: PropTypes.number,
    };

    render() {
        const containerClassName = classNames(
            this.props.className,
            {[styles.collapsed]: !this.props.expand},
            {[styles.gradient]: !this.props.expand},
        );

        return (
            <Collapse
                isOpened
                springConfig={presets.noWobble}>
                <div
                    className={containerClassName}
                    style={this.props.expand ? {} : {maxHeight: this.props.collapsedSize}}>
                    {this.props.children}
                </div>
            </Collapse>
        );
    }
}

export default ExpansibleContainer;

