var port = '3000';
module.exports = {
	port : port,
	scriptPath : "./berserkScript/antrol.js",
	fileName : "AntrolSeajsTabletNoCompressNoRestruct",
	loadTimes : 100,
	scriptParams : {
		posturl  : "http://localhost:" + port + "/log/record",
		launchurl: "http://localhost:" + port + "/berserk/launch",
		loginurl : "http://localhost:9090/login", 
		mainurl  : "http://localhost:9090/service/antrol",
		submitselector : "#login-button",
		usernameselector : "#name",
		passwordselector : "#uipassword",
		username : "zhoulianyi",
		password : "1"
	}
};