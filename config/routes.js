
/**
 * Module dependencies.
 */


// controllers
var remote = require('remote');
var conf = require('conf');

/**
 * Expose
 */


module.exports = function (app) {

	app.route('/')
	.get(remote.ui)

	app.route('/remote/:command')
	.post(remote.command)

	app.route('/save')
	.post(conf.save_update)
	

}
