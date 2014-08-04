var berserk = require("../service/berserk");
var log = require("../service/log");
var config = require("../configreader");
function LaunchBerserk(req , res) {
	var limit = config.get('loadTimes');
	if(log.countTimes() >= limit) {
		res.render("result");
	} else {
		var cmd = berserk.lanuch();
		res.send(cmd);	
	}
}

exports.init = function(app) {
	app.get("/berserk/launch" , LaunchBerserk);
};