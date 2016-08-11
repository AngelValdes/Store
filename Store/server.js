//define running environment at a global scope
global.DEBUG = true;

//configure web sever
var Http = require("http");
var Express = require("express");

//instantiate application
var App = Express();

//configure controllers hub
var Controllers = require("./index");
Controllers.init(App);

//initialize model, test connection, define initial model, sync model
var Model = require("./model.js");
Model.testConnection();
Model.define();
Model.sync();

//load and initialize logger
var Logger = require("./logger.js");
Logger.debug("info message", 0);
Logger.debug("warning message", 1);
Logger.debug("error message", 2);

//initialize server and listen to port
var Server = Http.createServer(App);
Server.listen(3000);




