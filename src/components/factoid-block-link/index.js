import React from 'react';
import PropTypes from 'prop-types';
import BlockLink from 'components/block-link';
import {BLOCKS} from 'constants/blocks';

const FactoidBlockLink = ({children, isLink}) =>
    <BlockLink type={BLOCKS.FACTOID} isLink={isLink}>{children}</BlockLink>;

FactoidBlockLink.propTypes = {
    children: PropTypes.object.isRequired,
    isLink: PropTypes.bool,
};

export default FactoidBlockLink;
