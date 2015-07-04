var http = require('http');

function notAllowed(req, res) {
    console.log("Method not allowed for request " + req.url);
    res.writeHead(405, {"Content-Type": "text/html"});
    res.write(http.STATUS_CODES[405]);
    res.end();
}

module.exports = notAllowed;