require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

const {imageminLoader} = require('imagemin-webpack');
const imageminSvgo = require('imagemin-svgo');

const resolve = dest => path.resolve(__dirname, dest);
const isDev = process.env.NODE_ENV !== 'production';
const version = isDev ? 'DEV' : process.env.VERSION;
const banner = `Factom Explorer\n${version}`;
// Load config from environment:
const googleTagManagerId = process.env.GTM_ID || '$GTM_ID';
const googleTagManagerAuth = process.env.GTM_AUTH;
const googleTagManagerEnv = process.env.GTM_ENV;
// Connect API values.
const apiUrl = process.env.API_URL || '$API_URL';
const publicNetAppId = process.env.PUBLIC_NETWORK_GATEWAY_APP_ID || '$PUBLIC_NETWORK_GATEWAY_APP_ID';
const publicNetAppKey = process.env.PUBLIC_NETWORK_GATEWAY_APP_KEY || '$PUBLIC_NETWORK_GATEWAY_APP_KEY';
const pegnetApiUrl = process.env.PEGNET_API_URL || '$PEGNET_API_URL';
const factomExplorerUrl = process.env.FACTOM_EXPLORER_URL || '$FACTOM_EXPLORER_URL';
const debugPartialConversion = process.env.DEBUG_PARTIAL_CONVERSION === 'true' || process.env.DEBUG_PARTIAL_CONVERSION === '1';

// API Gateway values.
const gatewayUrls = {
    publicNet: process.env.PUBLIC_NETWORK_GATEWAY || '$PUBLIC_NETWORK_GATEWAY',
    sharedSandbox: process.env.SHARED_SANDBOX_GATEWAY || '$SHARED_SANDBOX_GATEWAY',
};

const apiUrlVersionSuffix = process.env.API_URL_VERSION_SUFFIX || '/v1';
const blockchainNetwork = process.env.PUBLIC_NETWORK || 'Public Factom (Mainnet)';
const devPortalProtocol = process.env.DEV_PORTAL_PROTOCOL || 'https://';
const devPortalHostName = process.env.DEV_PORTAL_HOST_NAME || 'account.factom.com';
const devPortalBaseUrl = process.env.DEV_PORTAL_URL ?
    process.env.DEV_PORTAL_URL : `${devPortalProtocol}${devPortalHostName}/`;

const latestBuildTime = new Date();

process.noDeprecation = true;

module.exports = {
    context: resolve('src'),

    entry: {
        app: [
            '@babel/polyfill',
            'element-closest',
            'whatwg-fetch',
            'abortcontroller-polyfill',
            'react-hot-loader/patch',
            './styles/index.css',
            './index.js',
        ],
    },

    output: {
        filename: '[name].[hash].js',
        path: resolve('build'),
        publicPath: isDev ? 'http://localhost:3000/' : '/',
    },

    resolve: {
        modules: [resolve('src'), resolve('node_modules')],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [resolve('node_modules')],
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: isDev
                                ? '[folder]--[local]--[hash:base64:5]'
                                : '[hash:base64:16]',
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash].[ext]',
                        },
                    },
                    {
                        loader: imageminLoader,
                        options: {
                            cache: false,
                            bail: false, // Ignore errors on corrupted images
                            imageminOptions: {
                                plugins: [imageminSvgo()],
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            CONFIG: JSON.stringify({
                blockchainNetwork,
                apiUrl,
                apiUrlVersionSuffix,
                devPortalBaseUrl,
                pegnetApiUrl,
                factomExplorerUrl,
                devPortalHostName,
                devPortalProtocol,
                publicNetAppId,
                publicNetAppKey,
                gatewayUrls,
                version,
                latestBuildTime,
                debugPartialConversion,            }),
        }),
        new webpack.LoaderOptionsPlugin({
            debug: isDev,
            minimize: !isDev,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            minify: {collapseWhitespace: !isDev},
            banner,
            googleTagManagerId,
            googleTagManagerAuth,
            googleTagManagerEnv,
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[hash].css',
            disable: isDev,
            allChunks: true,
            ignoreOrder: true,
        }),
        new CopyWebpackPlugin([{from: 'static'}]),
        !isDev
            ? new UglifyPlugin({
                  parallel: true,
                  extractComments: !isDev && 'all',
              })
            : () => {},
        new webpack.ContextReplacementPlugin(/moment\/locale$/, /en/),
        new webpack.BannerPlugin({banner}),
        new CompressionPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    optimization: {
        minimize: !isDev,
    },

    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        noInfo: false,
        stats: 'minimal',
        historyApiFallback: true,
        clientLogLevel: 'warning',
        contentBase: resolve('src'),
    },
};
