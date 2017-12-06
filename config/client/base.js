const AssetsPlugin = require('assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const projectPath = path.resolve(__dirname, '../../');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'dev';
const envAppConfigURL = path.resolve(__dirname, `../app/${env}.js`);

module.exports = {
  target: 'web',
  entry: {
    client: ['babel-polyfill', './src/client/client.js']
  },
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[hash].chunk.js',
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Config: fs.existsSync(envAppConfigURL) ? envAppConfigURL : path.resolve(__dirname, 'dev.js'),
      Utils: path.resolve(projectPath, 'src/shared/utils/index.js'),
      Components: path.resolve(projectPath, 'src/shared/components/'),
      Images: path.resolve(projectPath, 'src/shared/assets/images/'),
      Icons: path.resolve(projectPath, 'src/shared/assets/icons/'),
      Styles: path.resolve(projectPath, 'src/shared/assets/styles/'),
    },
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
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      }, {
        test: /\/icon\/.*\.svg$/,
        loaders: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { cleanupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeNonInheritableGroupAttrs: true },
                { collapseGroups: true },
                { convertShapeToPath: true },
                { removeScriptElement: true },
                { removeEmptyContainers: true },
                { removeHiddenElems: true },
                { moveGroupAttrsToElems: true },
              ],
            },
          },
        ],
      }, {
        test: /\/monoicon\/.*\.svg$/,
        loaders: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeStyleElement: true },
                { removeScriptElement: true },
                { moveGroupAttrsToElems: true },
                { removeHiddenElems: true },
                { convertShapeToPath: true },
                { convertPathData: true },
                { removeUselessStrokeAndFill: true },
                { removeNonInheritableGroupAttrs: true },
                { removeAttrs: { attrs: '(fill|stroke|fill-opacity|stroke-opacity)' } },
                { removeEmptyContainers: true },
                { collapseGroups: true },
                { transformsWithOnePath: true },
              ],
            },
          },
        ],
      }, {
        test: /\/images\/.*\.svg$/,
        use: 'file-loader',
      }, {
        test: /\.pcss$/,
        use: [
          'isomorphic-style-loader',
          {
             loader: 'css-loader',
             options: {
               modules: true,
               importLoaders: 1,
               localIdentName: '[local]~~~~[hash:base64:24]',
             }
          },
          'postcss-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
             loader: 'css-loader',
             options: {
               modules: true,
               importLoaders: 1,
               localIdentName: '[local]~~~~[hash:base64:24]',
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
