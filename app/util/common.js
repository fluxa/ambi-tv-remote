
/*!
 * Module dependencies.
 */

 var debugging = process.env.NODE_ENV === 'DEBUGGING';

 common = {
 	util: require('util'),
 	config: require('../../config/config'),
 	async: require('async'),
	_: require('underscore'),
	debugging: debugging
 }

 module.exports = common;
 