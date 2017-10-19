import React from 'react';
import {request} from 'api';
import Spinner from 'components/spinner';
import ErrorPage from 'pages/error-page';

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
            try {
                const data = await request(url);
                this.setState({data});
            } catch (error) {
                this.setState({error: error.statusCode || error.message});
            }
        }

        render() {
            if (this.state.error === 404) return <ErrorPage status={404} />;
            if (this.state.error) return <ErrorPage status={500} />;
            if (!this.state.data) return <Spinner />;
            return <Component {...this.props} {...this.state.data} />;
        }
    }
    return Loader;
};
