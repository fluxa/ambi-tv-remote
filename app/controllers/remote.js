
/*!
 * Module dependencies.
 */

var conf = require('../util/conf');
var ambitv = require('../util/ambitv');
var mood = require('../util/mood');

// Manages commands to ambitv process
exports.command = function (req, res) {

	var cmd = req.params['command'];
	
	switch(cmd) {
		case 'launch':
		ambitv.launch();
		break;
		
		case 'pause':
		ambitv.pause();
		break;
		
		case 'kill':
		ambitv.kill();
		break;

		case 'mode':
		ambitv.mode();
		break;

		case 'mood_launch':
		mood.launch();
		break;

		case 'mood_color':
		mood.color();
		break;
	}

	res.send({success:true});
	
	
}

// UI
exports.ui = function (req, res) {

	res.render('../views/remote', {
		my_conf: conf.get_my_conf(),
		title: 'remote'
	});
	
}

exports.config_save = function(req, res) {
	
	var updated = req.body;
	if(updated) {
		conf.save(updated, function(err) {
			res.redirect('/');
		});
	} else {
		// TODO: flash error
		res.redirect('/');
	}
}

// Mood
exports.mood_launch = function(req, res) {

}

