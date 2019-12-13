import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monospaced from 'components/monospaced';
import Icon from 'components/icon';
import {getPropertyLabel, formatAmount} from 'utils/transactions';
import styles from './styles.css';

export default class Amount extends Component {
    static propTypes = {
        unit: PropTypes.string,
        children: PropTypes.node.isRequired,
        iconName: PropTypes.node,
        displayIcon: PropTypes.bool,
        hoverText: PropTypes.string,
    };
    static defaultProps = {
        unit: null,
    };

    getAmount = () => {
        const {children, unit} = this.props;
        if (typeof children === 'string') return children;
        const formattedAmount = formatAmount(children, unit);
        return unit ? `${formattedAmount} ${getPropertyLabel(unit)}` : formattedAmount;
    };

    render() {
        const {iconName, displayIcon, hoverText} = this.props;
        return (
            <div className={styles.root} title={hoverText}>
                <Monospaced>{this.getAmount()}</Monospaced>
                {iconName && displayIcon && (
                    <Icon name={iconName} className={styles.icon} />
                )}
            </div>
        );
    }
}
