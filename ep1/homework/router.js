var controllers = require('./controllers');

module.exports = function(routes) {
    return {
        navigate: function(path, req, res) {
            var route = this.findRoute(path);

            if (route) {
                let controller = routes[route];   
                controllers[controller](req, res);
            } 
            else {
                controllers.notFound(req, res);
            }
        },
        findRoute: function(path) {
            for (let route in routes) {
                let re = new RegExp(route);
                if (re.test(path)) {
                    return route;
                }
            }
            return false;
        }
    };
};