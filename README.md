# Factom Explorer UI
[![CircleCI](https://circleci.com/gh/FactomProject/explorer-v3/tree/develop.svg?style=shield&circle-token=abef98cc373611cebe2bccc2d8dd6cb251cecda3)](https://circleci.com/gh/FactomProject/explorer-v3/tree/develop)

## Development

Install [Node Version Manager](https://github.com/creationix/nvm) and then:

```
$ git clone git@github.com:FactomProject/explorer_gui.git
$ cd explorer-v3
$ nvm install
$ npm install
```

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to load
environment variables. You can define a .env file on the root directory to
configure the application. For example:

```
API_URL=https://stage.harmony.factom.com/v2
API_TOKEN=some-token
PUBLIC_NETWORK=Mainnet
DEV_PORTAL_URL=https://harmony-dev-portal.3scale.net
PUBLIC_NETWORK_GATEWAY=https://connect-mainnet-2445582615332.production.gw.apicast.io
PUBLIC_NETWORK_GATEWAY_APP_ID=155adafb
PUBLIC_NETWORK_GATEWAY_APP_KEY=2b3608417027eb7f57e62c3fe2df8f8b
SHARED_SANDBOX_GATEWAY=https://connect-shared-sandbox-2445582615332.production.gw.apicast.io
GA_ID=YOUR_GOOGLE_ANALYTICS_ID
```
**Important:** PUBLIC_NETWORK_GATEWAY and SHARED_SANDBOX_GATEWAY
should be written without a trailing "/".

To run the development server:

```
$ npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Production build

```
$ export API_URL=https://stage.harmony.factom.com/v2
$ export API_TOKEN=XXXXXXXX
$ export PUBLIC_NETWORK_GATEWAY=https://connect-mainnet-2445582615332.production.gw.apicast.io
$ export PUBLIC_NETWORK_GATEWAY_APP_ID=155adafb
$ export PUBLIC_NETWORK_GATEWAY_APP_KEY=2b3608417027eb7f57e62c3fe2df8f8b
$ export SHARED_SANDBOX_GATEWAY=https://connect-shared-sandbox-2445582615332.production.gw.apicast.io
$ export GA_ID=XXXXXXXX
$ npm run build
```

Output will be in `build` folder, copy that to the document root of the web server.

Web server must be configured for HTML5 history API support.

Example nginx config:

```
server {
    location ~ ^.+\..+$ {
        try_files $uri =404;
    }

    location / {
        try_files $uri /index.html;
    }
}
```
