var BaseModel = require('../models/base');

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

	  	req.on('close', function(){

	  	});

	  	req.on('end', function(){
	  		resolve(body);
	  	});
	});
}

module.exports = function(req, res) {
	var json;
	

	switch (req.method) {
		case 'POST':
		BaseModel.create('users', json);
		break;
		case 'PUT':
		break;
		case 'DELETE':
		break;
		case 'GET';
		break;
	}
}