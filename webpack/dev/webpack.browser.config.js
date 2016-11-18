/* eslint-disable */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../../config');
var autoprefixer = require('autoprefixer');
let BowerWebpackPlugin = require('bower-webpack-plugin');

var NoErrorsPlugin = webpack.NoErrorsPlugin;
var optimize = webpack.optimize;

var webpackConfig = module.exports = {
  entry: {
    public: ['./src/client/public.js']
  },
  output: {
    path: './public/assets',
    filename: '[name].js',
    publicPath: 'http://localhost:' + config.devPort + '/assets/'
  },
  devtool: "eval",
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['public']),
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*', to: '../' } // `to` is relative to output.path
    ]),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy',   ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              },
              {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }]]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[local]!postcss!less', {
          publicPath: '../css/'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss', {
          publicPath: '../css/'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  devServer: {
    port: config.devPort,
    contentBase: 'http://localhost:' + config.port,
    outputPath: 'public/assets'
  }
};
