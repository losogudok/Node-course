var url = require('url');
var config = require('../config');
var path = require('path');
var fs = require('fs');
var ctrs;

process.nextTick(function(){
    ctrs = require('../controllers');
});

function staticFile(req, res) {
    var pathname = url.parse(req.url).pathname;
    var filepath = path.join(config.root, pathname);
    var mimeTypes = {
        "html": "text/html",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "png": "image/png",
        "js": "text/javascript",
        "css": "text/css"
    };
    var rs = fs.createReadStream(filepath);

    rs.pipe(res);
    rs.on('open', function(){
        var mimeType = mimeTypes[path.extname(filepath).split(".")[1]];
        res.writeHead(200, 'OK', {'Content-Type': mimeType });
    });

    rs.on('error', function(err){
        if (err.code == 'ENOENT') {
            ctrs.notFound(req, res);
        }
        else {
            ctrs.internalErr(req, res);
        }
    });

    req.on('close', function () {
        rs.destroy();
    });
}

module.exports = staticFile;