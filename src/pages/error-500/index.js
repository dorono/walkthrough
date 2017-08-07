import React, {Component} from 'react';
import Container from 'components/container';

export default class Error500 extends Component {
    render() {
        return (
            <Container primary title='Server error' />
        );
    }
}
