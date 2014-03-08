
/*!
 * Module dependencies.
 */

var commin = require('../util/common');
var fs = require('fs');
var conf = require('../../ambi-tv.json');
var conf_path = common.util.format('%s/ambi-tv.conf',common.config.root);

exports.path = conf_path;

// Re-write ambi-tv.conf
exports.update = function(callback) {

	var buff = '';
	common._.each(conf, function(module, index, all) {
		var key = Object.keys(module);
		var props = module[key];
		buff += key + ' {\n';
		common._.each(props, function(prop, index, all) {
			var prop_key = Object.keys(prop);
			var prop_val = prop[prop_key];
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