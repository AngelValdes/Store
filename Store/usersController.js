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
        app.get("/api/v1/users", function (request, response) { //route
            response.set("Content-Type", "application/json"); //set data format to return
            response.send(users); //send data
        });

        //Read by id
        app.get("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1; 
            for (var i = 0; i < users.length; i += 1) { //i++ //looking for member with id
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { //if index still -1, member was not found
                response.send([404, null, null]); //return not found
            } else {
                response.send(users[index]); //return user
            }
            
        });
        //Create
        app.post("/api/v1/users", function (request, response) { //route
            var name = request.body.name; //get values from body in request
            var user = { "id": users.length + 1, "name": name } //compose new item
            users.push(user); //add item to list
            response.send([201, user, null]); //return created
        });
 
        //update
        app.put("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            var name = request.body.name; //get values from body in request
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1;
            for (var i = 0; i < users.length; i += 1) { //i++ //looking for member with id
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { //if index still -1, member was not found
                response.send([404, null, null]); //return not found
            } else {
                users[index].name = name; //update values
                response.send([302, null, null]); //return modified
            }
            
           
        });

        //Delete
        app.delete("/api/v1/users/:id", function (request, response) { //route
            var id = request.params.id; //get id value from route params
            response.set("Content-Type", "application/json"); //set data format to return
            var index = -1;
            for (var i = 0; i < users.length; i += 1) { //i++ //looking for member with id
                if (users[i].id === parseInt(id)) {
                    index = i;
                    break;
                };
            }
            if (index === -1) { 
                response.send([404, null, null]); //return not found
            } else {
                users.splice(index,1); //remove item from list
                response.send([302, null, null]); //return deleted
            }
        });
        
    }
})(module.exports)