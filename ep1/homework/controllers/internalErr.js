var http = require('http');

function internalErr(req, res) {
    console.log("Internal server error for request " + req.url);
    res.writeHead(500, {"Content-Type": "text/html"});
    res.write(http.STATUS_CODES[500]);
    res.end();
}

module.exports = internalErr;