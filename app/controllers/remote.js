
/*!
 * Module dependencies.
 */

var ambitv = require('../util/ambitv');
var mood = require('../util/mood');

exports = module.exports = {

	commands : function (req, res) { // Manages commands to ambitv process
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

			case 'mood_off':
				mood.off();
				break;

			case 'mood_color':
				var rgb = req.body.rgb;
				if(rgb) {
					mood.color(rgb.r, rgb.g, rgb.b);
				}
				break;
			case 'mood_color_tween_start':
				mood.colorTween.start([],0);
				break;
			case 'mood_color_tween_stop':
				mood.colorTween.stop();
				break;
			}
		res.send({success:true});
	},

	ui : function (req, res) {

		res.render('../views/remote', {
			my_conf: common.config.get_my_conf()
		});

	}

}
