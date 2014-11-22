
/*!
* Module dependencies.
*/

var path = require('path')

common = {
  isDebugging :  process.env.NODE_ENV === 'DEBUGGING',
  rootPath : path.resolve(__dirname + '../../..'),
  util: require('util'),
  _: require('underscore')
}

module.exports = common;

common.config = require('./config');
