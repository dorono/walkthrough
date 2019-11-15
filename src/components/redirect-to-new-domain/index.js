import React from 'react';
import {withLastLocation} from 'react-router-last-location';
import {Redirect} from 'react-router-dom';
import {has} from 'lodash';

const RedirectToNewDomain = (props) => {
    if (has(props, 'lastLocation.pathname')) {
        if (props.location.pathname !== props.lastLocation.pathname) {
            window.open(`${CONFIG.factomExplorerUrl}${props.location.pathname}`);
            return <Redirect to={props.lastLocation.pathname} />;
        }

        return null;
    }

    return <Redirect to='/' />;
};

export default withLastLocation(RedirectToNewDomain);
