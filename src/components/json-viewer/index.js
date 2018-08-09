import {autobind} from 'core-decorators';
import React, {Component} from 'react';

import styles from './styles.css';

const JSON_REGEX = (
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g
);

class JsonSintaxHighlight extends Component {

    getHtmlAsString() {
        return this
            .normalizeJson(this.props.data)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(JSON_REGEX, this.wrapMatchInStyledSpan)
            .split('\n')
            .map(this.wrapInLineSpan)
            .join('');
    }

    normalizeJson(jsonString) {
        return JSON.stringify(JSON.parse(jsonString), null, 4);
    }

    wrapMatchInStyledSpan(match) {
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
    }

    @autobind
    wrapInLineSpan(line) {
        return `\n<span class="${styles.line}">${line}</span>`;
    }

    render() {
        return (
            <pre className={styles.root}>
                <code className={styles.json} dangerouslySetInnerHTML={{__html: this.getHtmlAsString()}} />
            </pre>
        );
    }

}

export default JsonSintaxHighlight;

