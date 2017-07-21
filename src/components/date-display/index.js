import React, {Component} from 'react';
import {formatDate} from 'format';

export default class DateDisplay extends Component {
    render() {
        return (
            <span>
                {formatDate(this.props.children)}
            </span>
        );
    }
}
