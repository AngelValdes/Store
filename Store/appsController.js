(function (appsController) {
    "use strict";
    appsController.init = function (app) {
        //configuration of json formatter
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        //demo data
        var apps = [
            {
                "id": 1,
                "title": "Best App Ever",
                "description": "A fast paced side scrolling shooter",
                "artAssets": [
                    { "title": "Splash Screen", "srcLink": "http://i.imgur.com/5e5Ihb6.jpg" },
                    { "title": "Cut Scene", "srcLink": "http://i.imgur.com/QQ3O6PO.jpg" }
                ],
                "releaseDate": "2016-06-15T22:29:20.000Z",
                "createdAt": "2016-05-15T22:29:20.000Z",
                "updatedAt": "2016-05-15T22:29:20.000Z",
                "user": {
                    "id": 2,
                    "name": "Joe"
                }
            },
            {
                "id": 2,
                "title": "Second Best App Ever",
                "description": "A fast paced side scrolling shooter",
                "artAssets": [
                    { "title": "Splash Screen", "srcLink": "http://i.imgur.com/5e5Ihb6.jpg" },
                    { "title": "Cut Scene", "srcLink": "http://i.imgur.com/QQ3O6PO.jpg" }
                ],
                "releaseDate": "2016-06-15T22:29:20.000Z",
                "createdAt": "2016-05-15T22:29:20.000Z",
                "updatedAt": "2016-05-15T22:29:20.000Z",
                "user": {
                    "id": 3,
                    "name": "Maria"
                }
            },
        ];

        //api data routes CRUD operations		
        //Read all
        app.get("/api/v1/apps", function (request, response) { //route
            response.set("Content-Type", "application/json"); //set data format to return
            response.send(apps); //send data
        });
        //Read by id
        app.get("/api/v1/apps/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++ //looking for member with id
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { //if index still -1, member was not found
                response.send([404, null, null]); //return not found
            } else {
                response.send(apps[index]); //return app
            }

        });
        //Create
        app.post("/api/v1/apps", function (request, response) { //route
            var title = request.body.title; //get values from body in request
            var description = request.body.description; //get values from body in request
            //compose new item
            var newApp = { "id": apps.length + 1, "title": title, "description": description, "artAssets": [], "releaseDate": "2016 - 09 - 03T22: 29:20.000Z", "createdAt": "2016 - 08 - 03T22: 29:20.000Z", "updatedAt": "2016-08-03T22:29:20.000Z", "user": {}}
            apps.push(newApp); //add item to list
            response.send([201, app, null]); //return created
        });
        //update
        app.put("/api/v1/apps/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            //only updating some of the properties but you can add more ...
            var title = request.body.title; //get values from body in request
            var description = request.body.description; //get values from body in request
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++ //looking for member with id
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { //if index still -1, member was not found
                response.send([404, null, null]); //return not found
            } else {
                apps[index].title = title; //update values
                apps[index].description = description; //update values
                response.send([302, null, null]); //return modified
            }

        });
        //Delete
        app.delete("/api/v1/apps/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++ //looking for member with id
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { //if index still -1, member was not found
                response.send([404, null, null]); //return not found
            } else {
                apps.splice(index,1); //remove item from list
                response.send([302, null, null]); //return deleted
            }
        });

    }
})(module.exports)