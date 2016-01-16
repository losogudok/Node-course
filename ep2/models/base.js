"use strict";

var pg = require('pg');

class BaseModel {

    static create(table, data) {
        return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var columns = Object.keys(data);
                var values = columns.map(function(col){
                    if (typeof data[col] === 'string') {
                        return `'${data[col]}'`
                    }
                    return data[col];
                });
                var query;

                if (err) {
                    done();
                    return reject(err);
                }
                query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

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
    static updateById(table, id, data) {
        return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var values = Object.keys(data).map(function(column){
                    var value = (typeof data[column] === 'string') ? `'${data[column]}'` : data[column];
                    return `${column} = ${value}`;
                });
                var query;

                query = `UPDATE ${table} SET ${values} WHERE id = ${id}`;

                client.query(query, function(err, result){
                    if (err) {
                        done();
                        return reject(err);
                    }
                    resolve(result.rows[0]);
                    done();
                });
            });
        });
    }

    static removeById(table, id) {
        return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var query = `DELETE FROM ${table} WHERE id = ${id}`;

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

    static findById(table, id) {
        return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var query = `SELECT * FROM ${table} WHERE id = ${id}`;

                client.query(query, function(err, result){
                    if (err) {
                        done();
                        return reject(err);
                    }
	                if (result.rows.length === 0) {
		                return resolve(null);
	                }
                    resolve(result.rows[0]);
                    done();
                });
            });
        });
    }

	static findAll(table) {
		return new Promise(function(resolve, reject){
            pg.connect(function(err, client, done){
                var query = `SELECT * FROM ${table}`;

                client.query(query, function(err, result){
                    if (err) {
                        done();
                        return reject(err);
                    }
                    resolve(result.rows);
                    done();
                });
            });
        });
	}
}

module.exports = BaseModel;
