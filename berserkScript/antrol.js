//清除页面缓存
App.webview.clearAllPagesInCache();
// 访问页面
App.webview.open('{$loginurl}'); 
// 监听文档加载完成
App.webview.addEventListener('load', function() {
	App.webview.addEventListener('message', function(evt) {
		App.webview.sendMouseEvent(App.webview.elementRects('{$submitselector}')[0]);			
	});
	App.webview.addEventListener('consoleMessage', function(msg) {
		if(msg === 'PageLoadFinish') {
			var endTime = new Date;
			App.httpRequest('POST','{$posturl}' , 'time=' + (endTime - startTime));
			App.httpRequest('GET','{$launchurl}');
			App.close();
		}
	});
	var startTime;
	App.webview.addEventListener('urlChanged' , function(url) {
		if(url === '{$mainurl}') {
			startTime = new Date;	
		}
	});
	App.webview.execScript(function() {
		var timer = setInterval(function() {
			var d = document.querySelectorAll("{$usernameselector}");
			if(d.length) {
				clearInterval(timer);
				document.querySelectorAll("{$usernameselector}")[0].value =  '{$username}';
				document.querySelectorAll("{$passwordselector}")[0].value =  '{$password}';
				__pageExtension.message("press_submit");
			}
		} , 100);
	});
});