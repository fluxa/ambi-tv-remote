
/*!
 * Module dependencies.
 */


var lpd8806_lib = require('./lpd8806');

var num_leds = 100;
var device = '/dev/spidev0.0';
var lpd8806 = new lpd8806_lib(num_leds, device);


exports.off = function() {
	if(lpd8806) {
		lpd8806.allOff();
		//lpd8806.updateBrightness(1.0);
	}
}

exports.color = function(r,g,b) {
	//console.log('fill color =>' + r + ',' + g + ',' + b);
	if(lpd8806) {
		lpd8806.fillRGB(r,g,b);
	}
}



