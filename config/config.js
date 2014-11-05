
/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
	root: rootPath,
	appURL: 'http://localhost',
	isDebugging: process.env.NODE_ENV === 'DEBUGGING'
}
