const path = require('path');
const projectPath = path.resolve(__dirname);
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    server: ['babel-polyfill', './src/server.js']
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
      path.resolve(projectPath, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new CopyWebpackPlugin([
      {from:'src/static', to:''}
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
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
