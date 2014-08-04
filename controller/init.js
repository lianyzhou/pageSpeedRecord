var fs = require("fs"),
	path = require("path");
exports.init = function(app) {
	var lists = fs.readdirSync(path.join(__dirname));
	var currentFile = path.basename(__filename);
	lists.forEach(function(file) {
		if(file !== currentFile) {
			require(path.join(__dirname , file)).init(app);
		}
	});
};