import React, {Component} from 'react';
import BlockLink from 'components/block-link';

export default class DirectoryBlockLink extends Component {
    render() {
        const dblock = this.props.children;
        return (
            <BlockLink type='dblock'>{dblock}</BlockLink>
        );
    }
}
