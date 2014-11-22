
/*!
 * Module dependencies.
 */


var lpd8806_lib = require('./lpd8806');
var TWEEN = require('tween.js');

var num_leds = 100;
var device = '/dev/spidev0.0';
var lpd8806 = common.isDebugging ? {} : new lpd8806_lib(num_leds, device);

exports.off = function() {
	if(lpd8806) {
		lpd8806.allOFF();
		//lpd8806.updateBrightness(1.0);
	}
}

exports.color = function(r,g,b) {
	//console.log('fill color =>' + r + ',' + g + ',' + b);
	if(lpd8806) {
		lpd8806.fillRGB(r,g,b);
	}
}


// Animations
var requestAnimationFrame = function(callback) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
	lastTime = currTime + timeToCall;
	return id;
};

var _tweener;
var lastTime = 0;
var _animInterval;
var _animFrame;
var animator = {
	run : function(){
		if( _animInterval == null ) {
			_animInterval = setInterval(function(){
				if(_tweener) {
					_animFrame = requestAnimationFrame(function(time) {
						TWEEN.update(time);
					});
				}
			}, 1);
			console.log('anim interval started');
		} else {
			console.log('anim is running');
		}

	},
	stop : function(){
		if(_animInterval) {
			clearInterval(_animInterval);
		}
		_animInterval = null;
		if(_animFrame) {
			clearTimeout(_animFrame);
		}
		_animFrame = null;
		console.log('anim interval stopped');
	}

}

exports.colorTween = {
	start : function(colors, time) {
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
			var b = 0;
			exports.color(r,g,b);
			// console.log(Math.round(this.x));
		})
		.onComplete(function(){
			console.log('finish');
		})
		.start();
		animator.run();
	},
	stop : function() {
		if(_tweener) {
			_tweener.stop();
			_tweener = null;
		}
		animator.stop();
	}
}
