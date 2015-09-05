var http = require('http');
var appConf = require('./config');
var url = require('url');
var appRoutes = require('./routes');
var db = require('./db').initDb(appConf.postgres);
var server = http.createServer();
var router = require('./router')(appRoutes);


console.log('Node version: ' + process.version);

server.on('request', onRequest);

function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;

    console.log('Got request: ' + req.url);
    router.navigate(pathname, req, res);
}

if (!module.parent) {
    server.listen(appConf.port, function(){
        console.log('Server listening on port ' + appConf.port);
    });
}
else {
    module.exports = server;
}



