import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import {LastLocationProvider} from 'react-router-last-location';

import App from 'components/app';
import {APIConfigurationProvider} from 'contexts/api';

const render = Component =>
    ReactDOM.render(
        <APIConfigurationProvider>
            <AppContainer>
                <BrowserRouter>
                    <LastLocationProvider>
                        <Component />
                    </LastLocationProvider>
                </BrowserRouter>
            </AppContainer>
        </APIConfigurationProvider>,
        document.getElementById('root'),
    );

render(App);

if (module.hot) {
    module.hot.accept('components/app', () => render(App));
}
