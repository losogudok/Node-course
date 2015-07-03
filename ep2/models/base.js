"use strict";

var pg = require('pg');

class BaseModel {

    static create(table, data) {
        return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var columns = Object.keys(data);
                var values = columns.map(function(col){
                    return data[col];
                });
                var query;

                if (err) {
                    done();
                    return reject(err);
                }
                query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
                console.log(query);
                client.query(query, function(err, result){
                    if (err) {
                        done();
                        return reject(err);
                    }
                    resolve(result);
                    done();
                });
            });
        });
    }
    static update(id, data) {

    }

    static remove(id) {

    }

    static find(id) {

    }
}

module.exports = BaseModel;
