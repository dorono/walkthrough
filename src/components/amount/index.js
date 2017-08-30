import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monospaced from 'components/monospaced';

const FCT_CONVERSION = 100000000;

export default class Amount extends Component {
    static propTypes = {
        unit: PropTypes.oneOf(['FCT', 'EC']).isRequired,
    };

    render() {
        let value = this.props.children;
        if (this.props.unit === 'FCT') value /= FCT_CONVERSION;
        return <Monospaced>{value} {this.props.unit}</Monospaced>;
    }
}
