import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const HexViewer = ({data}) => {
    const splittedBytes = data.match(/.{1,2}/g) || [];

    return (
        <pre className={styles.root}>
            <code>
                {splittedBytes.map((byte, idx) => <span key={`byte_${idx}`} className={styles.byte}>{byte}</span>)}
            </code>
        </pre>

    );
};

HexViewer.propTypes = {
    data: PropTypes.string.isRequired,
};

export default HexViewer;

