var http = require('http');
var dbConf = require('./db_conf');
var db = require('db')(dbConf);
var server = http.createServer();

server.on('request', function onRequest(req, res){

});

server.listen();
