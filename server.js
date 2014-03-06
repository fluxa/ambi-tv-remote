
/**
 * Module dependencies
 */

var express = require('express');
var config = require('./config/config');
var util = require('util');
var http = require('http');
http.globalAgent.maxSockets = Infinity;

var app = express();

// Bootstrap application settings
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app);


// Start the app by listening on <port>
var port = 5000;
app.listen(port, function() {
	console.log(util.format('%s | Express app started on port %d',(new Date()), port));
	console.log("=== LOGS ==========================================");
});

// Expose app
module.exports = app;
