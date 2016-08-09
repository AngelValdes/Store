(function (usersController) {
    "use strict";
    usersController.init = function (app) {
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
            model.Users().findAll({ include: [model.Applications()] }).then(function (users) {
                response.send(users); //send data
            });          
        });

        //Read by id
        app.get("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            model.Users().findAll({ where: { id: id }, include: [model.Applications()] }).then(function (users) {
                response.send(users); //send data
            });  
            
        });

        //Create
        app.post("/api/v1/users", function (request, response) { //route
            var name = request.body.name; //get values from body in request
            var user = { "name": name } //compose new item
            model.Users().create(user); //add item to list
            response.send([201, user, null]); //return created
        });
 
        //update
        app.put("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var name = request.body.name; //get values from body in request
            var user = { "name": name } //compose item
            model.Users().update(user, { where: { id: id } }); //update item
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