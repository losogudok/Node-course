var fs = require('fs');
var path = require('path');
var handlers = {};


// Get all routes in one dictionary

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        handlers[path.basename(file,'.js')] = require(path.join(__dirname, file));
    });
       
module.exports = handlers;