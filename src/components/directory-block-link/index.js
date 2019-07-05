import React from 'react';
import PropTypes from 'prop-types';
import BlockLink from 'components/block-link';
import {BLOCKS} from 'constants/blocks';

const DirectoryBlockLink = ({children, isLink}) =>
    <BlockLink type={BLOCKS.DIRECTORY} isLink={isLink}>{children}</BlockLink>;

DirectoryBlockLink.propTypes = {
    children: PropTypes.object.isRequired,
    isLink: PropTypes.bool,
};

export default DirectoryBlockLink;
