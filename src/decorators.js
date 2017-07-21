import React from 'react';
import Spinner from 'components/spinner';

export const load = target => Component => {
    class Loader extends React.Component {
        state = {};

        componentWillMount() {
            this.load();
        }

        async load() {
            // TODO: error handling
            const url = typeof target === 'function' ? target(this.props) : target;
            const response = await fetch(url);
            const data = await response.json();
            this.setState({data});
        }

        render() {
            if (!this.state.data) return <Spinner />;
            return <Component {...this.props} data={this.state.data} />;
        }
    }
    return Loader;
};
