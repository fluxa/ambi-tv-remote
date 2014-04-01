
/**
 * Module dependencies.
 */


// controllers
var remote = require('../app/controllers/remote');

/**
 * Expose
 */


module.exports = function (app) {

	app.get('/', remote.ui);
	app.post('/remote/:command', remote.command);
	app.route('/save', remote.config_save);
	
}
