var fs = require('fs');
var path = require('path');
var config = require('../config');
var handlers;

process.nextTick(function(){
    handlers = require('../handlers');
});

function home(req, res) {
	var fileStream = fs.createReadStream(path.join(config.root, 'templates/index.html'));

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	fileStream.pipe(res);
}

module.exports = home;