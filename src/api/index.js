var hapi       = require('hapi');
var Promise    = require('bluebird');
var fs         = Promise.promisifyAll(require('fs'));
var React      = require('react');
var handlebars = require('handlebars');
var path       = require('path');

var server = new hapi.Server();

function getFile(filename) {

    return fs.readFileAsync(filename, 'utf8').
        then(function (data) {

            return data.toString();

        }, function (err) {

            throw err;

        });
}

function getIndex() {
    return getFile(path.join(__dirname, '../front/templates/index.html'));
}

function reactString (component) {
    return React.renderToString(component);
}

function fillTemplate (template, content) {
    return template({
        content: content
    });
}

module.exports = function (port, filename) {

    return new Promise(function (resolve, reject) {

        server.connection({ port: port });

        server.route({

            method: 'GET',

            path: '/',

            handler: function (req, res) {

                var SVGPage = React.createFactory(
                            require('../react/components/SVGPage.react'));

                getIndex()
                    .then(function (index) {

                        return getFile(filename)
                            .then(function (svg) {

                                return {
                                    svg: svg,
                                    index: index
                                };
                                
                            });
                        
                    })
                    .then(function (resources) {

                        var index = handlebars.compile(resources.index);
                        var page  = fillTemplate(index,
                                reactString(SVGPage({ source: resources.svg })));

                        return res(page);

                    }, function (err) {

                        return res(err);

                    });
            }
        });

        server.route({
            
            method: 'GET',

            path: '/image',

            handler: function (req, res) {

                return getFile(filename)
                    .then(function (svg) {

                        return res(svg);
                        
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

