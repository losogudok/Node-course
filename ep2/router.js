var handlers = require('./handlers');

module.exports = function(routes) {
    "use strict";

    return {
        navigate: function(path, req, res) {
            var handlerName = this.findRoute(path);

            if (handlerName) {
                handlers[handlerName](req, res);
            } 
            else {
                handlers.notFound(req, res);
            }
        },
        findRoute: function(path) {
            for (let route in routes) {
                let re = new RegExp(route);
                if (re.test(path)) {
                    return routes[route];
                }
            }
            return false;
        }
    };
};