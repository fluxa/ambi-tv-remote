
/**
 * Module dependencies.
 */


// controllers
var controllers = require('../app/controllers');

/**
 * Expose
 */

module.exports = function (app) {

	app.get('/', controllers.remote.ui);
	app.post('/remote/:command', controllers.remote.commands);
	app.post('/save', controllers.config.save);

}
