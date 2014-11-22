
/**
 * Module dependencies
 */

var common = require('./app/util/common');
var express = require('express');
var http = require('http');
var app = express();

// Bootstrap application settings
require('./config/express')(app, common.config);

// Bootstrap routes
require('./config/routes')(app);


// Start the app by listening on <port>
var port = 5000;
app.listen(port, function() {
	console.log(common.util.format('%s | Express app started on port %d',(new Date()), port));
	console.log("=== LOGS ==========================================");
});

// Expose app
module.exports = app;
