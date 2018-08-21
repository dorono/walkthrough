import React, {Component} from 'react';
import BlockLink from 'components/block-link';

export default class EntryBlockLink extends Component {
    render() {
        const eblock = this.props.children;

        return (
            <BlockLink type='eblock'>{eblock}</BlockLink>
        );
    }
}
