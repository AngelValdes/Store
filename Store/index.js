(function (controllers) {
    "use strict";
    var usersController = require("./api/usersController");
    var productsController = require("./api/productsController");

    controllers.init = function (app) {
        usersController.init(app);
        productsController.init(app);
    };
})(module.exports);