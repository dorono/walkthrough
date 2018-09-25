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
    };

    static defaultProps = {
        timeout: 5000,
        show: true,
    };

    state = {
        show: this.props.show,
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({show: false});
        }, this.props.timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {
            children,
            className,
            type,
        } = this.props;
        if (!this.props.show) return null;
        return (
            <div
                className={
                    classNames(styles.tooltip, className, styles[type], {[styles.hideTooltip]: !this.state.show})
                }>
                {children}
            </div>
        );
    }
}

