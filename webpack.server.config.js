const fs = require('fs');
const merge = require('webpack-merge');
const devConfig = require('./config/server/dev.js');
const baseConfig = require('./config/server/base.js');

const env = process.env.NODE_ENV || 'dev';
const envConfigURL = `./config/server/${env}.js`;
const envConfig = fs.existsSync(envConfigURL) // eslint-disable-next-line import/no-dynamic-require
  ? require(envConfigURL)
  : devConfig; // eslint-disable-line global-require import/no-dynamic-require

module.exports = merge(baseConfig, envConfig);
