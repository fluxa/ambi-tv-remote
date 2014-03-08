
/*!
 * Module dependencies.
 */

var common = require('../util/common');
var conf = require('./conf');
var child_process = require('child_process');


var proc;
var bin_path = common.util.format('%s/bin/ambi-tv',common.config.root);

exports.command = function (req, res, next) {

	var cmd = req.params['command'];
	
	switch(cmd) {
		case 'launch':
		if(!proc) {

			proc = child_process.spawn('ambi-tv',['-f', conf.path]);
			//proc = child_process.spawn(common.util.format('%s/test.sh',common.config.root));

			proc.stdout.on('data', function(data) {
				console.log(common.util.format('out: %s',data));
			});

			proc.stderr.on('data', function(data) {
				console.log(common.util.format('err: %s',data));
			});

			proc.on('close', function(code) {
				console.log(common.util.format('ambi-tv closed with code %s',code));
				proc = null;
			});

			proc.on('error', function(err) {
				console.log(common.util.format('ambi-tv error: %s',JSON.stringify(err)));
				proc = null;
			});

			proc.on('message', function(message) {
				console.log(common.util.format('ambi-tv message: %s',JSON.stringify(message)));
				
			});

			proc.on('exit', function(code) {
				console.log(common.util.format('ambi-tv exited with code %s',code));
				proc = null;
			});

			console.log(common.util.format('spawned ambi-tv process with pid %s',proc.pid));
			
		}
		break;
		
		case 'pause':
		if(proc) {
			proc.stdin.write('t');
		}
		break;
		
		case 'kill':
		if(proc) {
			proc.kill();
		}
		break;

		case 'mode':
		if(proc) {
			proc.stdin.write(' ');	
		}
		break;

	}

	res.send({success:true});
	
	
}

// UI
exports.ui = function (req, res, next) {

	res.render('../views/remote', {});
	
}


