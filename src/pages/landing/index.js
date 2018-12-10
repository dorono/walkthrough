import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {APIConfigurationConsumer} from 'api-context';
import {reverse} from 'routes';

export default class Landing extends Component {
    render() {
        return (
            <APIConfigurationConsumer>
                {
                    ({isConfiguredByDefault}) => (
                        isConfiguredByDefault() ?
                            <Redirect to={reverse('dblocks')} /> :
                            <Redirect to={reverse('chains')} />
                    )
                }
            </APIConfigurationConsumer>
        );
    }
}
