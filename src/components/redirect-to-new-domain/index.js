import React from 'react';
import {withLastLocation} from 'react-router-last-location';
import {Redirect} from 'react-router-dom';
import {has} from 'lodash';

const RedirectToNewDomain = props => {
    if (has(props, 'lastLocation.pathname')) {
        if (props.location.pathname !== props.lastLocation.pathname) {
            // for paths that we aren't redirecting by default and need to force
            // a redirect by adding the parent path, "/explorer/", which we
            // use as an identifier for a forced redirect to Explorer
            const pathname = props.location.pathname.includes('/explorer/')
                ? props.location.pathname.split('/explorer')[1]
                : props.location.pathname;

            window.open(`${CONFIG.factomExplorerUrl}${pathname}`);
            return <Redirect to={props.lastLocation.pathname} />;
        }

        return null;
    }

    return <Redirect to='/' />;
};

export default withLastLocation(RedirectToNewDomain);
