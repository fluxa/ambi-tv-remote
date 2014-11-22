
/*!
 * Module dependencies.
 */

var express = require('express')
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var pkg = require('../package');
var path = require('path');

/*!
 * Expose
 */

module.exports = function (app, config) {

	app.set('showStackError', true)

	// use express favicon
	app.use(favicon(common.rootPath + '/public/images/favicon.ico'));


	// views config
	app.set('views', common.rootPath + '/app/views');
	app.set('view engine', 'jade');
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.locals.pretty = true;

	//static should be after less-middleware
	app.use(express.static(common.rootPath + '/public'))

	// expose pkg and node env to views
	app.use(function (req, res, next) {
		res.locals.pkg = pkg;
		next()
	})


}
