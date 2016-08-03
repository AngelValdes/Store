var http = require('http');
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);

//configure web sever
var Http = require("http");
var Express = require("express");
//instantiate application
var App = Express();

//configure controllers hub
var Controllers = require("index");
Controllers.init(App);

//initialize server and listen to port
var Server = Http.createServer(App);
Server.listen(3000);