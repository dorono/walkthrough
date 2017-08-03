import React from 'react';
import Spinner from 'components/spinner';
import Error404 from 'pages/error-404';

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
            // TODO: error handling
            const url = typeof target === 'function' ? target(props) : target;
            const response = await fetch(`${CONFIG.api}${url}`);
            if (response.status >= 400) {
                this.setState({error: response.status})
            } else {
                const data = await response.json();
                this.setState({data});
            }
        }

        render() {
            if (this.state.error === 404) return <Error404 />;
            if (!this.state.data) return <Spinner />;
            return <Component {...this.props} {...this.state.data} />;
        }
    }
    return Loader;
};
