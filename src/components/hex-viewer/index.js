import React from 'react';

import styles from './styles.css';

const HexViewer = ({data}) => {
    const splittedBytes = data.match(/.{1,2}/g);

    return (
        <pre className={styles.root}>
            <code>
                {splittedBytes.map(byte => <span className={styles.byte}>{byte}</span>)}
            </code>
        </pre>

    );
};

export default HexViewer;

