var config = require('../config');
var fs = require('fs');
var path = require('path');
var routes = {};


// Get all routes in one dictionary

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        routes[path.basename(file,'.js')] = require(path.join(__dirname, file));
    });
       
module.exports = routes;