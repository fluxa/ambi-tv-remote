	
/*!
 * Module dependencies.
 */

var common = require('../util/common');
var remote = require('./remote');

exports.index = function (req, res, next) {

	res.render('../views/ui/index', {});
	
}


