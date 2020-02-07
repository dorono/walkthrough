import React from 'react';
import {Redirect} from 'react-router-dom';
import {has} from 'lodash';

@withRouter
export const redirectWrapper = (redirectUrl) => (Component) => {
    class RedirectWrapper extends React.Component {
        render() {
            // don't redirect if redirectUrl is specified or
            // redirect is to current path
            if (
                redirectUrl
                && this.props.location.pathname !== redirectUrl
            ) {
                return (
                    <Redirect
                        push
                        to={{
                            pathname: redirectUrl,
                            // TODO: Make the state obj more customized
                            state: {
                                status: this.props.status,
                                appName: this.props.appName,
                            },
                        }}
                    />
                );
            }

            // in case user refreshes error page
            const updatedProps = Object.assign({}, this.props);
            if (
                !has(updatedProps, 'location.state.status')
                || typeof updatedProps.location.state.status !== 'number'
            ) {
                updatedProps.location.state = {
                    status: 500,
                };
            }

            return (
                <Component {...updatedProps} />
            );
        }
    }

    return RedirectWrapper;
};
