var path = require('path');
var fs = require('fs');
var config = require('../config');
var ctrs;

process.nextTick(function(){
    ctrs = require('../controllers');
});
function ajaxFile(req, res) {
    var filepath = path.join(config.root, req.url);

    switch (req.method) {
        case 'GET':
            var rs = fs.createReadStream(filepath);
             
            rs.pipe(res);
            rs.on('open', function(){
                res.setHeader('Content-Type', 'text');
            });

            rs.on('error', function(){
                if (err.code == 'ENOENT') {
                    return ctrs.notFound(req, res);
                } 
                else {
                    return ctrs.internalErr(req, res);
                }
            });

            res.on('close', function(){
                rs.destroy();
            });
            break;
        case 'POST':
            var ws = fs.createWriteStream(filepath);

            req.pipe(ws);

            ws.on('error', function(err){
                ctrs.internalErr(req, res);
            });
            req
            .on('error', function(err) {
                ctrs.internalErr(req, res);
                file.destroy();
            }).
            on('close', function(err) {
                file.destroy();
            })
            .on('end', function() {
                res.writeHead(200, 'OK');
                res.end();
            });

            break;
        case 'DELETE':
            fs.unlink(filepath, function (err) {
                if (err) {
                    return ctrs.internalErr(req, res);
                }
                res.writeHead(200, 'OK');
                res.end();
            });
            break;

        default: 
            ctrs.notAllowed(req, res);
    }
}

module.exports = ajaxFile;