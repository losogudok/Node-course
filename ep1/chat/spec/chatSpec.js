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

    afterAll(function () {

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

        describe('GET /bla-bla-bla', function () {
            it('should return 404 error', function (done) {
                supertest(server)
                    .get('/bla-bla-bla')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done.fail(err);
                        done();
                    });
            });
        });

        describe('Chat', function () {
            describe('/publish', function () {
                it('Should return 200', function (done) {
                    supertest(server)
                        .post('/publish')
                        .send(JSON.stringify({message: 'blablabla'}))
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done.fail(err);
                            done();
                        });
                });

                it('Should return 400 if message not JSON', function (done) {
                    supertest(server)
                        .post('/publish')
                        .send("blablabla")
                        .expect(400)
                        .end(function (err, res) {
                            if (err) return done.fail(err);
                            done();
                        });
                });
            });

            describe('/subscribe', function () {
                it('should wait for publish and then return message', function (done) {
                    var text = 'Hello';
                    var publisher = supertest(server);
                    var subscriber1 = new Promise(function(resolve, reject){
                       supertest(server)
                            .get('/subscribe')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done.fail(err);
                                expect(res.text).toEqual(text);
                                resolve();
                            });
                    });

                    var subscriber2 = new Promise(function(resolve, reject){
                       supertest(server)
                            .get('/subscribe')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done.fail(err);
                                expect(res.text).toEqual(text);
                                resolve();
                            });
                    });


                    Promise.all([subscriber1, subscriber2])
                        .then(function(){
                            done();
                        });



                    publisher
                        .post('/publish')
                        .send(JSON.stringify({message: text}))
                        .expect(200, function(err) {
                            if (err) done.fail(err);
                        });
                });
            });
        });
    });
});