
/**
 * Module dependencies.
 */


// controllers
var remote = require('../app/controllers/remote');

/**
 * Expose
 */


module.exports = function (app) {

	app.route('/')
	.get(remote.ui)

	app.route('/remote/:command')
	.post(remote.command)

	app.route('/save')
	.post(remote.config_save)
	

}
