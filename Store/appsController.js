(function (appsController) {
    "use strict";
    appsController.init = function (app) {
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
        app.get("/api/v1/applications", function (request, response) { //route
            response.set("Content-Type", "application/json"); //set data format to return
            model.Applications().findAll({ include: [model.Users(), model.ArtAssets()], raw: true})
                .then(function (applications) {
                    logger.debug("All applications read :" + JSON.stringify(applications) + "\n", 0);
                    response.status(200).send([200, applications, null]); //send data   
                })
                .catch(function (error) {
                    logger.debug("All applications read error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });
        });

        //Read by id
        app.get("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            model.Applications().findAll({ where: { id: id }, include: [model.Users(), model.ArtAssets()], raw: true })
                .then(function (applications) {
                    logger.debug("by id application read :" + JSON.stringify(applications) + "\n", 0);
                    response.status(200).send([200, applications, null]); //send data
                })
                .catch(function (error) {
                    logger.debug("by id application read error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });

        });

        //Create
        app.post("/api/v1/applications", function (request, response) { //route
            //get values from body in request
            var application = { "title": request.body.title, "description": request.body.description, "releaseDate": request.body.releaseDate, "userId": request.body.userId } //compose new item
            model.Applications().create(application)
                .then(function () {//add item to list 
                    logger.debug("Application created :" + JSON.stringify(application) + "\n", 0);
                    response.status(201).send([201, application, null]); //return created
                })
                .catch(function (error) {
                    logger.debug("Creating application error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });           
        });

        //update
        app.put("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var application = { "title": request.body.title, "description": request.body.description, "releaseDate": request.body.releaseDate, "userId": request.body.userId } //compose new item
            model.Applications().update(application, { where: { id: id } })
                .then(function () {//update item
                    logger.debug("Application updated: " + JSON.stringify(application) + "\n", 0);
                    response.status(301).send([301, application, null]); //return modified
                })
                .catch(function (error) {
                    logger.debug("Updating user error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                }); 

        });

        //Delete
        app.delete("/api/v1/applications/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            model.Applications().destroy({ where: { id: id } })
                .then(function () {//delete item
                    logger.debug("Application deleted: id = " + id + "\n", 0);
                    response.status(301).send([301, id, null]); //return deleted
                })
                .catch(function (error) {
                    logger.debug("Deleting application error: " + error + "\n", 2);
                    response.status(500).send([500, null, null]);
                });         
        });

    }
})(module.exports)