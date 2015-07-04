var http = require('http');
var appConf = require('./config');
var url = require('url');
var appRoutes = require('./routes');
var db = require('./db').initDb(appConf.postgres);
var server = http.createServer();
var router = require('./router')(appRoutes);
var BaseModel = require('./models/base');

console.log('Node version: ' + process.version);

server.on('request', onRequest);

function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;

    console.log('Got request: ' + req.url);
    router.navigate(pathname, req, res);
}

server.listen(appConf.port, function(){
    console.log('Server listening on port ' + appConf.port);
});

module.exports = server;
