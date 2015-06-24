var pg = require('pg');
var Connection = pg.Connection;
var Client = pg.Client;
var dbConf = require('./dbConf');
//var connectionString = "pg://postgres:postgres@localhost:5432/";
var client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: 5432,
    host: 'localhost'
});

client.connect(function(err){
    if (err) {
        return console.log(err);
    }
    console.log('connect');
});

client.on('error', function(err){
   console.log(err);
});