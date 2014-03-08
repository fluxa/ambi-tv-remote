
/*!
 * Module dependencies.
 */

var commin = require('../util/common');
var fs = require('fs');
var my_conf_path = common.util.format('%s/my-conf.json',common.config.root); 
var conf_path = common.util.format('%s/ambi-tv.conf',common.config.root);
var conf = require('../../ambi-tv.json');
var my_conf = require(my_conf_path);

exports.path = conf_path;
exports.my_conf = my_conf;

// Re-write ambi-tv.conf
update();
function update(callback) {

	var buff = '';
	common._.each(conf, function(module, index, all) {
		var key = Object.keys(module);
		var props = module[key];
		buff += key + ' {\n';
		common._.each(props, function(prop, index, all) {
			var prop_key = Object.keys(prop);
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

					res.render('../views/remote',{});
				});
			}
		});
	} else {
		res.render('../views/conf',{});	
	}

}


// UI
exports.ui = function(req, res, next) {
	res.render('../views/conf', {my_conf: my_conf});
}