(function (usersController) {
    "use strict";
    usersController.init = function (app) {
        //load and initialize logger
        var logger = require("./logger.js");
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
                logger.debug("All users read :" + JSON.stringify(users) + "\n", 0);
                response.status(200).send([200,users, null]); //send data             
            }).catch(function(error) {
                logger.debug("All users read error: " + error + "\n", 2);
                response.status(500).send([500, null, null]);
            });          
        });

        //Read by id
        app.get("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            model.Users().findAll({ where: { id: id }, include: [model.Applications()], raw: true  })
                .then(function (users) {
                    logger.debug("by id user read :" + JSON.stringify(users) + "\n", 0);
                    response.status(200).send([200, users, null]); //send data
                }).catch(function (error) {
                    logger.debug("by id user read error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });             
        });

        //Create
        app.post("/api/v1/users", function (request, response) { //route
            var name = request.body.name; //get values from body in request
            var user = { "name": name } //compose new item
            model.Users().create(user)
                .then(function () {//add item to list 
                    logger.debug("user created :" + JSON.stringify(user) + "\n", 0);
                    response.status(201).send([201, user, null]); //return created
                })
                .catch(function (error) {
                    logger.debug("Creating user error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });            
        });
 
        //update
        app.put("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var user = { "name": request.body.name } //compose item
            model.Users().update(user, { where: { id: id } })
                .then(function () {//update item
                    logger.debug("user updated: " + JSON.stringify(user) + "\n", 0);
                    response.status(301).send([301, user, null]); //return modified
                })
                .catch(function (error) {
                    logger.debug("Updating user error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                }); 
           
        });

        //Delete
        app.delete("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            model.Users().destroy({ where: { id: id } })
                .then(function () {//delete item
                    logger.debug("user deleted: id = " + id + "\n", 0);
                    response.status(301).send([301, id, null]); //return deleted
                })
                .catch(function (error) {
                    logger.debug("Deleting user error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                }); 
                    
        });
        
    }
})(module.exports)