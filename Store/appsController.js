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
        app.get("/api/v1/apps", function (request, response) {
            response.set("Content-Type", "application/json");
            response.send(apps);
        });
        //Read by id
        app.get("/api/v1/apps/:id", function (request, response) {
            var id = request.params.id;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                response.send(apps[index]);
            }

        });
        //Create
        app.post("/api/v1/apps", function (request, response) {
            var title = request.body.title;
            var description = request.body.description;
            var newApp = { "id": apps.length + 1, "title": title, "description": description, "artAssets": [], "releaseDate": "2016 - 09 - 03T22: 29:20.000Z", "createdAt": "2016 - 08 - 03T22: 29:20.000Z", "updatedAt": "2016-08-03T22:29:20.000Z", "user": {}}
            apps.push(newApp);
            response.send([201, app, null]);
        });
        //update
        app.put("/api/v1/apps/:id", function (request, response) {
            var id = request.params.id;
            var title = request.body.title;
            var description = request.body.description;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                apps[index].title = title;
                apps[index].description = description;
                response.send([302, null, null]);
            }

        });
        //Delete
        app.delete("/api/v1/apps/:id", function (request, response) {
            var id = request.params.id;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < apps.length; i += 1) { //i++
                if (apps[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                apps.splice(index,1);
                response.send([302, null, null]);
            }
        });

    }
})(module.exports)