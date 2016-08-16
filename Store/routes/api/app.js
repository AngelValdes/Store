module.exports = (express) => {
    const router = express.Router();
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
    // route: select all apps
    router.get('/apps', (req, res) => {
        res.status(200).json(apps);
    });
    // route: select one app by id
    router.get('/apps/:id', (req, res) => {
        var id = req.params.id; //get id value from route params      
        var index = -1;
        for (var i = 0; i < apps.length; i += 1) { //i++ //looking for member with id
            if (apps[i].id === parseInt(id)) {
                index = i;
                break;
            };
        }
        if (index === -1) { //if index still -1, member was not found
            res.status(404).send([404, null, null]); //return not found
        } else {
            res.status(200).json(apps[index]);//return app
        }
    });
    
    return router;
};
