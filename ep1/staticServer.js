var http = require('http');
var path = require('path');
var fs = require('fs');
var server = http.createServer(); 
var config = {
	projectRoot: __dirname,
	publicRoot:  path.join(__dirname, 'public')
};

server.on('request', onRequest);

function onRequest(req, res) {
	var filePath = path.join(config.projectRoot, req.url);
	console.log(filePath);
	fs.readFile(filePath, function(err, data){
		if (err) {
			if (err.code === 'ENOENT') {
				res.statusCode = 404;
				res.end('Not found!');
			}
			else {
				res.statusCode = 500;
				res.end('Internal server error');
			}
		}
		else {
			res.end(data)
		}
	});
}

server.listen(3000);