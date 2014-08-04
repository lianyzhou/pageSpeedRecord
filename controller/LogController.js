var log = require("../service/log");
var _ = require("underscore");
function LogRecord(req,res) {
	var time = req.body.time;
	log.record(time);
	res.send("ok");
}
function LogResult(req,res) {
	var json = log.getLogResult();
	res.json(json);
}
function LogReport(req,res) {
	var list = [{
		title : "首页磁贴使用seajs加载（未压缩、未目录重构）",
		series : log.getLogResult("AntrolSeajsTabletNoCompressNoRestruct")
	} , {
		title : "首页磁贴使用seajs加载（未压缩、目录重构）",
		series : log.getLogResult("AntrolSeajsTabletRestructNoCompress")
	} , {
		title : "首页磁贴使用seajs加载（压缩、目录重构）",
		series : log.getLogResult("AntrolSeajsTablet")
	}];
	list.forEach(function(obj) {
		var sum = _.reduce(obj.series, function(memo, num){ return memo + num; }, 0);
		var avg = Math.round(sum / obj.series.length);
		obj.avg = avg;
	});
	res.render("report" , {
		list : list		
	});
}
exports.init = function(app) {
	app.post("/log/record" , LogRecord);
	app.get("/log/result",LogResult);
	app.get("/log/report" , LogReport);
};