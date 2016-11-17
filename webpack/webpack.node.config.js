var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: "app.js"
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    target: 'node',
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true
    },
    devtool: 'source-map',
    module:{
        loaders:[
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['transform-decorators-legacy', ['react-transform', {
                        transforms: [
                            {
                                transform: 'react-transform-catch-errors',
                                imports: ['react', 'redbox-react']
                            }
                        ]
                    }]]
                }
            },
            {
                test: /\.(css|less)$/,
                loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }
        ]
    }
};