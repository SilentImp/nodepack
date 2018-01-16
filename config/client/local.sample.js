const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const projectPath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    client: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://127.0.0.1:8090',
      './src/client/client.jsx'
    ]
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: ['/', path.join(projectPath, "build"), path.join(projectPath, "src/static")],
    port: 8090,
    host: '127.0.0.1',
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    open: true
  },
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(projectPath, 'src/shared/template/index.pug'),
      inject: 'body',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("local")
      }
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
