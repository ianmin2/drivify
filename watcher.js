var chokidar = require("chokidar");


var watcher = chokidar.watch("filr,dir,or glob", { ignored: /[\/\\]\./, persistent: true  });

var log = console.log.bind(console);

watcher
	.on("add", function(path){
		
	})
	.on("addDir", function(path){
		
	})
	.on("change", function(path){
		
	})
	.on("unlink", function(path){
		
	})
	.on("unlinkDir", function(path){
		
	})
	.on("error", function(error){
		
	})