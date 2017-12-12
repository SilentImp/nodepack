const webpack = require('webpack');
const path = require('path');

const projectPath = path.resolve(__dirname, '../../');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    // new UglifyJSPlugin({
    //   sourceMap: true,
    // }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
  ]
};
