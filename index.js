#!/usr/bin/env node

var cmd  = require('commander');
var http = require('http');
var open = require('open');
var svgServer = require('./src/api/index.js');

var defaults = {
    port: 8080
};

cmd.
    version('0.1.0').
    usage('[options]').
    option('-p --port [port-number]', 'defaults to 8080', parseInt).
    option('-i --input [svg-file]', 'the .svg to use').
    parse(process.argv);

defaults.port = cmd.port || defaults.port;

if (!cmd.input) {
    console.error('need an svg file to work with. supply one '+
            'with the -i option');
    process.exit(1);
}

svgServer(defaults.port, cmd.input).then(function () {

    open('http://localhost:' + defaults.port);
    
});
