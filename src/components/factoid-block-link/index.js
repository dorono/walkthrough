import React, {Component} from 'react';
import BlockLink from 'components/block-link';

export default class FactoidBlockLink extends Component {
    render() {
        const fblock = this.props.children;
        return (
            <BlockLink type='fblock'>{fblock}</BlockLink>
        );
    }
}
