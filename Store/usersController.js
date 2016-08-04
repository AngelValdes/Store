(function (usersController) {
    "use strict";
    usersController.init = function (app) {
        //configuration of json formatter
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        //demo data
        var users = [
            {
                "id": 1,
                "name": "Chapman"
            },
            {
                "id": 2,
                "name": "Joe"
            },
            {
                "id": 3,
                "name": "Maria"
            }
        ];

        //api data routes CRUD operations		
        //Read all
        app.get("/api/v1/users", function (request, response) { 
            response.set("Content-Type", "application/json");
            response.send(users);                           
        });
        //Read by id
        app.get("/api/v1/users/:id", function (request, response) {
            var id = request.params.id;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < users.length; i += 1) { //i++
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                response.send(users[index]);
            }
            
        });
        //Create
        app.post("/api/v1/users", function (request, response) {
            var name = request.body.name;
            var user = { "id": users.length + 1, "name": name }
            users.push(user);
            response.send([201, user, null]);
        });
 
        //update
        app.put("/api/v1/users/:id", function (request, response) {
            var id = request.params.id;
            var name = request.body.name;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < users.length; i += 1) { //i++
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                users[index].name = name;
                response.send([302, null, null]);
            }
            
           
        });
        //Delete
        app.delete("/api/v1/users/:id", function (request, response) {
            var id = request.params.id;
            response.set("Content-Type", "application/json");
            var index = -1;
            for (var i = 0; i < users.length; i += 1) { //i++
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) {
                response.send([404, null, null]);
            } else {
                users.splice(index,1);
                response.send([302, null, null]);
            }
        });
        
    }
})(module.exports)