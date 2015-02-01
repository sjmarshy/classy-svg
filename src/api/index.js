var hapi   = require('hapi');
var Promise = require('bluebird');

var server = new hapi.Server();

module.exports = function (port, filename) {

    return new Promise(function (resolve, reject) {
        server.connection({ port: port });

        server.route({
            method: 'GET',
            path: '/',
            handler: function (req, res) {

                res('better');
                
            }
        });
            

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'public'
                }
            }
        });

        server.start(function () {
            return resolve();
        });
    });
};

