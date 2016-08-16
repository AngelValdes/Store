module.exports = (express) => {
    const router = express.Router();
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
    // route: select all users
    router.get('/users', (req, res) => {
        res.status(200).json(users);
    });
    // route: select one user by id
    router.get('/users/:id', (req, res) => {
        var id = req.params.id; //get id value from route params
        var index = -1;
        for (var i = 0; i < users.length; i += 1) { //i++ //looking for member with id
            if (users[i].id === parseInt(id)) {
                index = i;
                break;
            };
        }
        if (index === -1) { //if index still -1, member was not found
            res.status(404).send([404, null, null]); //return not found
        } else {
            res.status(200).json(users[index]);//return user
        }
    });
    
    return router;
};
