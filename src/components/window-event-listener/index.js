import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

/**
 * Event listener adds a listener for the specified window event.
 * The handler result is passed as a prop for the rendered child.
 */
class WindowEventListener extends React.Component {
    static propTypes = {
        events: PropTypes.arrayOf(PropTypes.string).isRequired,
        handler: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.events.forEach(eventName =>
            window.addEventListener(eventName, evt => this.handler(eventName, evt), false));
    }

    componentWillUnmount() {
        this.props.events.forEach(eventName =>
        window.removeEventListener(eventName, evt => this.handler(eventName, evt), false));
    }

    @autobind
    handler(eventName, event) {
        this.props.handler(eventName, event);
    }

    render() {
        return this.props.children;
    }
}

export default WindowEventListener;
