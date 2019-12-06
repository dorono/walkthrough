# pExplorer UI
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
PUBLIC_NETWORK=Mainnet
DEV_PORTAL_URL=https://harmony-dev-portal.3scale.net
PUBLIC_NETWORK_GATEWAY=https://connect-mainnet-2445582615332.production.gw.apicast.io
PUBLIC_NETWORK_GATEWAY_APP_ID=155adafb
PUBLIC_NETWORK_GATEWAY_APP_KEY=2b3608417027eb7f57e62c3fe2df8f8b
SHARED_SANDBOX_GATEWAY=https://connect-shared-sandbox-2445582615332.production.gw.apicast.io
GA_ID=YOUR_GOOGLE_ANALYTICS_ID
PEGNET_API_URL=https://pegnetd.factom.com/v1
FACTOM_EXPLORER_URL=https://explorer.factom.com
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
$ export PEGNET_API_URL=https://pegnetd.factom.com/v1
$ export FACTOM_EXPLORER_URL=https://explorer.factom.com
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

## Contributing

```
// Create a new feature branch (our naming convention prepends "feature/")
$ git checkout -b feature/<FEATURE_NAME>

// Push your completed changes
$ git add .
$ git commit -m "<COMMIT_MESSAGE>"
$ git push origin feature/<FEATURE_NAME>

// Rebase with develop, which is the default branch
$ git fetch --all
$ git rebase origin develop

// Fix any conflicts that arise and force push
$ git push origin feature/<FEATURE_NAME> -f
// Create a pull request from feature/<FEATURE_NAME> to develop

//Complete the following to release your new changes

//Create a release version branch
$ git checkout -b release/X.X.X

// Update and save the version of the application in Changelog.md, package.json, and package-lock.json
$ git add .
$ git commit -m "Bumped version to X.X.X"
$ git push origin release/X.X.X

// Create PR online from release/X.X.X to develop, wait for the CircleCi job to complete successfully

// Create a release tag
$ git tag vX.X.X
$ git push origin vX.X.X

// Contact devops to push your newly created explorer tag
```
