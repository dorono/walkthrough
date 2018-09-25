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
API_URL=https://apiplus-api-dev-testnet.factom.com/v2
API_TOKEN=YOUR_TOKEN
GA_ID=YOUR_GOOGLE_ANALYTICS_ID
```

To run the development server:

```
$ npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Production build

```
$ export API_URL=https://apiplus-dev.factom.com/v2
$ export API_URL_MAINNET=https://apiplus-dev.factom.com/v2
$ export API_TOKEN=XXXXXXXX
$ export API_APP_ID=XXXXXXX
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
