/* MIT license */

var SPI = require('spi'),
	Color = require("color");

var ledCount = 32,
	device = '/dev/spidev0.0',
	ChannelOrder = {
		"RGB" : [0,1,2], // Probably not used, here for clarity
		"GRB" : [1,0,2], // Strands from Adafruit and some others (default)
		"BRG" : [1,2,0]  // Strands from many other manufacturers
	},
	c_order = ChannelOrder.GRB,
	masterBrightness = 1.0,
	buffer = [],
	gamma = new Buffer(256),
	spi
	// spi = new SPI.Spi(device, {
	// 	'mode': SPI.MODE.MODE_0,
	// 	'chipSelect': SPI.CS.none,
	// 	'maxSpeed': 20000000
	// }, function(s){
	// 	s.open();
	// });

var LPD8806 = function(leds, dev){

	ledCount = leds || ledCount;
	device = dev || device;

	for(var i = 0; i < ledCount; i++){
		buffer[i] = new Buffer([0x80, 0x80, 0x80]);
	}

	for(var g = 0; g < gamma.length; g++){
		gamma[g] = 0x80 | Math.floor( Math.pow(g/255, 2.5) * 127 + 0.5);
	}

	// spi = SPI.initialize(dev);
	// spi.clockSpeed(20000000);

	spi = new SPI.Spi(device, {
		'mode': SPI.MODE.MODE_0,
		'chipSelect': SPI.CS.none,
		'maxSpeed': 20000000
	});
	spi.open();

	//Initialize the Complete RGB LED Strip
	this.update();
};

var __set_internal = function(pixel, color){
	if(pixel < 0 || pixel > this.lastIndex){
		throw 'dont go out of bounds';
	}
	buffer[pixel][c_order[0]] = gamma[~~(color.red() * masterBrightness)];
	buffer[pixel][c_order[1]] = gamma[~~(color.green() * masterBrightness)];
	buffer[pixel][c_order[2]] = gamma[~~(color.blue() * masterBrightness)];
};

LPD8806.prototype.setMasterBrightness = function(bright){
	if(bright > 1.0 || bright < 0.0){
		throw 'Brightness must be between 0.0 and 1.0';
	}
	masterBrightness = bright;
};

LPD8806.prototype.setChannelOrder = function(order){
	c_order = order;
};

LPD8806.prototype.updateBrightness = function(bright){
	if(bright > 1.0 || bright < 0.0){
		throw 'Brightness must be between 0.0 and 1.0';
	}
	masterBrightness = bright;
	for(var n = 0; n < buffer.length; n++){
		buffer[n][0] = gamma[~~(((buffer[n][0] > 128) ? buffer[n][0]: 0) * masterBrightness)];
		buffer[n][1] = gamma[~~(((buffer[n][1] > 128) ? buffer[n][1]: 0) * masterBrightness)];
		buffer[n][2] = gamma[~~(((buffer[n][2] > 128) ? buffer[n][2]: 0) * masterBrightness)];
	}
	//Update the Stip after Updating the Buffer
	this.update();
};

LPD8806.prototype.update = function(){
	var _buffer = buffer.slice(0, buffer.length);
	_buffer.push(new Buffer([0x00, 0x00, 0x00]));
	_buffer.push(new Buffer([0x00]));
	spi.write(Buffer.concat(_buffer));
};


LPD8806.prototype.fill = function(color){
	var pixel = ledCount;
	while(pixel--){
		__set_internal(pixel, color);
	}
	//Update the Stip after Updating the Buffer
	this.update();
};

LPD8806.prototype.fillRGB = function(r, g, b){
	var pixel = ledCount;
	while(pixel--){
		__set_internal(pixel, Color({r: r, g: g, b: b}));
	}
	//Update the Stip after Updating the Buffer
	this.update();
};

LPD8806.prototype.fillHSV = function(h, s, v){
	var pixel = ledCount;
	while(pixel--){
		__set_internal(pixel, Color({h: h, s: s, v:v}));
	}
	//Update the Stip after Updating the Buffer
	this.update();
};

LPD8806.prototype.allOFF = function(){
	var pixel = ledCount;
	while(pixel--){
		__set_internal(pixel, Color({r:0 , g: 0, b: 0}));
	}
	//Update the Stip after Updating the Buffer
	this.update();
};

LPD8806.prototype.setPixel = function(pixel, color){
	__set_internal(pixel, color);
};

LPD8806.prototype.setPixelRGB = function(pixel, r, g, b){
	__set_internal(pixel, Color({r: r, g: g, b: b}));
};

LPD8806.prototype.setPixelHSV = function(pixel, h, s, v){
	__set_internal(pixel, Color({h: h, s: s, v:v}));
};

LPD8806.prototype.setPixelOff = function(pixel){
	__set_internal(pixel, Color({r:0 , g: 0, b: 0}));
};

LPD8806.prototype.wheel_color = function(wheelpos){
	var r,g,b;
	if (wheelpos < 0){
		wheelpos = 0;
	}
	if (wheelpos > 384){
		wheelpos = 384;
	}

	if (wheelpos < 128){
		r = 127 - wheelpos % 128;
		g = wheelpos % 128;
		b = 0;
	} else if (wheelpos < 256){
		g = 127 - wheelpos % 128;
		b = wheelpos % 128;
		r = 0;
	} else {
		b = 127 - wheelpos % 128;
		r = wheelpos % 128;
		g = 0;
	}
	return new Color({r: r, g: g, b: b});
};

module.exports = LPD8806;