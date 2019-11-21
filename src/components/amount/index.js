import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monospaced from 'components/monospaced';
import {getPropertyLabel} from 'utils/transactions';

const FCT_CONVERSION = 100000000;

export default class Amount extends Component {
    static propTypes = {
        unit: PropTypes.string,
    };

    render() {
        console.log('this.props.unit', this.props.unit);
        let value = this.props.children;
        if (this.props.unit !== 'EC') value /= FCT_CONVERSION;
        return (
            <Monospaced>
                {value} {getPropertyLabel(this.props.unit)}
            </Monospaced>
        );
    }
}
