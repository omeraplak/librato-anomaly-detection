'use strict';

var argv = require('yargs').argv;
var _ = require('lodash');
var config = require('./config.json');
var externalConfig = {};

try {
  externalConfig = require(argv.config);
} catch (err) {
  console.log(new Error('There is no file or may be corrupted.'));
} finally {
  config = _.merge(config, externalConfig);
};

module.exports = config;
