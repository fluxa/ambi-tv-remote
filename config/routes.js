
/**
 * Module dependencies.
 */


// controllers
var remote = require('../app/controllers/remote');
var conf = require('../app/controllers/conf');

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
