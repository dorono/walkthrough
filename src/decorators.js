import React from 'react';
import Spinner from 'components/spinner';
import Error404 from 'pages/error-404';
import Error500 from 'pages/error-500';

export const load = target => Component => {
    class Loader extends React.Component {
        state = {};

        componentWillMount() {
            this.load(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.setState({data: undefined, error: undefined});
            this.load(nextProps);
        }

        async load(props) {
            const url = typeof target === 'function' ? target(props) : target;
            const headers = {
                'accept': 'application/json',
                'content-type': 'application/json',
                'x-3scale-proxy-secret-token': CONFIG.apiToken,
            };
            try {
                const response = await fetch(`${CONFIG.api}${url}`, {headers});
                if (response.status >= 400) {
                    this.setState({error: response.status});
                } else {
                    const data = await response.json();
                    this.setState({data});
                }
            } catch (error) {
                this.setState({error});
            }
        }

        render() {
            if (this.state.error === 404) return <Error404 />;
            if (this.state.error) return <Error500 />;
            if (!this.state.data) return <Spinner />;
            return <Component {...this.props} {...this.state.data} />;
        }
    }
    return Loader;
};
