var http = require('http');
var events = require('events');
var server = http.createServer();
var emitProto = events.EventEmitter.prototype.emit;

events.EventEmitter.prototype.emit = function(event) {
	console.log(event);
	// var args = [].slice.call(this, arguments);
	emitProto.apply(this, arguments);
};


server.on('request', function(req, res){
	console.log(req.url);
	res.end('Hello world!');
});
server.listen(3000);