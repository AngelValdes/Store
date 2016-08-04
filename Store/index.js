(function (controllers) {
    "use strict";
    var appsController = require("./appsController");
    var usersController = require("./usersController");
    
    controllers.init = function (app) {
        appsController.init(app);
        usersController.init(app);       
    };
})(module.exports);