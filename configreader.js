var config = require("./config");
exports.get = function(key) {
	return config[key] || '';
};