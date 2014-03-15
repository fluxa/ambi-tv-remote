
/*!
 * Module dependencies.
 */

var configurables = ['crop-left', 'crop-top', 'crop-right', 'crop-bottom', 'blended-frames', 'box-width', 'box-height','speed','leds-left','leds-top','leds-right','leds-bottom','led-inset-left','led-inset-top','led-inset-right','led-inset-bottom','gamma-red','gamma-green','gamma-blue'];
var fs = require('fs');
var my_conf_path = common.util.format('%s/my-conf.json',common.config.root); 
var conf_path = common.util.format('%s/ambi-tv.conf',common.config.root);
var conf = require('../../ambi-tv.json');

var my_conf = get_my_conf();
exports.path = conf_path;

// Writes ambi-tv.conf base on my_conf + defaults
update();
function update(callback) {

	var buff = '';
	common._.each(conf, function(module, index, all) {
		var key = Object.keys(module);
		var props = module[key];
		buff += key + ' {\n';
		common._.each(props, function(prop, index, all) {
			var prop_key = Object.keys(prop)[0];
			var prop_val = my_conf[prop_key] || prop[prop_key];
			buff += '\t' + prop_key + '\t' + prop_val + '\n';
		});
		buff += '}\n\n';
	});

	fs.writeFile(conf_path, buff, function(err) {
		if(err) {
			console.log('error writing file: ' + err);
		} else {
			console.log('ambi-tv.conf updated');
		}
		if(callback) {
			callback(err);
		}
	});
}
exports.update = update;

// Saves changes to my_conf to disk
exports.save_update = function(req, res, next) {

	var updated = req.body;
	if(updated) {
		my_conf = updated;
		var data = JSON.stringify(my_conf);
		fs.writeFile(my_conf_path, data, function(err) {
			if(err) {
				console.log('error saving my_conf');
			} else {
				update(function(err) {
					res.redirect('/');
				});
			}
		});
	} else {
		res.redirect('/');
	}

}

// Creates my-conf.json with default values if needed then returns the obj.
function get_my_conf() {
	var exists = fs.existsSync(my_conf_path);
	if(!exists) {
		update_my_conf();
	} else {
		var myconf = require(my_conf_path);
		if(configurables.length != Object.keys(myconf).length) {
			update_my_conf(myconf)
			require.cache[my_conf_path] = null;
			myconf = require(my_conf_path);
		}
		return myconf;
	}
	
}

function update_my_conf(existing) {
	var my_conf_defaults = {};
	common._.each(configurables, function(conf_key, index, all) {
		common._.each(conf, function(module, index, all) {
			var key = Object.keys(module);
			var props = module[key];
			common._.each(props, function(prop, index, all) {
				var prop_key = Object.keys(prop)[0];
				if(prop_key === conf_key) {
					if(existing) {
						my_conf_defaults[conf_key] = existing[conf_key] || prop[conf_key]	
					} else {
						my_conf_defaults[conf_key] = prop[conf_key]	
					}
					
				}
			});
		});
	});
	fs.writeFileSync(my_conf_path, JSON.stringify(my_conf_defaults), 'utf8');
}

exports.get_my_conf = function() {
	return my_conf;
}
