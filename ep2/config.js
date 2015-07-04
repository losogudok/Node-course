var path = require('path');
var root = __dirname;


module.exports =  {
    port: 3001,
    root: root,
    postgres: {
        database: 'test',
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432
    }
};
