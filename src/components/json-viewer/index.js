import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {REGEX} from 'constants/regex';
import styles from './styles.css';

const JsonViewer = ({data, className}) => {
    const getHtmlAsString = () =>
        normalizeJson(data)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(REGEX.JSON, wrapMatchInStyledSpan)
        .split('\n')
        .map(wrapInLineSpan)
        .join('');

    const normalizeJson = jsonString => JSON.stringify(JSON.parse(jsonString), null, 4);

    const wrapMatchInStyledSpan = match => {
        let cls = '';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = styles.key;
            } else {
                cls = styles.string;
            }
        } else if (/true|false/.test(match)) {
            cls = styles.boolean;
        } else if (/null/.test(match)) {
            cls = styles.null;
        }
        return `<span class="${cls}">${match}</span>`;
    };

    const wrapInLineSpan = line => `\n<span class="${styles.line}">${line}</span>`;

    return (
        <pre className={classNames(styles.root, className)}>
            <code className={styles.json} dangerouslySetInnerHTML={{__html: getHtmlAsString()}} />
        </pre>
    );
};

JsonViewer.propTypes = {
    data: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default JsonViewer;
