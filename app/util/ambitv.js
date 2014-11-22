
/*!
 * Module dependencies.
 */

var conf = require('./config');
var child_process = require('child_process');


var proc;
var bin_path = common.util.format('%s/ambi-tv/bin/ambi-tv',common.rootPath);

// Launches ambi-tv process
exports.launch = function() {

	if(!proc) {

		console.log(common.util.format('starting process: %s',bin_path));
		proc = child_process.spawn(bin_path,['-f', conf.path]);

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

}

// Toggle pause
exports.pause = function() {
	if(proc) {
		proc.stdin.write('t');
	}
}

// Toggle mode
exports.mode = function() {
	if(proc) {
		proc.stdin.write(' ');
	}
}

// Kill ambitv process
exports.kill = function() {
	if(proc) {
		proc.kill();
	}
}
