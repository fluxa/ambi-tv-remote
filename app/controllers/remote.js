
/*!
 * Module dependencies.
 */

var common = require('../util/common');
var child_process = require('child_process');


var ambitv_process;
var bin_path = common.util.format('%s/bin/ambi-tv',common.config.root);
var config_path = common.util.format('%s/ambi-tv.conf',common.config.root);


exports.command = function (req, res, next) {

	var cmd = req.params['command'];
	console.log(cmd);

	switch(cmd) {
		case 'launch':
		if(!ambitv_process) {
			//ambitv_process = child_process.spawn()
			ambitv_process = {};
			res.send([bin_path, config_path]);
		}
	}
	
	
}


