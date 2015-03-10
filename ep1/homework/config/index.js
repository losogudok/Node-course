var path = require('path');
var root = path.join(__dirname, '..');
var filesDir= path.join(root, 'files');

module.exports =  {
    port: 3000,
    root: root,
    filesDir: filesDir,
    routes: {
        "^\/$": "home",
        "^\/files$": "ajaxFiles",
        "^\/files\/.*\..*$": "ajaxFile",
        "^\/static\/.*": "staticFile"
    }
};
