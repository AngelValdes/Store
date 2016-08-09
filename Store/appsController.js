(function (appsController) {
    "use strict";
    appsController.init = function (app) {
        //configuration of json formatter
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        //call model ORM
        var model = require("./model.js");
        model.define();
        
        //api data routes CRUD operations		
        //Read all
        app.get("/api/v1/applications", function (request, response) { //route
            response.set("Content-Type", "application/json"); //set data format to return
            model.Applications().findAll({ include: [model.Users(), model.ArtAssets()] }).then(function (applications) {
                response.send(applications); //send data
            });
        });

        //Read by id
        app.get("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            model.Applications().findAll({ where: { id: id }, include: [model.Users(), model.ArtAssets()] }).then(function (applications) {
                response.send(applications); //send data
            });

        });

        //Create
        app.post("/api/v1/applications", function (request, response) { //route
            var title = request.body.title; //get values from body in request
            var description = request.body.description;
            var releaseDate = request.body.releaseDate;
            var userId = request.body.userId;
            var application = { "title": title, "description": description, "releaseDate": releaseDate, "userId": userId } //compose new item
            model.Applications().create(application); //add item to list
            response.send([201, application, null]); //return created
        });

        //update
        app.put("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var title = request.body.title; //get values from body in request
            var description = request.body.description;
            var releaseDate = request.body.releaseDate;
            var userId = request.body.userId;
            var application = { "title": title, "description": description, "releaseDate": releaseDate, "userId": userId } //compose new item
            model.Applications().update(application, { where: { id: id } }); //update item
            response.send([301, application, null]); //return modified
        });

        //Delete
        app.delete("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            model.Applications().destroy({ where: { id: id } }); //delete item
            response.send([301, null, null]); //return deleted         
        });

    }
})(module.exports)