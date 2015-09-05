var BaseModel = require('../models/base');
var handlers;

process.nextTick(function(){
    handlers = require('../handlers');
});

function readBody(req) {
	return new Promise(function(resolve, reject){
		var body = '';

	  	req.setEncoding('utf8');

	  	req.on('data', function (chunk) {
	    	body += chunk;
	  	});

	  	req.on('error', function(err){
	  		reject(err);
	  	});

	  	req.on('end', function(){
	  		resolve(body);
	  	});
	});
}

module.exports = function* (req, res) {
    var user;
    var id;
	var body = yield readBody(req);
	var json;

	switch (req.method) {
		case 'POST':
		try {
			json = JSON.parse(body);
			user = yield BaseModel.create('users', json);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
            res.write(JSON.stringify(user));
            res.end();
		}
		catch(e) {
			console.log(e);
			handlers.internalErr(req, res);
		}
		break;

		case 'PUT':
		id = req.params[0];
		try {
			user = yield BaseModel.updateById('users', id, json);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify(user));
            res.end();
		}
		catch(e) {
			console.log(e);
			handlers.internalErr(req, res);
		}
		break;

		case 'DELETE':
		id = req.params[0];
        try {
	        user = yield BaseModel.removeById('users', id);
	        res.writeHead(200, {
				'Content-Type': 'application/json'
			});
	        res.end();
        }
        catch(e) {
	        console.log(e);
			handlers.internalErr(req, res);
        }
		break;

		case 'GET':
		id = req.params[0];

        try {
	        if (!id) {
		        user = yield BaseModel.findAll('users');
	        }
	        else {
		        user = yield BaseModel.findById('users', id);
	        }
	        res.writeHead(200, {
				'Content-Type': 'application/json'
			});
	        res.write(JSON.stringify(user));
            res.end();
        }
		catch(e) {
			console.log(e);
			handlers.internalErr(req, res);
		}
		break;
	}
};