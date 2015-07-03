var pg = require('pg');
var Connection = pg.Connection;
var Client = pg.Client;
var dbConf = require('./db_сonf');
var _ = require('lodash');

var testClient = new Client(dbConf);

testClient.on('error', function(err){
    console.log(err);
});


function connect(client) {
    return new Promise(function(resolve, reject){
        client.connect(function(err){
            if (err) return reject(err);
            console.log('connected');
            resolve(client);
        });
    });
}

function createDatabase(err) {
    console.log('Connection error, trying to create database');
    return new Promise(function(resolve, reject){
        var defaultConf = _.extend({}, dbConf, {
            database: 'postgres'
        });

        var postgresClient = new Client(defaultConf);
        postgresClient.connect(function(err){
            if (err) reject(err);

            postgresClient.query('CREATE DATABASE TEST', function(err){
                if (err) return reject(err);
                console.log('test db created');
                resolve(testClient.connect());
            });
        });

    });
}

function dropTables(client) {
    return new Promise(function(resolve, reject){
        client.query('DROP SCHEMA PUBLIC CASCADE', function(err){
            if (err) return reject(err);
            console.log('tables droppped');
            resolve(client);
        });
    });
}

function createSchema(client) {
    return new Promise(function(resolve, reject){
         client.query('CREATE SCHEMA public', function(err){
            if (err) return reject(err);
             console.log('schema created');
             resolve(client);
         });
    });
}

function createTable(client) {
    return new Promise(function(resolve, reject){
        client.query('CREATE TABLE users (id integer PRIMARY KEY, name varchar(200), login varchar(100), password varchar(100));', function(err){
            if (err) return reject(err);
            console.log('user table created');
            resolve(client);
            client.end();
        });
    });
}

function logError(err) {
    console.error('Got error:\n', err);
}

connect(testClient)
    .catch(createDatabase)
    .then(dropTables)
    .then(createSchema)
    .then(createTable)
    .catch(logError);