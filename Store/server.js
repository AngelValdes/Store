//configure web sever
var Http = require("http");
var Express = require("express");
//instantiate application
var App = Express();

//configure controllers hub
var Controllers = require("./index");
Controllers.init(App);

//initialize server and listen to port
var Server = Http.createServer(App);
Server.listen(3000);