
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
	app.post('/save', remote.config_save);
	
}
