var url = require('url');
var config = require('../config');
var path = require('path');
var fs = require('fs');
var ctrs;

process.nextTick(function(){
    ctrs = require('../controllers');
});

function ajaxFiles(req, res) {
    switch (req.method) {
        case 'GET':
            fs.readdir(config.filesDir, function(err, files){
                if (err) {
                    ctrs.internalErr(req, res);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({
                    data: files
                }));
                res.end();
            });
            break;

        default: 
            ctrs.notAllowed(req, res);
    }

}

module.exports = ajaxFiles;