var superagent = require('superagent');
var supertest = require('supertest');
var server = require('../server');
var path = require('path');
var fs = require('fs');
var rmrf = require('rimraf').sync;


var utils = {
    createFile: function(path, data) {
        fs.writeFileSync(path, data);
    },
    readFile: function(path) {
        return fs.readFileSync(path, {encoding: 'utf8'})
    },
    dirIsEmpty: function(path) {
        return fs.readdirSync(path).length === 0;
    },
    emptyDir: function(path) {
        rmrf(path);
        fs.mkdirSync(path);
    }
};

describe('Server', function () {
    var mock;
    var root = path.join(__dirname, '..');
    var filesDir = path.join(root, 'files');
    var filePath = path.join(filesDir, 'test.txt');

    beforeAll(function () {
        mock = new Array(1e5).join('*');
    });

    beforeEach(function(){
        utils.emptyDir(filesDir);
    });

    describe('Routes', function () {
        describe('POST /files', function () {
            it('Should save file', function(done) {
                supertest(server)
                    .post('/files/test.txt')
                    .send(mock)
                    .expect(200)
                    .end(function(err ,res){
                        if (err) return done.fail(err);
                        var file = utils.readFile(filePath);
                        expect(file).toEqual(mock);
                        done();
                    });
            });
        });

        describe('GET /files/{file}', function () {
            it('Should respond with file', function (done) {
                utils.createFile(filePath, mock);
                supertest(server)
                    .get('/files/test.txt')
                    .expect(200)
                    .end(function(err, res){
                        if (err) {
                            return done.fail(err);
                        }
                        else {
                            expect(res.text).toEqual(mock);
                            done();
                        }
                    });
            });
        });

        describe('DELETE /files/{file}', function(){
            it('Should delete file', function(done){
                utils.createFile(filePath, mock);
                supertest(server)
                    .del('/files/test.txt')
                    .expect(200)
                    .end(function(err){
                        if (err) {
                            return done.fail(err);
                        }
                        expect(utils.dirIsEmpty(filesDir)).toBe(true);
                        done();
                    });
            });
        });
    });
});