import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ExternalId from 'components/external-id';

import styles from './styles.css';

const ExternalIdList = ({externalIds, fadeOut, className, showDefaultEncoding}) => (
    <div className={classNames(fadeOut ? styles.fadeOut : styles.multiline, className)}>
        {externalIds.map((externalId, idx) => (
            <ExternalId key={idx} data={externalId} showDefaultEncoding={showDefaultEncoding} />
        ))}
    </div>
);

ExternalIdList.propTypes = {
    // Used to add fadeout effect on the right of the row
    fadeOut: PropTypes.bool,
    // The external ids to display
    externalIds: PropTypes.array.isRequired,
};

export default ExternalIdList;
