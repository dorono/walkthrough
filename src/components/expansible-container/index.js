import PropTypes from 'prop-types';
import React, {Component} from 'react';
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
        // A flag to show gradient
        withGradient: PropTypes.bool,
    };

    render() {
        const containerClassName = classNames(
            this.props.className,
            {[styles.collapsed]: !this.props.expand},
            {[styles.gradient]: this.props.withGradient},
        );

        return (
            <div className={containerClassName} style={this.props.expand ? {} : {maxHeight: this.props.collapsedSize}}>
                {this.props.children}
            </div>
        );
    }
}

export default ExpansibleContainer;

