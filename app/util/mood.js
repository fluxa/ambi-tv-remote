
/*!
 * Module dependencies.
 */


var lpd8806_lib = require('./lpd8806');
var TWEEN = require('tween.js');
var gameLoop = require('./gameLoop.js');

var num_leds = 100;
var device = '/dev/spidev0.0';
var lpd8806 = common.isDebugging ? {allOFF:function(){},fillRGB:function(){}} : new lpd8806_lib(num_leds, device);

exports.off = function() {
	if(lpd8806) {
		lpd8806.allOFF();
		//lpd8806.updateBrightness(1.0);
	}
}

var isColorBusy = false;
exports.color = function(r,g,b) {
	//console.log('fill color =>' + r + ',' + g + ',' + b);
	if (!isColorBusy) {
		isColorBusy = true;
		if(lpd8806) {
			lpd8806.fillRGB(r,g,b);
		}
		isColorBusy = false;
	}
}


var _tweener;
exports.colorTween = {
	start : function(colors, time) {

		// run loop
		gameLoop.update = function(delta, now) {
			TWEEN.update(now);
		}
		gameLoop.run();

		// setup tweener
		if(_tweener) {
			_tweener.stop()
		}
		_tweener = null

		_tweener = new TWEEN.Tween({x: 0})
		.to({x: 255}, 2000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(function(){
			var r = this.x;
			var g = 255-this.x;
			var b = 100;
			exports.color(r,g,b);
			// console.log(Math.round(this.x));
		})
		.onComplete(function(){
			console.log('finish');
			gameLoop.stop();
			_tweener = null;
		})
		.start();

	},
	stop : function() {
		if(_tweener) {
			_tweener.stop();
			_tweener = null;
		}
		gameLoop.stop();
	}
}
