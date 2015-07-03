var http = require('http');
var dbConf = require('./db_сonf');
var db = require('./db')(dbConf);
var server = http.createServer();
var base = require('./models/base');

server.on('request', function onRequest(req, res){
    if (req.url === '/user' && req.method === 'POST') {
        base.create('users', {
            name: 'Vasya',
            login: 'Superman',
            password: 'Vuperman'
        })
        .then(function(result){
            console.log(result);
            res.end(result);
        })
        .catch(function(err){
            console.log(err);
            res.end(err);
        });
    }
});

server.listen(3000);
