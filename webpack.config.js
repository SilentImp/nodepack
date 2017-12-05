const AssetsPlugin = require('assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');
const projectPath = path.resolve(__dirname);
const webpack = require('webpack');

const window = global = {};

module.exports = {
  target: 'node',
  entry: {
    client: ['babel-polyfill', './src/client.js']
  },
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '',
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(projectPath, 'src'),
      path.resolve(projectPath, 'src/shared'),
      path.resolve(projectPath, 'src/shared/components'),
      path.resolve(projectPath, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new AssetsPlugin({path: path.resolve(projectPath, 'build')}),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
             loader: 'css-loader',
             options: {
               modules: true,
               importLoaders: 1,
               localIdentName: '[name]--[hash:base64:5]'
             }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
