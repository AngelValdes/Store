(function (controllers) {
    "use strict";
    //all controllers to be loaded (REST, resource based)
    var appsController = require("./appsController");
    var usersController = require("./usersController");
    //controllers initialization
    controllers.init = function (app) {
        appsController.init(app);
        usersController.init(app);       
    };
})(module.exports);