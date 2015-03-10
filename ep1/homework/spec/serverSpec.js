var superagent = require('superagent');
var supertest = require('supertest');

describe('Server', function(){
   var request,
       text;
    
   beforeAll(function(){
       request = supertest('http://awdawdawd.com:3000');
       text = new Array(1e5).join('*');
   });    
    
   describe('Routes', function(){
      describe('POST /files', function(){
        it('Should respond with json where data is filename array', function(done){  
                request
                    .post('/files/test.txt')
                    .send(text)
                    .expect(200, done);
        });    
      });
       
      describe('GET /files/{file}', function(){
         it('Should respond with file', function(done){            
                request
                    .get('/files/test.txt')
                    .expect(200)
                    .end(function(err, res){
                        if (err) {
                            return done(err);
                        }
                        expect(res.text.length).toEqual(text.length);
                        done();
                    });       
         });
      });
   });
});