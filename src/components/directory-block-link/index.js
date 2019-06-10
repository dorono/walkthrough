import React from 'react';
import PropTypes from 'prop-types';
import BlockLink from 'components/block-link';

const DirectoryBlockLink = ({type, children}) =>
    <BlockLink type={type}>{children}</BlockLink>;

DirectoryBlockLink.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['block', 'dblock', 'fblock', 'eblock', 'banchor', 'btc']),
};

DirectoryBlockLink.defaultProps = {
    type: 'dblock',
};

export default DirectoryBlockLink;
