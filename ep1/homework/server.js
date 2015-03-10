var http = require('http');
var config = require('./config');
var url = require('url');
var router = require('./router')(config.routes);
var server = http.createServer();
//var globals = require('./globals');

console.log('Node version: ' + process.version);

server.on('request', onRequest);

function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;

    console.log('Got request: ' + req.url);
    router.navigate(pathname, req, res);
}

server.listen(config.port, function(){
    console.log('Server listening on port ' + config.port);
});


