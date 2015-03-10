var http = require('http');

function notFound(req, res) {
    console.log("No request handler found for " + req.url);
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write(http.STATUS_CODES[404]);
    res.end();
}

module.exports = notFound;