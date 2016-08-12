(function (usersController) {
    "use strict";
    usersController.init = function (app) {
        //load and initialize logger
        var Logger = require("./logger.js");
        //configuration of json formatter
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        //call model ORM
        var model = require("./model.js");
        model.define();

        //api data routes CRUD operations		
        //Read all
        app.get("/api/v1/users", function (request, response) { //route
            response.set("Content-Type", "application/json"); //set data format to return
            model.Users().findAll({ include: [model.Applications()], raw: true }).then(function (users) {
                Logger.debug("All users read :" + JSON.stringify(users) + "\n", 0);
                response.status(200).send([200,users, null]); //send data             
            }).catch(function(error) {
                Logger.debug("All users read error: " + error + "\n", 2);
                response.status(500).send([500, null, null]);
            });          
        });

        //Read by id
        app.get("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            model.Users()
                .findAll({ where: { id: id }, include: [model.Applications()] })
                .then(function (users) {
                    Logger.debug("by id user read :" + JSON.stringify(users) + "\n", 0);
                    response.status(200).send([200, users, null]); //send data
                }).catch(function (error) {
                    Logger.debug("by id user read error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });             
        });

        //Create
        app.post("/api/v1/users", function (request, response) { //route
            var name = request.body.name; //get values from body in request
            var user = { "name": name } //compose new item
            model.Users().create(user).then(
                function (data) {
                    Logger.debug("user created :" + JSON.stringify(user) + "\n", 0);
                    response.status(201).send([201, user, null]); //return created
                })
                .catch(function (error) {
                    Logger.debug("Creating user error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                }); //add item to list            
        });
 
        //update
        app.put("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var name = request.body.name; //get values from body in request
            var user = { "name": name } //compose item
            model.Users().update(user, { where: { id: id } }); //update item
            Logger.debug("user updated \n" + JSON.stringify(user), 0);
            response.send([301, user, null]); //return modified
        });

        //Delete
        app.delete("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            model.Users().destroy({ where: { id: id } }); //delete item
            response.send([301, null, null]); //return deleted         
        });
        
    }
})(module.exports)