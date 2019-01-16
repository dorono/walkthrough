import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {autobind} from 'core-decorators';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import {isIE} from 'utils/user-agent';

import {STAGE_PENDING} from 'constants/stages';
import styles from './styles.css';

export default class PendingItem extends Component {
    static propTypes = {
        stage: PropTypes.string,
        enableTooltip: PropTypes.bool,
    };

    static defaultProps = {
        enableTooltip: true,
    };

    state = {
        displayTooltip: false,
    };

    @autobind
    handleMouseEnter() {
        this.setState({
            displayTooltip: !this.state.displayTooltip,
        });
    }

    render() {
        return (
            <div
                className={styles.pendingContainer}
                onMouseLeave={this.handleMouseEnter}
                onMouseEnter={this.handleMouseEnter}>
                <Icon
                    className={classNames({
                        [styles.pendingItemIcon]: this.props.stage === STAGE_PENDING,
                        [`${styles.pendingItemIcon} ${styles.placeholderPadding}`]: this.props.stage !== STAGE_PENDING,
                    })}
                    name='Schedule'
                />
                <Tooltip
                    show={this.props.enableTooltip && this.state.displayTooltip && this.props.stage === STAGE_PENDING}
                    arrowDirection='left'
                    small
                    className={classNames({
                        [styles.ieWidth]: isIE(),
                        [styles.stateCallout]: true,
                    })}>
                    <span>
                        PENDING
                    </span>
                </Tooltip>
            </div>
        );
    }
}
