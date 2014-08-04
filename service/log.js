var config = require("../configreader");
var path = require("path");
var fs = require("fs");
var _ = require("underscore");
function getFilePath(fileName) {
	var filePath = path.resolve(__dirname , '../logs', fileName || config.get("fileName"));
	return filePath;
}
function getCount() {
	var num = 0;
	var filePath = getFilePath();
	if(fs.existsSync(filePath)) {
		var fileContent = fs.readFileSync(filePath , "utf8");
		var lines = fileContent.split(/[\r\n]+/g);
		var lastLine = lines.pop();
		var parts = lastLine.split(/\:/g);
		num = parseInt(parts[0] , 10);
	} 
	return num;
}
exports.record = function(time) {
	var num = getCount();
	num++;
	var filePath = getFilePath();
	var content = (num === 1 ? "":"\n") + num + ":" + time;
	fs.appendFileSync(filePath , content);
};

exports.countTimes = function() {
	return getCount();
};

exports.getLogResult = function(fileName) {
	var filePath = getFilePath(fileName);
	var fileContent = fs.readFileSync(filePath , 'utf8');
	var lines = fileContent.split(/[\r\n]+/g);
	var series = _.map(lines , function(line) {
		var parts = line.split(/\:/g);
		return parseInt(parts[1]);
	});
	return series;
};