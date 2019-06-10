import React from 'react';
const {devPortalBaseUrl} = CONFIG;
const requestPlanChangeParams = '/admin/applications/new';

export const Error429 = props => {
    const linkRequestPlanChange = `${devPortalBaseUrl}${requestPlanChangeParams}`;

    return (
        <div className='message'>
            <p>
                Your Harmony application <br />
                <strong>{props.appName}</strong> has run out of requests. <br /><br />
                <a href={linkRequestPlanChange}>Sign up</a> for a paid plan or come back tomorrow.
            </p>
        </div>
    );
};

export const Error500 = props => {
    return (
        <div>{props.message}</div>
    );
};

