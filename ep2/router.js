var handlers = require('./handlers');
var runner = require('./runner');

module.exports = function(routes) {
    "use strict";

    return {
        navigate: function(path, req, res) {
            var handler = this.findRoute(path);

            if (handler) {
	            if (handler.params.length > 0) {
		            req.params = handler.params;
	            }
                runner(handlers[handler.name](req, res));
            } 
            else {
                runner(handlers.notFound(req, res));
            }
        },
        findRoute: function(path) {
            for (let route in routes) {
                let re = new RegExp(route);
	            let match = path.match(re);

                if (match) {
                    return {
	                    name: routes[route],
	                    params: match.slice(1)
                    }
                }
            }

            return false;
        }
    };
};