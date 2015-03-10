var fs = require('fs');
var path = require('path');
var config = require('../config');
var ctrs;

process.nextTick(function(){
    ctrs = require('../controllers');
});

function home(req, res) {
	var fileStream = fs.createReadStream(path.join(config.root, 'views/index.html'));

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	fileStream.pipe(res);
}

module.exports = home;