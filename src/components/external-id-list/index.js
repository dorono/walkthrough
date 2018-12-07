import React from 'react';
import PropTypes from 'prop-types';

import ExternalId from 'components/external-id';

import styles from './styles.css';

const ExternalIdList = ({externalIds, className, showDefaultEncoding}) => (
    <div className={className}>
        {externalIds.map((externalId, idx) => (
            <ExternalId key={idx} data={externalId} showDefaultEncoding={showDefaultEncoding} />
        ))}
    </div>
);

ExternalIdList.propTypes = {
     // The external ids to display
    externalIds: PropTypes.array.isRequired,
};

ExternalIdList.defaultProps = {
    className: styles.multiline,
};

export default ExternalIdList;
