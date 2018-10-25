import React from 'react';
import A from 'components/anchor';
import styles from './styles.css';

const {devPortalBaseUrl} = CONFIG;

export const GenericErrorMessage = () => {
    return (
        <span>
            Please double check the values below against your
            <A
                className={styles.errorLink}
                to={devPortalBaseUrl}
                text={'application\'s details'}
            />.
        </span>);
};

export const CredentialsErrorMessage = () => {
    return <span>Authentication Error: Please check your Application ID and Key.</span>;
};

export const NetworkErrorMessage = () => {
    return <span>Connection Error: Please check your Connect API URL.</span>;
};
