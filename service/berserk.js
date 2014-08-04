var fs = require("fs");
var exec = require("child_process").exec;
var path = require("path");
var config = require("../configreader");

exports.lanuch = function() {
	var scriptFile = path.resolve(__dirname , "../" , config.get("scriptPath"));
	var destScriptFile = path.resolve(__dirname , "../distScript" , path.basename(scriptFile).replace(".js" , "-dist.js"));
	var scriptFileContent = fs.readFileSync(scriptFile , "utf8");
	var scriptParams = config.get("scriptParams") || {};
	scriptFileContent = scriptFileContent.replace(/\{\$([^{}]+)\}/g , function(full,key) {
		return scriptParams[key] || '';
	});
	fs.writeFileSync(destScriptFile , scriptFileContent, "utf8");
	var berserkExe = path.resolve(__dirname , "../bin/build/release/berserkJS.exe");
	var cmd = [berserkExe , "--script=" + destScriptFile].join(' ');
	exec(cmd);
	return cmd;
};