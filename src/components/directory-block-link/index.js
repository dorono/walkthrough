import React from 'react';
import PropTypes from 'prop-types';
import BlockLink from 'components/block-link';

const DirectoryBlockLink = ({type, children, isLink}) =>
    <BlockLink type={type} isLink={isLink}>{children}</BlockLink>;

DirectoryBlockLink.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['block', 'dblock', 'fblock', 'eblock', 'banchor', 'btc']),
    isLink: PropTypes.bool,
};

DirectoryBlockLink.defaultProps = {
    type: 'dblock',
    isLink: true,
};

export default DirectoryBlockLink;
