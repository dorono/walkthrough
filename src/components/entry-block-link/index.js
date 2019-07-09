import React from 'react';
import PropTypes from 'prop-types';
import BlockLink from 'components/block-link';
import {BLOCKS} from 'constants/blocks';

const EntryBlockLink = ({children, isLink}) =>
    <BlockLink type={BLOCKS.ENTRY} isLink={isLink}>{children}</BlockLink>;

EntryBlockLink.propTypes = {
    children: PropTypes.object,
    isLink: PropTypes.bool,
};

export default EntryBlockLink;
