import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monospaced from 'components/monospaced';
import {getPropertyLabel} from 'utils/transactions';

const FCT_CONVERSION = 100000000;

export default class Amount extends Component {
    static propTypes = {
        unit: PropTypes.string,
        children: PropTypes.node.isRequired,
    };
    static defaultProps = {
        unit: null,
    };

    getAmount = () => {
        const {children, unit} = this.props;
        let value = children;
        if (unit !== 'EC') value = children / FCT_CONVERSION;
        if (unit) return `${value} ${getPropertyLabel(unit)}`;
        return value;
    }

    render() {
        return <Monospaced>{this.getAmount()}</Monospaced>;
    }
}
