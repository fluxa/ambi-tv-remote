
/**
 * Module dependencies.
 */


// controllers
var ui = require('ui');
var remote = require('remote');


/**
 * Expose
 */


module.exports = function (app) {

	app.route('/')
	.get(ui.index);

	app.route('/remote/:command')
	.post(remote.command);

}
