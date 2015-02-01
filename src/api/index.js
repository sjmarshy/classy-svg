var hapi    = require('hapi');
var Promise = require('bluebird');
var fs      = require('fs');
var React   = require('react');

var server = new hapi.Server();

module.exports = function (port, filename) {

    return new Promise(function (resolve, reject) {
        server.connection({ port: port });

        server.route({
            method: 'GET',
            path: '/',
            handler: function (req, res) {

                var SVG = 
                    React.createFactory(
                            require('../react/components/SVG.react'));

                fs.readFile(filename, function (err, data) {

                    if (err) {
                        res(err);
                    }

                    return res(
                            React.renderToString(
                                SVG({
                                    source: data.toString()
                                })
                            )
                    );
                    
                });
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

