import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

export default class Tooltip extends Component {
    static propTypes = {
        className: PropTypes.string,
        show: PropTypes.bool,
        timeout: PropTypes.number,
        children: PropTypes.node.isRequired,
        arrowDirection: PropTypes.string,
        small: PropTypes.bool,
    };

    static defaultProps = {
        timeout: 5000,
        show: true,
        arrowDirection: 'up',
        small: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.show !== prevState.showTooltip) {
            return {
                showTooltip: nextProps.show,
            };
        }

        return null;
    }

    state = {
        showTooltip: false,
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({showTooltip: false});
        }, this.props.timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {children, className, type, arrowDirection, small} = this.props;

        const arrowDirectionVarName = `pointing-${arrowDirection}`;

        if (!this.props.show) return null;
        return (
            <div
                className={classNames(
                    styles.tooltip,
                    styles[arrowDirectionVarName],
                    {[styles.small]: small},
                    className,
                    styles[type],
                    {[styles.hideTooltip]: !this.state.showTooltip},
                )}>
                {children}
            </div>
        );
    }
}
