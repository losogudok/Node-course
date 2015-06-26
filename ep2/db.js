var pg = require('pg');

module.exports = function(config) {
    pg.connect(config, function(){

    });
};
