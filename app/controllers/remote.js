
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
	
	switch(cmd) {
		case 'launch':
		if(!ambitv_process) {

			ambitv_process = child_process.spawn('ambi-tv');

			ambitv_process.stdout.on('data', function(data) {
				console.log(common.util.format('out: %s',data));
			});

			ambitv_process.stderr.on('data', function(data) {
				console.log(common.util.format('err: %s',data));
			});

			ambitv_process.on('close', function(code) {
				console.log(common.util.format('ambi-tv exited with code %s',code));
				ambitv_process = null;
			});
			
		}
		break;
		case 'pause':
		if(ambitv_process) {
			ambitv_process.stdout.write('t\n');
		}
		break;
		case 'kill':
		ambitv_process.kill('SIGHUP');
		break;
	}

	res.send({success:true});
	
	
}


