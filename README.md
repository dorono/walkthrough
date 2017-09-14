# Factom Explorer UI
[![CircleCI](https://circleci.com/gh/FactomProject/explorer-v3/tree/develop.svg?style=shield&circle-token=abef98cc373611cebe2bccc2d8dd6cb251cecda3)](https://circleci.com/gh/FactomProject/explorer-v3/tree/develop)

## Development

Install [Node Version Manager](https://github.com/creationix/nvm) and then:

```
$ git clone git@github.com:FactomProject/explorer_gui.git
$ cd explorer_gui
$ nvm install
$ npm install
```

To run the development server:

```
$ npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Production build

```
$ export API_URL=https://apiplus-dev.factom.com/v2
$ export API_TOKEN=XXXXXXXX
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
