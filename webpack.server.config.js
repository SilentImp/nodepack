const path = require('path');
const projectPath = path.resolve(__dirname);
const webpack = require('webpack');

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
  plugins: [],
  module: {
    rules: [
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
