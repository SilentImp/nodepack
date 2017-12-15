const webpack = require('webpack');
const path = require('path');

const projectPath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    server: ['babel-polyfill', './src/server/server.jsx']
  },
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[hash].chunk.js',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
  ],
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/,
      // }
    ]
  }
};
