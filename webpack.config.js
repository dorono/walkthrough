require('dotenv').config()

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = dest => path.resolve(__dirname, dest);
const isDev = process.env.NODE_ENV !== 'production';
const version = isDev ? 'DEV' : `v${require('./package.json').version} (Build: ${new Date().toISOString()})`;
const banner = `Factom Explorer\n${version}`;
const apiUrl = process.env.API_URL || 'https://apiplus-api-sandbox-4.factom.com/v2';
const apiToken = process.env.API_TOKEN;

process.noDeprecation = true;

module.exports = {
    context: resolve('src'),

    entry: {
        app: [
            'whatwg-fetch',
            'react-hot-loader/patch',
            './styles/index.css',
            './index.js',
        ],
    },

    output: {
        filename: '[name].[hash].js',
        path: resolve('build'),
        publicPath: isDev ? `http://localhost:3000/` : '/',
    },

    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules'),
        ],
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: isDev ? '[folder]--[local]--[hash:base64:5]' : '[hash:base64:16]',
                            },
                        },
                        'postcss-loader',
                    ],
                }),
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/[name].[hash].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: isDev,
                            mozjpeg: {progressive: true},
                            gifsicle: {interlaced: true},
                            optipng: {optimizationLevel: 7},
                            pngquant: {quality: '75-90', speed: 3},
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'CONFIG': JSON.stringify({version, apiUrl, apiToken}),
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
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            disable: isDev,
            allChunks: true,
            ignoreOrder: true,
        }),
        new CopyWebpackPlugin([
            {from: 'static'},
        ]),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {warnings: false},
            output: {comments: false},
        }),
        new webpack.ContextReplacementPlugin(/moment\/locale$/, /en/),
        new webpack.BannerPlugin({banner}),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    devtool: isDev ? 'module-eval-source-map' : 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        noInfo: true,
        historyApiFallback: true,
        clientLogLevel: 'warning',
        contentBase: resolve('src'),
    },
};
