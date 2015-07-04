var pg = require('pg');
var _ = require('lodash');

module.exports.initDb = function(config) {
    _.extend(pg.defaults, config);
};
