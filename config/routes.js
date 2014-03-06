
/**
 * Module dependencies.
 */


// controllers
var ui = require('ui')


/**
 * Expose
 */


module.exports = function (app) {

	app.route('/')
	.get(ui.index);

}
