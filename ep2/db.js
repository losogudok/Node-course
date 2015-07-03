var pg = require('pg');
var _ = require('lodash');

module.exports = function(config) {
    _.extend(pg.defaults, config);
};
