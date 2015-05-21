var superagent = require('superagent');
var supertest = require('supertest');
var server = require('../server');
var path = require('path');
var fs = require('fs');
var rmrf = require('rimraf').sync;


var utils = {
    createFile: function (path, data) {
        fs.writeFileSync(path, data);
    },
    readFile: function (path) {
        return fs.readFileSync(path, {encoding: 'utf8'})
    },
    dirIsEmpty: function (path) {
        return fs.readdirSync(path).length === 0;
    },
    emptyDir: function (path) {
        rmrf(path);
        fs.mkdirSync(path);
    }
};

describe('Server', function () {
    beforeAll(function () {

    });

    beforeEach(function () {

    });

    afterAll(function(){

    });

    describe('Routes', function () {
        describe('GET /', function () {
            it('Should return index.html', function (done) {
                supertest(server)
                    .get('/')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done.fail(err);
                        done();
                    });
            });
        });
    });
});